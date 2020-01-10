import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import NotesContext from './NotesContext';

class MainSideBar extends Component {

    static contextType = NotesContext;

    render() {
        const folderList = this.context.folders.map((folder) =>
            <NavLink to ={`/folder/${folder.id}`} className="folder" key={folder.id}>{folder.name}</NavLink> 
        );

        return ( 
            <>
                {folderList}
                <button>Add Folder</button>
            </>
        );
    }
}

export default MainSideBar;