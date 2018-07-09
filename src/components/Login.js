import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { Button, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

class Login extends Component {

    constructor(props, context) {
        super(props, context);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.urlChanged = this.urlChanged.bind(this);
        this.usernameChanged = this.usernameChanged.bind(this);
        this.passwordChanged = this.passwordChanged.bind(this);

        this.state = {
            url: 'https://synety.atlassian.net',
            username: '',
            password: ''
        };
    }

    urlChanged(e) {
        this.setState({
            url: e.target.value,
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.allowSubmit) {
            return;
        }
        this.props.onLogin(this.state)
            .then(success => {
                if (!success) {
                    this.setState({ failed: true });
                }
            });
    }

    usernameChanged(e) {
        this.setState({
            username: e.target.value,
        });
    }

    passwordChanged(e) {
        this.setState({
            password: e.target.value,
        });
    }

    get allowSubmit() {
        return !this.props.loggedIn && this.state.url && this.state.username && this.state.password;
    }

    render() {
        if (this.props.loggedIn) {
            return <Redirect to="/" />
        }
        return (
            <form onSubmit={this.handleSubmit}>
                <h1>Login</h1>
                <FormGroup>
                    <ControlLabel>Domain</ControlLabel>
                    <FormControl
                        type="url"
                        value={this.state.url}
                        placeholder="Jira url"
                        onChange={this.urlChanged}
                    />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Username</ControlLabel>
                    <FormControl
                        type="text"
                        autoComplete="username"
                        value={this.state.username}
                        placeholder="username"
                        onChange={this.usernameChanged}
                    />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                        type="password"
                        autoComplete="current-password"
                        value={this.state.password}
                        placeholder="password"
                        onChange={this.passwordChanged}
                    />
                </FormGroup>
                {this.state.failed &&
                    <div>Login failed, please try again</div>
                }
                <Button bsStyle="primary" type="submit" disabled={!this.allowSubmit} onClick={this.handleSubmit}>Login</Button>
            </form>
        );
    }
}

export default Login;
