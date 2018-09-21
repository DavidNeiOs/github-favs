import React, { Component } from 'react';
import './App.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import HeaderCmp from './components/headerCmp/headerCmp';
import MainCmp from './components/mainCmp/mainCmp';

let reducer = function (state, action) {
  if(action.type === 'searchList') {
    return { ...state, searchList: action.content };
  }
  return state;
}

let myStore = createStore(
  reducer,
  {searchList: [], addedList: []},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
class App extends Component {
  render() {
    return (
      <Provider store={myStore}>
        <div>
          <HeaderCmp />
          <MainCmp />
        </div>
      </Provider>
    );
  }
}

export default App;
