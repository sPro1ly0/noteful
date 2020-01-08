import React, { Component } from 'react';
import './App.css';

import MainSidebar from './MainSideBar';
import NoteSidebar from './NoteSideBar';
import './SideBar.css';

import MainPage from './MainPage';
import NotePage from './NotePage';

//import Store from './Dummy-Store';
import { Route, Link } from 'react-router-dom';
import NotesContext from './NotesContext';

class App extends Component {

  state = {
    folders: [],
    notes: [],
    error: null
  }

  componentDidMount() {
    Promise.all([
      fetch(`http://localhost:9090/folders`),
      fetch(`http://localhost:9090/notes`)
    ])
      .then(([foldersResponse, notesResponse]) => {

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
                })

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

  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.handleDeleteNote,
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
              </main>
          </div>
        </NotesContext.Provider> 
      </div>
    );
  }
  
}

export default App;