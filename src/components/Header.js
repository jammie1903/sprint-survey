import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import './Header.css';

class Header extends Component {

  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            Sprint Survey
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        {this.props.loggedIn &&
          <Navbar.Collapse>
            <Navbar.Text pullRight> Signed in as: {this.props.user.name}
              <Navbar.Link className="navbar-button" onClick={() => this.props.onLogout()}>Sign Out</Navbar.Link>
            </Navbar.Text>
          </Navbar.Collapse>
        }
      </Navbar>
    );
  }
}

export default Header;
