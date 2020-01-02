import React, { Component } from 'react';

class MainNoteList extends Component {
    render() {
        return (
            <main>
                <li>
                    <h2>Note 1</h2>
                    <div>
                    <p>Date</p>
                    <button>Delete Note</button>
                    </div>
                </li>
                <li>
                    <h2>Note 1</h2>
                    <div>
                    <p>Date</p>
                    <button>Delete Note</button>
                    </div>
                </li>
                <li>
                    <h2>Note 1</h2>
                    <div>
                    <p>Date</p>
                    <button>Delete Note</button>
                    </div>
                </li>
                <button>Add Note</button>
            </main>
        )
    }
}

export default MainNoteList;