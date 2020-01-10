import React from 'react';

const NotesContext = React.createContext({
    folders: [],
    notes: [],
    deleteNote: () => {},
    addNewFolder: () => {},
    addNewNote: () => {}
});

export default NotesContext;