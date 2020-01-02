import React, { Component } from 'react';
import './MainNoteList.css';

class MainNoteList extends Component {
    render() {
        return (
            <main>
                <li>
                    <h2>Note 1</h2>
                    <div className='note-date-button'>
                        <p>Date</p>
                        <button>Delete Note</button>
                    </div>
                </li>
                <li>
                    <h2>Note 1</h2>
                    <div className='note-date-button'>
                    <p>Date</p>
                    <button>Delete Note</button>
                    </div>
                </li>
                <li>
                    <h2>Note 1</h2>
                    <div className='note-date-button'>
                    <p>Date</p>
                    <button>Delete Note</button>
                    </div>
                </li>
                <button className='add-note-button'>Add Note</button>
            </main>
        )
    }
}

export default MainNoteList;