import React, { Component } from "react";
import { connect } from 'react-redux';
import "./searchCmp.css";

const TOKEN = "0345d3af26ce1b8058e04b258cb7807d6a420656";
const url = "https://api.github.com/graphql";

class SearchCmp extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  formatInfo(arr) {
    // if version release does not exist set a string so it does not break
    let info = arr.map(repoInfo => {
      let mLanguage = repoInfo.node.primaryLanguage;
      let lRelease = repoInfo.node.releases.edges[0];
        return {
          nameWithOwner: repoInfo.node.nameWithOwner,
          url: repoInfo.node.url,
          mainLanguage: mLanguage ? mLanguage.name : '-',
          latestRelease: lRelease ? lRelease.node.name : '-',
          added: false
        }
      
    });
    return info;
  }

  handleChange(evt) {
      // change the state
      let val = evt.target.value;
      this.setState({inputValue: val});
      // if value === "" render a new empty list
      if(!val){
        this.props.dispatch({
          type: 'searchList',
          content: []
        })
      }
  }
  
  handleSubmit(evt) {
    evt.preventDefault();
    if(!this.state.inputValue){
      return;
    }
    // CREATE THE QUERY TO BE SENT
    const myQuery = {
      query: `
      {
        search(query: ${this.state.inputValue}, type: REPOSITORY, first: 10) {
          edges{
            node{
              ... on Repository {
                nameWithOwner
                url
                primaryLanguage{
              		name
                }
                releases(last: 1){
                  edges {
                    node {
                      name
                    }
                  }
                }
              }
            }
          } 
        }
      }
      `
    };
    // MAKE THE FETCH CALL 
    fetch(url, {
        body: JSON.stringify(myQuery),
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${TOKEN}`
        }
    })
      .then( response => response.text())
      .then( responseBody => {
        try {
          let parsed = JSON.parse(responseBody);
          let data = this.formatInfo(parsed.data.search.edges);
          console.log(data);
          // IN RESPONSE SEND DATA TO LIST
          this.props.dispatch({
            type: 'searchList',
            content: data
          })
        } catch (error) {
          alert('Add token for the app to work');
        }  
      })
}
  render() {
    return (
      <div className="form-container">
        <form className="form" onSubmit={this.handleSubmit}>
          <input 
            type="text" 
            className="form__input" 
            onChange={this.handleChange} 
            value={this.state.inputValue} 
          />
          <input type="submit" className="form__submit" value="Search" />
        </form>
      </div>
    );
  }
}

let connectedSearchCmp = connect()(SearchCmp)
export default connectedSearchCmp;
