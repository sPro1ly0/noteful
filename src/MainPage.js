import React, { Component } from 'react';
import './MainPage.css'
//import { Link } from 'react-router-dom';
import NotesContext from './NotesContext';

class MainPage extends Component {
    static contextType = NotesContext;

    render() {
        const notesList = this.context.notes
        //.map(note =>
        //     <li key={note.id}>
        //         <Link to={`/note/${note.id}`}><h2>{note.name}</h2></Link>
        //         <div className='note-date-button'>
        //             <p>Date modified on {note.modified}</p>
        //             <button>Delete Note</button>
        //         </div>
        //     </li>
        // )
        return (
            <>
                {notesList}
                <button className='add-note-button'>Add Note</button>
            </>
        )
    }
}

export default MainPage;