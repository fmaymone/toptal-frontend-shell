/* eslint-disable linebreak-style */
import React, { Component } from 'react'
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

class SearchAppBar extends Component {
  render() {
    
    return (
      <div style={{ display: 'flex' }}>
        <div>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
           onChange={e => {
            this.props.handleSearch(e.target.value)
          }}
        />
      </div>
    )
  }
}

export default (SearchAppBar)
