import React, { Component } from 'react';
import './App.css';
import HeaderCmp from './components/headerCmp/headerCmp';
import MainCmp from './components/mainCmp/mainCmp'

class App extends Component {
  render() {
    return (
      <div>
        <HeaderCmp />
        <MainCmp />
      </div>
    );
  }
}

export default App;
