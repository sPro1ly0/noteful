import React, { Component } from 'react';
import Note from './Note';
import NotefulContext from './NotefulContext';
import PropTypes from 'prop-types';

class NotePage extends Component {

    static defaultProps = {
        match:{
            params:{}
        },
        onDeleteNote: () => {},
    };

    static contextType = NotefulContext;

    handleDeleteNote = noteId => {
        this.props.history.push('/')
    };

    render() {
        const {notes} = this.context;
        const {noteId} = this.props.match.params;
        const findNoteInfo = (notes, noteId) => notes.find(note => note.id === noteId);
        const note = findNoteInfo(notes, noteId) || { content: ''};

        return (
            <>
                <ul>
                    <Note
                        id={note.id}
                        name={note.name}
                        modified={note.modified}
                        onDeleteNote={this.handleDeleteNote}
                        />
                </ul>
                <p>
                    {note.content}
                </p>
            
            </>
        )
    }
}

export default NotePage;

NotePage.propTypes = {
    match: PropTypes.object.isRequired,
    onDeleteNote: PropTypes.func
};