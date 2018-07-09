import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import BoardList from './BoardList';

class Home extends Component {
  render() {
    if (!this.props.loggedIn) {
      return <Redirect to="/login" />
    }
    return (
      <div className="Home">
        <BoardList/>
      </div>
    );
  }
}

export default Home;
