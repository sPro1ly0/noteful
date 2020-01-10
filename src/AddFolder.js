import React, { Component } from 'react';
import './AddForms.css';
import ValidationError from './ValidationError';

class AddFolder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newFolder: {
                value: '',
                touched: false
            }
        }
    }

    updateNewFolder(newFolder) {
        this.setState({
            newFolder: {value: newFolder, touched: true}
        });
    }

    validateFolderName(fieldValue) {
        const name = this.state.newFolder.value;
        if (name.length === 0) {
            return 'A folder name is required';
        } else if (name.length > 25) {
            return 'Folder name must be no longer than 25 characters long.'
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const name = this.state.newFolder.value;
        console.log(name);

    }

    render() {
        return (
            <form className="add-folder-form" onSubmit={ e=> this.handleSubmit(e)}>
                <label htmlFor="newFolder">Enter New Folder Name:</label>
                <input 
                    type="text" 
                    name="newFolder" 
                    id="newFolder" 
                    defaultValue=""
                    onChange={(e) => this.updateNewFolder(e.target.value)}/>
                {this.state.newFolder.touched && (<ValidationError message={this.validateFolderName()}/>)}
                <button 
                    type="submit"
                    disabled={
                        this.validateFolderName()
                    }
                >+ Add New Folder</button>
            </form>
        )
    }
}

export default AddFolder;