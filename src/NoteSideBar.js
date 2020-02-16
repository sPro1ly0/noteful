import React, { Component } from 'react';
import NotefulContext from './NotefulContext';
import PropTypes from 'prop-types';

class NoteSideBar extends Component {

    static defaultProps = {
        history: {
            goBack: () => { }
        },
        match: {
            params: {}
        }
    };

    static contextType = NotefulContext;

    render() {
        const {folders, notes} = this.context;
        const {noteId} = this.props.match.params;

        const findNoteInfo = (notes, noteId) => notes.find(note => note.id === Number(noteId));
        const findFolder = (folders, folderId) => folders.find(folder => folder.id === folderId);
        
        const note = findNoteInfo(notes, noteId) || {};
        const folder = findFolder(folders, note.folder_id);

        return ( 
            <>
                <button type="button" role='link' onClick={() => this.props.history.goBack()}>Go back</button>
                {folder && (<h2>{folder.folder_name}</h2>)}
            </>
        );
    }
}

export default NoteSideBar;

NoteSideBar.propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
};