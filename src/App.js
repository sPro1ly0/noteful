import React, { Component } from 'react';
import './App.css';

import MainSidebar from './MainSideBar';
import NoteSidebar from './NoteSideBar';
import AddFormsSideBar from './AddFormsSideBar';
import './SideBar.css';

import MainPage from './MainPage';
import NotePage from './NotePage';

import AddFolder from './AddFolder';
import AddNote from './AddNote';

//import Store from './Dummy-Store';
import { Route, Link } from 'react-router-dom';
import NotesContext from './NotesContext';

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
            throw new Error('Something is wrong with the notes, please try again later.')
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
        console.log('Error', error)
        this.setState({
          error: error.message
        })
      })
  };

  handleDeleteNote = noteId => {
    const newNotes =  this.state.notes.filter(note => note.id !== noteId);
    this.setState({
      notes: newNotes
    });
  };

  addNewFolder = folder => {
    this.setState({
      folders: [ ...this.state.folders, folder ]
    });
  };

  addNewNote = note => {
    this.setState({
      notes: [ ...this.state.notes, note ]
    })
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
            <Link to='/'><h1>Noteful</h1></Link>
        </header>
        <NotesContext.Provider value={contextValue}>
          <div className='main-section'>
              <div className='side-navbar'>
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
                    // render={(routerProps) => {
                    //     const {noteId} = routerProps.match.params;
                    //     const note = findNoteInfo(notes, noteId) || {};
                    //     const folder = findFolder(folders, note.folderId);
                    //     return <NoteSidebar {...routerProps} folder={folder}/> }}
                  />
                  <Route 
                    path='/add-folder'
                    component={AddFormsSideBar}
                  />
                  <Route 
                    path='/add-note'
                    component={AddFormsSideBar}
                  />
              </div>
              <main>
                  <Route 
                    exact path='/'
                    key={'/'}
                    component={MainPage}
                    />
                  <Route
                    exact path='/folder/:folderId'
                    key={'/folder/:folderId'}
                    component={MainPage}
                    // render={(routerProps) => {
                    //     const {folderId} = routerProps.match.params;
                    //     const notesInFolder = findNotesInFolder(notes, folderId);
                    //   return (<MainPage
                    //       {...routerProps} 
                    //       notes={notesInFolder} />
                    //   );
                    // }}
                  />
                  <Route 
                    exact path='/note/:noteId'
                    key={'/note/:noteId'}
                    component={NotePage}
                    // render={(routerProps) => {
                    //     const {noteId} = routerProps.match.params;
                    //     const note = findNoteInfo(notes, noteId);
                    //     return <NotePage 
                    //         {...routerProps} 
                    //         note={note}/>
                    // }}
                  />
                  <Route 
                    path='/add-folder'
                    component={AddFolder}
                  />
                  <Route
                    path='/add-note'
                    component={AddNote}
                  />
              </main>
          </div>
        </NotesContext.Provider> 
      </div>
    );
  }
  
}

export default App;