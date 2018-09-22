import React, { Component } from 'react';
import './App.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import HeaderCmp from './components/headerCmp/headerCmp';
import MainCmp from './components/mainCmp/mainCmp';

let reducer = function (state, action) {
  if(action.type === 'searchList') {
    // check if added list is empty
    // or input field was cleared
    if(!state.addedList.length || !action.content.length){
      return { ...state, searchList: action.content };
    } else {
      // if it is not empty check if there are repos in added list
      let newSearch = action.content.map(item => {
        for(let i = 0; i < state.addedList.length; i++){
          if(item.nameWithOwner === state.addedList[i].nameWithOwner) {
            // if there are repos switch the object with the one added = false
            return state.addedList[i];
          }
        }
        return item;
      });
      return { ...state, searchList: newSearch };
    }
  }
  if(action.type === 'addRepo') {
    return { ...state, addedList: action.content };
  }
  if(action.type === 'removeRepo') {
    // Remove repo from added list
    let newFav = state.addedList.slice();
    newFav = newFav.filter(item => item.nameWithOwner !== action.content.nameWithOwner)

    // change the added property of the repo
    let newSearch = state.searchList.slice();
    newSearch = newSearch.map(item => {
      if(item.nameWithOwner === action.content.nameWithOwner) {
        return action.content;
      }
      return item;
    })

    // Set state
    return { searchList: newSearch, addedList: newFav}
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
