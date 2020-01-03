import GOBALS from '../GOBALS'

export default class EmailModel {

    constructor() {
    }
    async SendEmail(data) {
        return fetch(GOBALS.URL + 'send-email', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => response.json())
            .then((responseJson) => {
                //console.log("data", responseJson);
                return responseJson;
            }).catch((error) => {
                console.error(error);
            });
    }
    async insertVerifyData(data) {
        return fetch(GOBALS.URL + 'send/insertVerifyData', {
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
    async checkVerifyCode(data) {
        return fetch(GOBALS.URL + 'send/checkVerifyCode', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log("data", responseJson);
                return responseJson[0];
            }).catch((error) => {
                console.error(error);
            });
    }
    async renewPassword(data) {
        return fetch(GOBALS.URL + 'send/renewPassword', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log("data", responseJson);
                return responseJson[0];
            }).catch((error) => {
                console.error(error);
            });
    }
}