import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

class SurveyList extends Component {
    render() {
        return (
            <div>
                {this.props.surveys.map((survey) => (
                    <div className="survey-list-entry">
                        <span className="survey-name">{survey.name}</span>
                        <Link className="survey-link" to={`sprint-survey/${survey.uuids.view}`}>View</Link> 
                        <Link className="survey-link" to={`sprint-survey/${survey.uuids.participate}`}>Participate</Link>
                    </div>
                ))}
            </div>
        );
    }
}

SurveyList.propTypes = {
    surveys: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            uuids: PropTypes.object.isRequired,
            fieldValues: PropTypes.object.isRequired,
        }).isRequired
    ).isRequired
}

export default SurveyList;
