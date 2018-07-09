export const CREATE_SURVEY = 'CREATE_SURVEY';

export function createSurvey(name) {
  return { type: CREATE_SURVEY, name };
};

export const SET_SURVEY_FIELD = 'SET_SURVEY_FIELD';

export function setSurveyField(surveyUuid, fieldId, value) {
  return { type: SET_SURVEY_FIELD, surveyUuid, fieldId, value };
};

export const SUBMIT_SURVEY = 'SUBMIT_SURVEY';

export function submitSurvey(surveyUuid) {
  return { type: SUBMIT_SURVEY, surveyUuid };
};

export const SET_USER_TOKEN = 'SET_USER_TOKEN';

export function setUserToken(token) {
  return { type: SET_USER_TOKEN, token };
}

export const CLEAR_USER_TOKEN = 'CLEAR_USER_TOKEN';

export function clearUserToken() {
  return { type: CLEAR_USER_TOKEN };
}