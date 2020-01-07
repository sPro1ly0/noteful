import React, { Component } from 'react';
import './App.css';

import MainSidebar from './MainSideBar';
//import NoteSidebar from './NoteSideBar';
import './SideBar.css';

import MainPage from './MainPage';
//import NotePage from './NotePage';

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
                }),
        
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
  }

  
  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
    }

    // const {folders, notes} = this.state;
    // const findNoteInfo = (notes, noteId) => notes.find(note => note.id === noteId);
    // const findFolder = (folders, folderId) => folders.find(folder => folder.id === folderId);
    // const findNotesInFolder = (notes, folderId) => (
    //   folderId 
    //       ? notes.filter(note => note.folderId === folderId)
    //       : notes)

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
                    // render={() => {
                    //   return <MainSidebar folders={folders} />
                    // }}
                    component={MainSidebar}
                  />
                  {/* <Route 
                    exact path='/folder/:folderId'
                    key={'/folder/:folderId'}
                    // render={() => {
                    //   return <MainSidebar folders={folders} />
                    // }}
                    component={MainSidebar}
                  />
                  <Route 
                    exact path='/note/:noteId'
                    key={'/note/:noteId'}
                    // render={(routerProps) => {
                    //     const {noteId} = routerProps.match.params;
                    //     const note = findNoteInfo(notes, noteId) || {};
                    //     const folder = findFolder(folders, note.folderId);
                    //     return <NoteSidebar {...routerProps} folder={folder}/> }}
                    component={NoteSidebar}
                  /> */}
              </div>
              <main>
                  <Route 
                    exact path='/'
                    key={'/'}
                    // render={(props) => {
                    //   return <MainPage {...props} notes={notes}/>
                    // }}
                    component={MainPage}
                    />
                  {/* <Route
                    exact path='/folder/:folderId'
                    key={'/folder/:folderId'}
                    // render={(routerProps) => {
                    //     const {folderId} = routerProps.match.params;
                    //     const notesInFolder = findNotesInFolder(notes, folderId);
                    //   return (<MainPage
                    //       {...routerProps} 
                    //       notes={notesInFolder} />
                    //   );
                    // }}
                    component={MainPage}
                  />
                  <Route 
                    exact path='/note/:noteId'
                    key={'/note/:noteId'}
                    // render={(routerProps) => {
                    //     const {noteId} = routerProps.match.params;
                    //     const note = findNoteInfo(notes, noteId);
                    //     return <NotePage 
                    //         {...routerProps} 
                    //         note={note}/>
                    // }}
                    component={NotePage}
                  /> */}
              </main>
          </div>
        </NotesContext.Provider> 
      </div>
    );
  }
  
}

export default App;