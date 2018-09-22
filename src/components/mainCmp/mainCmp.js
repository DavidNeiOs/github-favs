import React, { Component } from 'react';
import SearchCmp from '../searchCmp/searchCmp';
import ListCmp from '../listCmp/listCmp';
import './mainCmp.css';

class MainCmp extends Component {
    render() {
        return (
            <div className="main-container">
                <div className="left-container">
                    <SearchCmp />
                    <ListCmp />
                </div>
                <div className="right-container">
                    <ListCmp favorite />
                </div>
            </div>
        )
    }
}

export default MainCmp;