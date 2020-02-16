import React, { Component } from 'react';
import './MainPage.css';
import NotefulContext from './NotefulContext';
import Note from './Note';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class MainPage extends Component {
    
    static defaultProps = {
        match: {
            params: {}
        }
    };

    static contextType = NotefulContext;

    render() {
        
        const { folderId } = this.props.match.params;
        const { notes } = this.context;

        const findNotesInFolder = (notes, folderId) => (
            folderId 
                ? notes.filter(note => note.folder_id === Number(folderId))
                : notes);

        const notesInFolder = findNotesInFolder(notes, folderId);        
        const notesList = notesInFolder.map(note =>
                <Note 
                    key={note.id}
                    id={note.id}
                    name={note.note_name}
                    modified={note.date_modified}
                />
            );
            
        return (
            <>
                <ul>
                    {notesList}
                </ul>
                <Link to='/add-note' className='add-note-button'>Add Note</Link>
            </>
        )
    }
}

export default MainPage;

MainPage.propTypes = {
    match: PropTypes.object.isRequired
};