import React, { Component } from 'react';
import { connect } from 'react-redux';
import './listCmp.css';

class ListCmp extends Component {
    constructor(props){
        super(props);
        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.formatItems = this.formatItems.bind(this);
    }

    formatItems(repo) {
        return (
            <li className="repo">
                <a href={repo.url} target="_blank" className="repo__name">
                    {repo.nameWithOwner}
                </a>
                <div className="repo__language">
                    {repo.mainLanguage}
                </div>
                <div className="repo__version">
                    {repo.latestRelease}
                </div>
                {
                    // render different button with different functionality
                    // dependeing on the prop 'favorite'
                    !this.props.favorite ?
                        <button 
                            className={repo.added ? "repo__button hidden" : "repo__button"} 
                            onClick={() => this.addItem(repo)}
                        >
                            Add
                        </button>
                    :
                        <button className="repo__button" onClick={() => this.removeItem(repo)}>
                            Remove
                        </button>
                }
            </li>
        )
    }

    addItem(repo) {
        repo.added = true;
        let newArr = this.props.fList.slice();
        newArr.push(repo);
        this.props.dispatch({
            type: 'addRepo',
            content: newArr
        })
    }

    removeItem(repo) {
        repo.added = false;
        this.props.dispatch({
            type: 'removeRepo',
            content: repo
        })
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