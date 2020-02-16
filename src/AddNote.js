import React, { Component } from 'react';
import './AddForms.css';
import ValidationError from './ValidationError';
import NotefulContext from './NotefulContext';
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

    static contextType = NotefulContext;
    
    updateNewNote(newNote) {
        this.setState({
            newNote: {value: newNote, touched: true}
        });
    };
    
    updateContent(content) {
        this.setState({
            content: {value: content, touched: true}
        });
    };

    updateSelectedFolder(selectedFolder) {
        this.setState({
            selectedFolder: {value: selectedFolder, touched: true}
        });
    };

    findFolderId(value) {
        const selectedFolderName = value;
        const folder = this.context.folders.find(folder => folder.folder_name === selectedFolderName);
        const folderId = folder.id;
        return folderId;
    };

    validateNoteName() {
        const name = this.state.newNote.value;
        if (name.length === 0) {
            return 'Note name is required';
        } else if (name.length > 30) {
            return 'Name must be no longer than 30 characters long.';
        };
    };

    validateContent() {
        const content = this.state.content.value;
        if (content.length > 1000) {
            return 'Content must be no longer than 1000 characters long.';
        };
    };

    validateSelectedFolder() {
        const selectedFolder = this.state.selectedFolder.value;
        if (selectedFolder === 'None') {
            return 'Please select a folder.';
        };
    };

    handleSubmit(event) {
        event.preventDefault();
        const { newNote, content, selectedFolder } = this.state;
        const selectedFolderId = this.findFolderId(selectedFolder.value);
        // console.log(newNote);
        // console.log(content);
        // console.log(selectedFolder);
        // console.log(selectedFolderId);

        fetch(`http://localhost:8000/api/notes`, {
            method: 'POST',
            body: JSON.stringify({
                note_name: `${newNote.value}`,
                date_modified: new Date(), 
                folder_id: `${selectedFolderId}`, 
                content: `${content.value}`
            }), 
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
            <option className="folder" key={folder.id}>{folder.folder_name}</option> 
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
                        aria-label="Enter a new name for note"
                        aria-required="true"
                        aria-describedby="noteNameRequired" 
                        defaultValue=""
                        onChange={e => this.updateNewNote(e.target.value)}/>
                    {this.state.newNote.touched && (<ValidationError message={this.validateNoteName()}/>)}
                    <div id="noteNameRequired">New note name is required.</div>
                </div>
                <div>
                    <label htmlFor="note-content">Content:</label>
                    <input 
                        type="text" 
                        name="note-content"
                        id="note-content"
                        aria-label="Enter content for new note"
                        aria-required="false"
                        aria-describedby="noteContent" 
                        defaultValue="" 
                        onChange={e => this.updateContent(e.target.value)}/>
                    {this.state.content.touched && (<ValidationError message={this.validateContent()}/>)}
                    <div id="noteContent">Note content is optional.</div>
                </div>
                <div>
                    <label htmlFor="note-folder">Folder:</label>
                    <select 
                        name="note-folder" 
                        id="note-folder"
                        aria-label="Select a folder to put your new note in"
                        aria-required="true"
                        aria-describedby="noteFolderSelection"
                        onChange={e => this.updateSelectedFolder(e.target.value)}>
                        <option value="None">Select Folder</option>
                        {folderOptions}
                    </select>
                    {this.state.selectedFolder.touched && (<ValidationError message={this.validateSelectedFolder()}/>)}
                    <div id="noteFolderSelection">Select a folder is required.</div>
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