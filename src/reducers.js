import { combineReducers } from 'redux';
import uuid from "uuid/v4";
import { CREATE_SURVEY, SET_SURVEY_FIELD, SUBMIT_SURVEY, SET_USER_TOKEN, CLEAR_USER_TOKEN } from './actions';

function surveys(state = [], action) {
    switch (action.type) {
        case CREATE_SURVEY:
            return state.concat([{
                id: state.length,
                name: action.name,
                uuids: {
                    view: uuid(),
                    participate: uuid(),
                },
                fieldValues: {}
            }]);
        case SET_SURVEY_FIELD:
            return state.map(survey => {
                if (survey.editUuid !== action.surveyUuid) {
                    return survey;
                }
                const clone = Object.assign({}, survey, { fieldValues: Object.assign(survey.fieldValues) });
                clone.fieldValues[action.fieldId] = action.value;
                return clone;
            });
        case SUBMIT_SURVEY:
            return state.map(survey => {
                if (survey.editUuid !== action.surveyUuid) {
                    return survey;
                }
                const clone = Object.assign({}, survey, { fieldValues: Object.assign(survey.fieldValues) });
                clone.previousFieldValues = Object.assign(clone.fieldValues);
                return clone;
            });
        default:
            return state;
    }
}

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
};

function userDefaultState() {
    const token = localStorage.getItem("usertoken");
    return token ? {
        token,
        data: parseJwt(token)
    } : {};
}

function user(state = userDefaultState(), action) {
    switch (action.type) {
        case SET_USER_TOKEN:
            localStorage.setItem("usertoken", action.token);
            return {
                token: action.token,
                data: parseJwt(action.token)
            }
        case CLEAR_USER_TOKEN:
            return {};
        default:
            return state;
    }
}

export default combineReducers({
    surveys,
    user,
});
