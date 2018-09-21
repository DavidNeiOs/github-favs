import React, { Component } from "react";
import { connect } from 'react-redux';
import "./searchCmp.css";

const TOKEN = "db6ca9d088f13cdefb5eb8f0fc9d7ed80c9ed71b";
const url = "https://api.github.com/graphql";

class SearchCmp extends Component {
  constructor() {
    super();
    this.state = {
      response: "",
      inputValue: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  formatInfo(arr) {
    // if version release does not exist set a string so it does not break
    let info = arr.map(repoInfo => {
      let mLanguage = repoInfo.node.languages.edges[0];
      let lRelease = repoInfo.node.releases.edges[0];
        return {
          nameWithOwner: repoInfo.node.nameWithOwner,
          url: repoInfo.node.url,
          mainLanguage: mLanguage ? mLanguage.node.name : '-',
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
  }
  
  handleSubmit(evt) {
    evt.preventDefault();
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
                languages(first: 1){
                  edges {
                    node {
                      name
                    }
                  }
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
          let parsed = JSON.parse(responseBody);
          let data = this.formatInfo(parsed.data.search.edges);
          console.log(data);
          // IN RESPONSE SEND DATA TO LIST
          this.props.dispatch({
            type: 'searchList',
            content: data
          })
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
