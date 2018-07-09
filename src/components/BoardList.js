import React, { Component } from 'react';
import './BoardList.css';
import { Redirect } from "react-router-dom";
import { Label, ListGroup, ListGroupItem } from 'react-bootstrap';
import ApiService from '../services/ApiService';

class BoardList extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = { boards: [], failed: false, boardToOpen: null };
    }

    componentDidMount() {
        ApiService.getBoards().then(boards => {
            this.setState({ boards });
        }).catch(() => {
            this.setState({ failed: true });
        });
    }

    render() {
        if (this.state.boardToOpen) {
            return <Redirect to={`/board/${this.state.boardToOpen}`}  push={true}/>
        }
        if (this.state.failed) {
            return <Label bsStyle="danger">There was an error loading boards from Jira, please try again later</Label>
        }
        return (
            <ListGroup>
                {this.state.boards.map(board =>
                    <ListGroupItem key={board.id} onClick={() => this.setState({ boardToOpen: board.id })}>
                        <img width={32} height={32} src={board.avatar} alt={board.name} />
                        <span className="board-name">{board.name}</span>
                    </ListGroupItem>
                )}
            </ListGroup>
        );
    }
}

export default BoardList;
