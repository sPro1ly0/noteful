import React, { Component } from 'react';
import './AddForms.css';

class AddNote extends Component {

    handleSubmit(e) {
        e.preventDefault();
        
    }

    render() {
        return (
            <form className="add-note-form">
                <div>
                    <label htmlFor="new-note">Enter New Note Name:</label>
                    <input type="text" name="new-note" id="new-note" defaultValue=""/>
                </div>
                <div>
                    <label htmlFor="note-content">Content:</label>
                    <input type="text" name="note-content" id="note-content" defaultValue="" />
                </div>
                <div>
                    <label htmlFor="note-folder">Folder:</label>
                    <select id="note-folder">
                        <option>Select Folder</option>
                    </select>
                </div>
                <button type="submit">+ Add New note</button>
            </form>
        )
    }
}

export default AddNote;