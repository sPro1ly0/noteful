import React, { Component } from 'react';
import './MainPage.css';
import NotesContext from './NotesContext';
import Note from './Note';

class MainPage extends Component {
    static defaultProps = {
        match: {
            params: {}
        },
        onDeleteNote: () => {},
    }

    static contextType = NotesContext;

    render() {
        
        const {folderId} = this.props.match.params;
        const {notes} = this.context;

        const findNotesInFolder = (notes, folderId) => (
            folderId 
                ? notes.filter(note => note.folderId === folderId)
                : notes);

        const notesInFolder = findNotesInFolder(notes, folderId);        
        const notesList = notesInFolder.map(note =>
                <Note 
                    key={note.id}
                    id={note.id}
                    name={note.name}
                    modified={note.modified}
                />
            )
            
        return (
            <>
                {notesList}
                <button className='add-note-button'>Add Note</button>
            </>
        )
    }
}

export default MainPage;