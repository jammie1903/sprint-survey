import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeContainer from '../containers/HomeContainer';
import LoginContainer from '../containers/LoginContainer';
import HeaderContainer from '../containers/HeaderContainer';
import Board from './Board';
import ViewSprintSurvey from './ViewSprintSurvey';
import ParticipateSprintSurvey from './ParticipateSprintSurvey';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <HeaderContainer />
          <div className="main">
            <Route exact path="/" component={HomeContainer} />
            <Route exact path="/login" component={LoginContainer} />
            <Route exact path="/sprint-survey/:sprintId/view" component={ViewSprintSurvey} />
            <Route exact path="/sprint-survey/:sprintId/participate" component={ParticipateSprintSurvey} />
            <Route exact path="/board/:boardId" component={Board} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
