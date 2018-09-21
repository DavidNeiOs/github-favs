import React, { Component } from 'react';
import { connect } from 'react-redux';
import './listCmp.css';

class ListCmp extends Component {
    constructor(props){
        super(props);
    }
    formatItems(repo) {
        return (
            <li className="repo">
                <div className="repo__name">
                    {repo.nameWithOwner}
                </div>
                <div className="repo__language">
                    {repo.mainLanguage}
                </div>
                <div className="repo__version">
                    {repo.latestRelease}
                </div>
                <button>
                    Add
                </button>
            </li>
        )
    }
    render() {
      return !this.props.favorite ?
        (
            <div className="list-container">
                <div className="list__header">
                    <p className="list__header__title">
                        Name
                    </p>
                    <p className="list__header__title">
                        Language
                    </p>
                    <p className="list__header__title">
                        Latest tag
                    </p>
                    <ul className="repo-list">
                        {this.props.sList.map(repo => this.formatItems(repo))}
                    </ul>
                </div>
            </div>
        )
        :
        (
            <div className="list-container">
                <div className="list__header">
                    <p className="list__header__title">
                        Name
                    </p>
                    <p className="list__header__title">
                        Language
                    </p>
                    <p className="list__header__title">
                        Latest tag
                    </p>
                    <ul className="repo-list">
                        {this.props.fList.map(repo => this.formatItems(repo))}
                    </ul>
                </div>
            </div>
        )
        
    }
}

let mapStateToProps = function(state) {
    return (
        {
            fList : state.addedList,
            sList : state.searchList
        }
    ); 
}

let connectedListCmp = connect(mapStateToProps)(ListCmp)

export default connectedListCmp;