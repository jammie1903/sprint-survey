import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { Button, OverlayTrigger, Popover, Table, Label, ListGroup, ListGroupItem } from 'react-bootstrap';
import SurveyFields from '../common/SurveyFields';
import ApiService from '../services/ApiService';
import store from '../store';

class ViewSprintSurvey extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = { sprint: null, failed: false, participate: false, surveyResults: null, participantCount: 0, comments: [], userHasCompleted: false };
    }


    componentDidMount() {
        Promise.all([
            ApiService.getSprint(this.props.match.params.sprintId),
            ApiService.getSprintSurveyresults(this.props.match.params.sprintId)
        ])
            .then(([sprint, surveyResults]) => this.setState(Object.assign({ sprint }, this.parseSurveyResults(surveyResults))))
            .catch(() => this.setState({ failed: true }));
    }

    parseSurveyResults(surveyResults) {
        const combinedResults = {};
        const comments = [];
        let userHasCompleted = false;
        const username = store.getState().user.data.username;
        SurveyFields.forEach(field => {
            combinedResults[field.id] = [0, 0, 0];
        })
        surveyResults.forEach(result => {
            if (result.username === username) {
                userHasCompleted = true;
            }
            if (result.data.comment) {
                comments.push(result.data.comment);
            }
            Object.keys(result.data).forEach(fieldId => {
                if (combinedResults[fieldId]) {
                    combinedResults[fieldId][1 + Math.sign(result.data[fieldId])] += 1;
                }
            });
        });
        return {
            surveyResults: combinedResults,
            participantCount: surveyResults.length,
            comments,
            userHasCompleted
        };
    }

    render() {
        if (this.state.participate) {
            return <Redirect to={`/sprint-survey/${this.props.match.params.sprintId}/participate`} push={true} />
        }
        if (this.state.failed) {
            return <Label bsStyle="danger">There was an error loading this sprint survey, please try again later</Label>
        }
        if (!this.state.sprint) {
            return <Label bsStyle="info">Loading...</Label>
        }
        return (
            <div className="Survey">
                <h2>{this.state.sprint.name}</h2>
                <h4>
                    {this.state.participantCount + " Participant" + (this.state.participantCount === 1 ? "" : "s")}
                    <Button onClick={() => this.setState({ participate: true })}>
                        {this.state.userHasCompleted ? "Edit Submission" : "Participate"}
                    </Button>
                </h4>
                <Table striped bordered hover className="survey-table">
                    <tbody>
                        {SurveyFields.map((field) => {
                            const descriptionPopup = (
                                <Popover id={`popover-${field.name}`}>
                                    {field.description}
                                </Popover>
                            );
                            return (
                                <tr key={field.id}>
                                    <td className="survey-field-name">
                                        <OverlayTrigger trigger={['hover', 'focus']} placement="right" overlay={descriptionPopup}>
                                            <span>{field.name}</span>
                                        </OverlayTrigger>
                                    </td>
                                    <td className="emoji-large">
                                        {[...Array(this.state.surveyResults[field.id][2])].map((x, index) => (
                                            <span key={index} role="img" aria-label="smiling face">😊</span>
                                        ))}
                                    </td>
                                    <td className="emoji-large">
                                        {[...Array(this.state.surveyResults[field.id][1])].map((x, index) => (
                                            <span key={index} role="img" aria-label="neutral face">😐</span>
                                        ))}
                                    </td>
                                    <td className="emoji-large">
                                        {[...Array(this.state.surveyResults[field.id][0])].map((x, index) => (
                                            <span key={index} role="img" aria-label="disappointed face">😞</span>
                                        ))}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                {!this.state.comments.length ? "" : (
                    <div>
                        <h3>Comments</h3>
                        <ListGroup>
                            {this.state.comments.map((comment, index) =>
                                <ListGroupItem key={index}>
                                    {comment}
                                </ListGroupItem>
                            )}
                        </ListGroup>
                    </div>
                )};

            </div>
        );
    }
}

export default ViewSprintSurvey;
