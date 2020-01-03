import GOBALS from '../GOBALS'

export default class DocumentModel {
    constructor() {
    }

    async getDateOpenUploadDocument() {
        return fetch(GOBALS.URL + 'document/getDateOpenUploadDocument', {
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
                console.log("data", responseJson);
                return responseJson;
            }).catch((error) => {
                console.error(error);
            });
    }

    async getTypeOfDocumentByCode() {
        return fetch(GOBALS.URL + 'document/getTypeOfDocumentByCode', {
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
                console.log("data", responseJson);
                return responseJson;
            }).catch((error) => {
                console.error(error);
            });
    }
    async DeleteDocumentByCode(uri) {
        return fetch(GOBALS.URL + 'document/DeleteDocumentByCode', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uri:uri
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log("data", responseJson);
                return responseJson;
            }).catch((error) => {
                console.error(error);
            });
    }
    async getDocBycode(data) {
        return fetch(GOBALS.URL + 'document/getDocBycode', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            }
            else {
                Alert.alert('ขออภัย', 'ไม่สามารถเรียกข้อมูลได้', [{ text: 'OK' },], { cancelable: false })
            }
        }).then((responseJson) => {
            ////console.log("data", responseJson);
            return responseJson;
        }).catch((error) => {
            console.error(error);
        });
    }

    async checkDocumentStatusByCode(data) {
        return fetch(GOBALS.URL + 'document/checkDocumentStatusByCode', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            }
            else {
                Alert.alert('ขออภัย', 'ไม่สามารถเรียกข้อมูลได้', [{ text: 'OK' },], { cancelable: false })
            }
        }).then((responseJson) => {
            ////console.log("data", responseJson);
            return responseJson;
        }).catch((error) => {
            console.error(error);
        });
    }

    async insertDocument(data) {
        return fetch(GOBALS.URL + 'document/insertDocument', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            }
            else {
                Alert.alert('ขออภัย', 'ไม่สามารถเรียกข้อมูลได้', [{ text: 'OK' },], { cancelable: false })
            }
        }).then((responseJson) => {
            ////console.log("data", responseJson);
            return responseJson;
        }).catch((error) => {
            console.error(error);
        });
    }

    async DeleteUpload(data) {
        return fetch(GOBALS.URL + 'document/DeleteUpload', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            }
            else {
                Alert.alert('ขออภัย', 'ไม่สามารถเรียกข้อมูลได้', [{ text: 'OK' },], { cancelable: false })
            }
        }).then((responseJson) => {
            ////console.log("data", responseJson);
            return responseJson;
        }).catch((error) => {
            console.error(error);
        });
    }
}