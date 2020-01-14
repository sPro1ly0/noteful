import React, { Component } from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';

//SideBar Components
import MainSidebar from './MainSideBar';
import NoteSidebar from './NoteSideBar';
import AddFormsSideBar from './AddFormsSideBar';
import './SideBar.css';

//MainPage Components for Note List and Indiviual Note Content
import MainPage from './MainPage';
import NotePage from './NotePage';

//Add Folder and Add Note Forms
import AddFolder from './AddFolder';
import AddNote from './AddNote';

import NotefulContext from './NotefulContext';
import NotefulAppError from './NotefulAppError';

class App extends Component {

  state = {
    folders: [],
    notes: [],
    error: null
  };

  componentDidMount() {
    Promise.all([
      fetch(`http://localhost:9090/folders`),
      fetch(`http://localhost:9090/notes`)
    ])
      .then(([foldersResponse, notesResponse]) => {
          if (!foldersResponse.ok) {
            throw new Error('Something is wrong with the folders, please try again later.');
          }

          if(!notesResponse.ok) {
            throw new Error('Something is wrong with the notes, please try again later.');
          }

          return foldersResponse.json().then((foldersData) => {
                    console.log(foldersData);
                    this.setState({
                      folders: foldersData
                    });
                  }) &&
          
                  notesResponse.json().then((notesData) => {
                    console.log(notesData);
                    this.setState({
                      notes: notesData
                    });
                  });

      })
      .catch(error => {
        console.log('Error:', error);
        this.setState({
          error: error.message + " data. Try again later."
        });
      })
  };

  handleDeleteNote = noteId => {
    const newNotes =  this.state.notes.filter(note => note.id !== noteId);
    this.setState({
      notes: newNotes
    });
  };

  addNewFolder = newFolder => {
    this.setState({
      folders: [ ...this.state.folders, newFolder ]
    });
  };

  addNewNote = note => {
    this.setState({
      notes: [ ...this.state.notes, note ]
    });
  };

  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.handleDeleteNote,
      addNewFolder: this.addNewFolder,
      addNewNote: this.addNewNote
    };

    return (
      <div className='App'>
        <header>
            <Link to='/' tabIndex={0} ><h1>Noteful</h1></Link>
        </header>
        <p className='error-message'>{this.state.error}</p>
          <NotefulContext.Provider value={contextValue}>
            <div className='main-section'>
                <nav className='side-navbar'>
                  <NotefulAppError>
                      <Route 
                        exact path='/'
                        key={'/'}
                        component={MainSidebar}
                      />
                      <Route 
                        exact path='/folder/:folderId'
                        key={'/folder/:folderId'}
                        component={MainSidebar}
                      />
                      <Route 
                        exact path='/note/:noteId'
                        key={'/note/:noteId'}
                        component={NoteSidebar}
                      />
                      <Route 
                        path='/add-folder'
                        component={AddFormsSideBar}
                      />
                      <Route 
                        path='/add-note'
                        component={AddFormsSideBar}
                      />
                  </NotefulAppError> 
                </nav>
                <main>
                    <NotefulAppError>
                      <Route 
                        exact path='/'
                        key={'/'}
                        component={MainPage}
                        />
                      <Route
                        exact path='/folder/:folderId'
                        key={'/folder/:folderId'}
                        component={MainPage}
                      />
                      <Route 
                        exact path='/note/:noteId'
                        key={'/note/:noteId'}
                        component={NotePage}
                      />
                      <Route 
                        path='/add-folder'
                        component={AddFolder}
                      />
                      <Route
                        path='/add-note'
                        component={AddNote}
                      />
                  </NotefulAppError> 
                </main>
            </div>
          </NotefulContext.Provider> 
      </div>
    );
  }
  
}

export default App;