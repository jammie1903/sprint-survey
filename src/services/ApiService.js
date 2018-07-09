import store from '../store';

const jiraApiUrl = "https://jira-wrapper-api.herokuapp.com";

class ApiService {
    login(domain, username, password) {
        return fetch(`${jiraApiUrl}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({
                domain, username, password
            }),
        }).then(response => {
            if (response.status === 200) {
                return response.json().then(json => json.data.token);
            }
            throw new Error(response.status + ": " + response.json().message);
        });
    }

    getToken() {
        const token = store.getState().user.token;
        if (!token) {
            throw new Error("No Authentication token found");
        }
        return token;
    }

    getBoards() {
        return fetch(`${jiraApiUrl}/jira/boards`, {
            headers: {
                "Authorization": "Bearer " + this.getToken(),
            },

        }).then(response => {
            if (response.status === 200) {
                return response.json().then(json => json.data);
            }
            throw new Error(response.status + ": " + response.json().message);
        });
    }

    getBoard(boardId) {
        return fetch(`${jiraApiUrl}/jira/board/${boardId}`, {
            headers: {
                "Authorization": "Bearer " + this.getToken(),
            },

        }).then(response => {
            if (response.status === 200) {
                return response.json().then(json => json.data);
            }
            throw new Error(response.status + ": " + response.json().message);
        });
    }

    getSprint(sprintId) {
        return fetch(`${jiraApiUrl}/jira/sprint/${sprintId}`, {
            headers: {
                "Authorization": "Bearer " + this.getToken(),
            },

        }).then(response => {
            if (response.status === 200) {
                return response.json().then(json => json.data);
            }
            throw new Error(response.status + ": " + response.json().message);
        });
    }

    getSprintSurveyresults(sprintId) {
        return fetch(`${jiraApiUrl}/data/all/sprint-survey?id=${sprintId}`, {
            headers: {
                "Authorization": "Bearer " + this.getToken(),
            },

        }).then(response => {
            if (response.status === 200) {
                return response.json().then(json => json.data);
            }
            throw new Error(response.status + ": " + response.json().message);
        });
    }

    getOwnSprintSurveyData(sprintId) {
        return fetch(`${jiraApiUrl}/data/sprint-survey?id=${sprintId}`, {
            headers: {
                "Authorization": "Bearer " + this.getToken(),
            },

        }).then(response => {
            if (response.status === 200) {
                return response.json().then(json => json.data);
            }
            throw new Error(response.status + ": " + response.json().message);
        });
    }

    submitSprintSurvey(sprintId, surveyData) {
        return fetch(`${jiraApiUrl}/data/sprint-survey?id=${sprintId}&availability=anomynous`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": "Bearer " + this.getToken(),
            },
            body: JSON.stringify(surveyData),
        }).then(response => {
            if (response.status === 200) {
                return response.json().then(json => json.data);
            }
            throw new Error(response.status + ": " + response.json().message);
        });
    }
}

export default new ApiService();