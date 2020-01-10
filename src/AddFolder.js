import React, { Component } from 'react';

class AddFolder extends Component {

    handleSubmit(e) {
        e.preventDefault();
        
    }

    render() {
        return (
            <form className="add-folder-form">
                <label htmlFor="new-folder">Enter New Folder Name:</label>
                <input type="text" name="new-folder" id="new-folder" defaultValue="New Name Here"/>
                <button type="submit">+ Add New Folder</button>
            </form>
        )
    }
}

export default AddFolder;