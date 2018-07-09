import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { OverlayTrigger, Popover, Table, Label, Button, FormControl } from 'react-bootstrap';
import SurveyFields from '../common/SurveyFields';
import ApiService from '../services/ApiService';

class ParticipateSprintSurvey extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = { sprint: null, failed: false, done: false, surveyData: null };
    }


    componentDidMount() {
        Promise.all([
            ApiService.getSprint(this.props.match.params.sprintId),
            ApiService.getOwnSprintSurveyData(this.props.match.params.sprintId)
        ])
            .then(([sprint, surveyData]) => this.setState({ sprint, surveyData: surveyData ? surveyData.data : {} }))
            .catch(() => this.setState({ failed: true }));
    }

    onFieldSet(fieldId, value) {
        this.setState({
            surveyData: Object.assign({}, this.state.surveyData, { [fieldId]: value })
        });
    }

    setComment(comment) {
        this.setState({
            surveyData: Object.assign({}, this.state.surveyData, { comment })
        });
    }

    get allowSubmit() {
        return SurveyFields.every(field => this.state.surveyData.hasOwnProperty(field.id));
    }

    submit() {
        if (!this.allowSubmit) {
            return;
        }
        ApiService.submitSprintSurvey(this.props.match.params.sprintId, this.state.surveyData)
            .then(() => this.setState({ done: true }));
    }

    render() {
        if (this.state.done) {
            return <Redirect to={`/sprint-survey/${this.props.match.params.sprintId}/view`} push={true} />
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
                                    <td
                                        className={"emoji-large selectable" + (this.state.surveyData[field.id] === 1 ? " selected" : "")}
                                        onClick={() => this.onFieldSet(field.id, 1)}>
                                        <span role="img" aria-label="smiling face">😊</span>
                                    </td>
                                    <td
                                        className={"emoji-large selectable" + (this.state.surveyData[field.id] === 0 ? " selected" : "")}
                                        onClick={() => this.onFieldSet(field.id, 0)}>
                                        <span role="img" aria-label="neutral face">😐</span>
                                    </td>
                                    <td
                                        className={"emoji-large selectable" + (this.state.surveyData[field.id] === -1 ? " selected" : "")}
                                        onClick={() => this.onFieldSet(field.id, -1)}>
                                        <span role="img" aria-label="disappointed face">😞</span>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                <FormControl componentClass="textarea"
                    placeholder="Write a comment on this sprint?"
                    value={this.state.surveyData.comment}
                    onChange={(e) => this.setComment(e.target.value)}
                />
                <Button onClick={() => this.submit()} disabled={!this.allowSubmit}>Submit</Button>
            </div>
        );
    }
}

export default ParticipateSprintSurvey;
