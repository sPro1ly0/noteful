import React, { Component } from 'react';
import './SideBar.css';

class SideBar extends Component {
    render() {
        return (
            <div className='side-navbar'>
                <li>Folder 1</li>
                <li>Folder 1</li>
                <li>Folder 1</li>
                <button>Add Folder</button>
            </div>
        )
    }
}

export default SideBar;