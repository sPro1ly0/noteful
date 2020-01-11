import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import NotefulContext from './NotefulContext';

class MainSideBar extends Component {

    static contextType = NotefulContext;

    render() {
        const folderList = this.context.folders.map((folder) =>
            <NavLink to ={`/folder/${folder.id}`} className="folder" key={folder.id}>{folder.name}</NavLink> 
        );

        return ( 
            <>
                {folderList}
                <Link to='/add-folder' className='add-folder-button'>Add Folder</Link>
            </>
        );
    }
}

export default MainSideBar;