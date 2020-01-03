import GOBALS from '../GOBALS'

export default class BookingModel {
    constructor() {
    }

    async getBookingDateBy() {
        return fetch(GOBALS.URL + 'booking/getBookingDateBy', {
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
    async getMinMaxBookingDateBy() {
        return fetch(GOBALS.URL + 'booking/getMinMaxBookingDateBy', {
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
    async CheckOrder(data) {
        return fetch(GOBALS.URL + 'booking/CheckOrder', {
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

    async CheckAndInsertQueue(data) {
        return fetch(GOBALS.URL + 'booking/CheckAndInsertQueue', {
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
    async DeleteQueue(data) {
        return fetch(GOBALS.URL + 'booking/DeleteQueue', {
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
    async ShowBookingTime(date) {

        return fetch(GOBALS.URL + 'booking/ShowBookingTime', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                date: date
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log("data", responseJson);
                return responseJson;
            }).catch((error) => {
                console.error(error);
            });
    }
}