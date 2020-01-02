import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import SideBar from './SideBar';
import MainNoteList from './MainNoteList';

class App extends Component {

  render() {
    return (
      <div className='App'>
        <Header />
        <div className='main-section'>
          <SideBar />
          <MainNoteList />
        </div>
      </div>
    );
  }
  
}

export default App;