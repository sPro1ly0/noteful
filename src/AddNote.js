import React, { Component } from 'react';
import './AddForms.css';
import NotesContext from './NotesContext';

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
            }

        }
    }

    static contextType = NotesContext;
    
    updateNewNote(newNote) {
        this.setState({
            newNote: {value: newNote}
        });
    }
    
    updateContent(content) {
        this.setState({
            content: {value: content}
        });
    }

    updateSelectedFolder(selectedFolder) {
        this.setState({
            selectedFolder: {value: selectedFolder}
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { newNote, content, selectedFolder } = this.state;
        console.log(newNote);
        console.log(content);
        console.log(selectedFolder);
        
    }

    render() {
        const folderOptions = this.context.folders.map((folder) =>
            <option className="folder" key={folder.id}>{folder.name}</option> 
        );

        return (
            <form className="add-note-form" onSubmit={e => this.handleSubmit(e)}>
                <div>
                    <label htmlFor="new-note">Enter New Note Name:</label>
                    <input 
                        type="text" 
                        name="new-note" 
                        id="new-note" 
                        defaultValue=""
                        onChange={e => this.updateNewNote(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="note-content">Content:</label>
                    <input 
                        type="text" 
                        name="note-content" 
                        id="note-content" 
                        defaultValue="" 
                        onChange={e => this.updateContent(e.target.value)}/>
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
                </div>
                <button type="submit">+ Add New note</button>
            </form>
        )
    }
}

export default AddNote;