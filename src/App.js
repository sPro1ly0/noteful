import React, { Component } from 'react';
import Header from './Header';
import SideBar from './SideBar';
import MainNoteList from './MainNoteList';

class App extends Component {

  render() {
    return (
      <div className='App'>
        <Header />
        <SideBar />
        <MainNoteList />
      </div>
    );
  }
  
}

export default App;