import React, { Component } from 'react';
import './searchCmp.css';

class SearchCmp extends Component {
    render() {
        return (
            <div className="form-container">
                <form className="form">
                    <input 
                        type="text"
                        className="form__input"
                    />
                    <input 
                        type="submit"
                        className="form__submit"
                        value="Search"
                    />
                </form>
            </div>
        );
    }
}

export default SearchCmp;