import React, { Component } from 'react';
import NotesContext from './NotesContext';

class NotePage extends Component {

    static defaultProps = {
        match:{
            params:{}
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
            this.props.history.push('/')
          })
          .catch(error => {
            console.error({ error })
          })
      }

    render() {
        const {notes} = this.context;
        const {noteId} = this.props.match.params;
        const findNoteInfo = (notes, noteId) => notes.find(note => note.id === noteId);
        const note = findNoteInfo(notes, noteId)

        return (
            <>
                <li key={note.id}>
                    <h2>{note.name}</h2>
                    <div className='note-date-button'>
                    <p>Date modified on {note.modified}</p>
                        <button
                            onClick={this.handleClickDelete}
                        >
                            Delete Note</button>
                    </div>
                </li>
                <p>
                    {note.content}
                </p>
            </>
        )
    }
}

export default NotePage;