import React, { Component } from 'react';
import Note from './Note';
import NotesContext from './NotesContext';

class NotePage extends Component {

    static defaultProps = {
        match:{
            params:{}
        },
        onDeleteNote: () => {},
    }

    static contextType = NotesContext;

    handleDeleteNote = noteId => {
        this.props.history.push('/')
    }

    render() {
        const {notes} = this.context;
        const {noteId} = this.props.match.params;
        const findNoteInfo = (notes, noteId) => notes.find(note => note.id === noteId);
        const note = findNoteInfo(notes, noteId) || { content: ''}

        return (
            <>
                <Note
                    id={note.id}
                    name={note.name}
                    modified={note.modified}
                    onDeleteNote={this.handleDeleteNote}
                    />

                <p>
                    {note.content}
                </p>
            </>
        )
    }
}

export default NotePage;