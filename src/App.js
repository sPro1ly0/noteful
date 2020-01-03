import React, { Component } from 'react';
import './App.css';

import MainSidebar from './MainSideBar';
import NoteSidebar from './NoteSideBar';
import './SideBar.css';

import MainPage from './MainPage';
import NotePage from './NotePage';

import Store from './Dummy-Store';
import { Route, Link } from 'react-router-dom';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      folders: Store.folders,
      notes: Store.notes
    }
  }

  
  render() {
    const findNoteInfo = (notes, noteId) => notes.find(note => note.id === noteId);
    const findFolder = (folders, folderId) => folders.find(folder => folder.id === folderId);

    return (
      <div className='App'>
        <header>
            <Link to='/'><h1>Noteful</h1></Link>
        </header>
        <div className='main-section'>
            <div className='side-navbar'>
                <Route 
                  exact path='/'
                  key={'/'}
                  render={() => {
                    return <MainSidebar folders={this.state.folders} />
                  }}
                />
                <Route 
                  exact path='/folder/:folderId'
                  key={'/folder/:folderId'}
                  render={() => {
                    return <MainSidebar folders={this.state.folders} />
                  }}
                />
                <Route 
                  exact path='/note/:noteId'
                  key={'/note/:noteId'}
                  render={(routerProps) => {
                      const {noteId} = routerProps.match.params;
                      const note = findNoteInfo(this.state.notes, noteId);
                      const folder = findFolder(this.state.folders, note.folderId);
                      return <NoteSidebar {...routerProps} folder={folder}/>
                  }}
                />
            </div>
            <main>
                <Route 
                  exact path='/'
                  key={'/'}
                  render={(props) => {
                    return <MainPage {...props} notes={this.state.notes}/>
                  }}/>
                <Route
                  exact path='/folder/:folderId'
                  key={'/folder/:folderId'}
                  render={(routerProps) => {
                      const {folderId} = routerProps.match.params;
                      const findNotesInFolder = (notes, folderId) => (
                          folderId ? 
                          this.state.notes.filter(note => note.folderId === folderId)
                          : notes
                    )
                    return (<MainPage
                        {...routerProps} 
                        notes={findNotesInFolder(this.state.notes, folderId)} />
                    );
                  }}
                />
                <Route 
                  exact path='/note/:noteId'
                  key={'/note/:noteId'}
                  render={(routerProps) => {
                      const {noteId} = routerProps.match.params;
                      const findNoteInfo = (notes, noteId) => 
                        this.state.notes.find(note => note.id === noteId);
                      return <NotePage 
                          {...routerProps} 
                          note={findNoteInfo(this.state.notes, noteId)}/>
                      
                  }}
                />
            </main>
        </div>
      </div>
    );
  }
  
}

export default App;