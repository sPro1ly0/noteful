import React, { Component } from 'react';
import './AddForms.css';
import ValidationError from './ValidationError';
import NotesContext from './NotesContext';
import PropTypes from 'prop-types';

class AddNote extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newNote: {
                value: '',
                touched: false
            },
            content: {
                value: '',
                touched: false
            },
            selectedFolder: {
                value: 'None',
                touched: false
            },
            error: null
        }
    }

    static contextType = NotesContext;
    
    updateNewNote(newNote) {
        this.setState({
            newNote: {value: newNote, touched: true}
        });
    }
    
    updateContent(content) {
        this.setState({
            content: {value: content, touched: true}
        });
    }

    updateSelectedFolder(selectedFolder) {
        this.setState({
            selectedFolder: {value: selectedFolder, touched: true}
        });
    }

    findFolderId(value) {
        const selectedFolderName = value;
        const folder = this.context.folders.find(folder => folder.name === selectedFolderName);
        const folderId = folder.id;
        return folderId;
    }

    validateNoteName() {
        const name = this.state.newNote.value;
        if (name.length === 0) {
            return 'Note name is required';
        } else if (name.length > 30) {
            return 'Name must be no longer than 30 characters long.'
        }
    }

    validateContent() {
        const content = this.state.content.value;
        if (content.length > 1000) {
            return 'Content must be no longer than 1000 characters long.'
        }
    }

    validateSelectedFolder() {
        const selectedFolder = this.state.selectedFolder.value;
        if (selectedFolder === 'None') {
            return 'Please select a folder.'
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const { newNote, content, selectedFolder } = this.state;
        const selectedFolderId = this.findFolderId(selectedFolder.value);// console.log(newNote);
        // console.log(content);
        // console.log(selectedFolder);
        // console.log(selectedFolderId);

        fetch(`http://localhost:9090/notes`, {
            method: 'POST',
            body: JSON.stringify({name: `${newNote.value}`, folderId: `${selectedFolderId}`, content: `${content.value}`}), 
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Something went wrong, please try again later.');
                }
                return res.json();
            })
            .then(data => {
                this.context.addNewNote(data);
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ 
                    error: error.message + " data. Cannot add new note right now." 
                });
            })
        
    }

    render() {
        const folderOptions = this.context.folders.map((folder) =>
            <option className="folder" key={folder.id}>{folder.name}</option> 
        );

        return (
            <form className="add-note-form" onSubmit={e => this.handleSubmit(e)}>
                {this.state.error}
                <div>
                    <label htmlFor="new-note">Enter New Note Name:</label>
                    <input 
                        type="text" 
                        name="new-note" 
                        id="new-note" 
                        defaultValue=""
                        onChange={e => this.updateNewNote(e.target.value)}/>
                    {this.state.newNote.touched && (<ValidationError message={this.validateNoteName()}/>)}
                </div>
                <div>
                    <label htmlFor="note-content">Content:</label>
                    <input 
                        type="text" 
                        name="note-content"
                        id="note-content" 
                        defaultValue="" 
                        onChange={e => this.updateContent(e.target.value)}/>
                    {this.state.content.touched && (<ValidationError message={this.validateContent()}/>)}
                </div>
                <div>
                    <label htmlFor="note-folder">Folder:</label>
                    <select 
                        name="note-folder" 
                        id="note-folder"
                        onChange={e => this.updateSelectedFolder(e.target.value)}>
                        <option value="None">Select Folder</option>
                        {folderOptions}
                    </select>
                    {this.state.selectedFolder.touched && (<ValidationError message={this.validateSelectedFolder()}/>)}
                </div>
                <button 
                    type="submit"
                    disabled={
                        this.validateNoteName() ||
                        this.validateContent() ||
                        this.validateSelectedFolder()
                    }>+ Add New note</button>
            </form>
        )
    }
}

export default AddNote;

AddNote.propTypes = {
    history: PropTypes.object
};