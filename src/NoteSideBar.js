import React, { Component } from 'react';
import NotesContext from './NotesContext';

class NoteSideBar extends Component {

    static defaultProps = {
        history: {
            goBack: () => { }
        },
        match: {
            params: {}
        }
    };

    static contextType = NotesContext;

    render() {
        const {folders, notes} = this.context;
        const {noteId} = this.props.match.params;

        const findNoteInfo = (notes, noteId) => notes.find(note => note.id === noteId);
        const findFolder = (folders, folderId) => folders.find(folder => folder.id === folderId);
        
        const note = findNoteInfo(notes, noteId) || {};
        const folder = findFolder(folders, note.folderId);

        return ( 
            <>
                <button type="button" role='link' onClick={() => this.props.history.goBack()}>Go back</button>
                {folder && (<h2>{folder.name}</h2>)}
            </>
        )
    }
}

export default NoteSideBar;