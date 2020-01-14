import React, { Component } from 'react';
import './AddForms.css';
import ValidationError from './ValidationError';
import NotefulContext from './NotefulContext';
import PropTypes from 'prop-types';

class AddFolder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newFolder: {
                value: '',
                touched: false
            },
            error: null
        };
    };

    static contextType = NotefulContext;

    updateNewFolder(newFolder) {
        this.setState({
            newFolder: {value: newFolder, touched: true}
        });
    };

    validateFolderName(fieldValue) {
        const name = this.state.newFolder.value;
        if (name.length === 0) {
            return 'A folder name is required';
        } else if (name.length > 25) {
            return 'Folder name must be no longer than 25 characters long.';
        };
    };

    handleSubmit(event) {
        event.preventDefault();
        const folderName = this.state.newFolder.value;
        console.log(folderName);

        fetch(`http://localhost:9090/folders`, {
            method: 'POST',
            body: JSON.stringify({name: `${folderName}`}), 
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
                this.context.addNewFolder(data);
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ 
                    error: error.message + " data. Cannot add new folder right now."
                });
            })
    }

    render() {
        return (
            <form className="add-folder-form" onSubmit={ e=> this.handleSubmit(e)}>
                {this.state.error}
                <label htmlFor="newFolder">Enter New Folder Name:</label>
                <input 
                    type="text" 
                    name="newFolder" 
                    id="newFolder"
                    aria-label="Enter a new name for folder"
                    aria-required="true"
                    aria-describedby="folderNameRequired"
                    defaultValue=""
                    onChange={(e) => this.updateNewFolder(e.target.value)}/>
                {this.state.newFolder.touched && (<ValidationError message={this.validateFolderName()}/>)}
                <div id="folderNameRequired">A folder name is required and should be no longer than 25 characters</div>
                <button 
                    type="submit"
                    disabled={
                        this.validateFolderName()
                    }
                >+ Add New Folder</button>
            </form>
        );
    }
}

export default AddFolder;

AddFolder.propTypes = {
    history: PropTypes.object
};