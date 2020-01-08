import React, { Component } from 'react';
import './MainPage.css'
import { Link } from 'react-router-dom';
import NotesContext from './NotesContext';

class MainPage extends Component {
    static defaultProps = {
        match: {
            params: {}
        },
        onDeleteNote: () => {},
    }

    static contextType = NotesContext;

    handleClickDelete = e => {
        e.preventDefault();
        const noteId = this.context.notes.id;
    
        fetch(`http://localhost:9090/notes/${noteId}`, {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json'
          },
        })
          .then(res => {
            if (!res.ok)
              return res.json().then(e => Promise.reject(e))
            return res.json()
          })
          .then(() => {
            this.context.deleteNote(noteId)
            // allow parent to perform extra behaviour
            this.props.onDeleteNote(noteId)
          })
          .catch(error => {
            console.error({ error });
            console.log(error.message);
          })
      }


    render() {
        
        const {folderId} = this.props.match.params;
        const {notes} = this.context;

        const findNotesInFolder = (notes, folderId) => (
            folderId 
                ? notes.filter(note => note.folderId === folderId)
                : notes);

        const notesInFolder = findNotesInFolder(notes, folderId);        
        const notesList = notesInFolder.map(note =>
                <li key={note.id}>
                    <Link to={`/note/${note.id}`}><h2>{note.name}</h2></Link>
                    <div className='note-date-button'>
                        <p>Date modified on {note.modified}</p>
                        <button
                        onClick={this.handleClickDelete}
                        >Delete Note</button>
                    </div>
                </li>
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