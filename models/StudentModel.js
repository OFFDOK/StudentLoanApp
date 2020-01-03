import GOBALS from '../GOBALS'

export default class StudentModel {

    constructor() {
    }

    async checkLogin(data) {
        return fetch(GOBALS.URL + 'user/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => response.json())
            .then((responseJson) => {

                return responseJson[0];
            }).catch((error) => {
                console.error(error);
            });
    }

    async registerUser(data) {

        return fetch(GOBALS.URL + 'user/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log("data", responseJson);
                return responseJson;
            }).catch((error) => {
                console.error(error);
            });
    }



    async getIntituteBy() {
        return fetch(GOBALS.URL + 'user/getIntituteBy', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: ''
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                //console.log("data", responseJson);
                return responseJson;
            }).catch((error) => {
                console.error(error);
            });
    }


    async getSchoolOfByCode(code) {

        return fetch(GOBALS.URL + 'user/getSchoolOfByCode', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: code
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log("data", responseJson);
                return responseJson;
            }).catch((error) => {
                console.error(error);
            });
    }
    async getStudentByCode(data) {
        return fetch(GOBALS.URL + 'user/getStudentByCode', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => response.json())
            .then((responseJson) => {
                return responseJson[0];
            }).catch((error) => {
                console.error(error);
            });
    }
}