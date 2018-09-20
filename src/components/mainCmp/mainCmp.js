import React, { Component } from 'react';
import SearchCmp from '../searchCmp/searchCmp';
import './mainCmp.css';

class MainCmp extends Component {
    render() {
        return (
            <div className="main-container">
                <div className="left-container">
                    <SearchCmp />
                </div>
                <div className="right-container">

                </div>
            </div>
        )
    }
}

export default MainCmp;