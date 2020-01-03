import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class MainSideBar extends Component {
    render() {
        const folderList = this.props.folders.map((folder) =>
            <NavLink to ={`/folder/${folder.id}`} className="folder" key={folder.id}>{folder.name}</NavLink> 
        );
        console.log(folderList);
        return ( 
            <>
                {folderList}
                <button>Add Folder</button>
            </>
        )
    }
}

export default MainSideBar;