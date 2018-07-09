import React, { Component } from 'react';
import './BoardList.css';
import { Redirect } from "react-router-dom";
import { Label, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import ApiService from '../services/ApiService';

class Board extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = { board: null, failed: false, sprintToOpen: null };
    }

    componentDidMount() {
        ApiService.getBoard(this.props.match.params.boardId).then(board => {
            this.setState({ board });
        }).catch(() => {
            this.setState({ failed: true });
        });
    }

    render() {
        if (this.state.sprintToOpen) {
            return <Redirect to={`/sprint-survey/${this.state.sprintToOpen}/${this.state.participate ? "participate" : "view"}`} push={true} />
        }
        if (this.state.failed) {
            return <Label bsStyle="danger">There was an error loading this board from Jira, please try again later</Label>
        }
        if (!this.state.board) {
            return <Label bsStyle="info">Loading...</Label>
        }
        return (
            <div>
                <h2>{this.state.board.name}</h2>
                <ListGroup>
                    {this.state.board.sprints.map(sprint =>
                        <ListGroupItem key={sprint.id}>
                            <span className="sprint-name">{sprint.name}</span>
                            {/* <ButtonGroup> */}
                                <Button onClick={() => this.setState({ sprintToOpen: sprint.id })}>View</Button>
                                <Button onClick={() => this.setState({ sprintToOpen: sprint.id, participate: true })}>Participate</Button>
                            {/* </ButtonGroup> */}
                        </ListGroupItem>
                    )}
                </ListGroup>
            </div>
        );
    }
}

export default Board;
