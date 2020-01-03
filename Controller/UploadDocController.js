import GOBALS from '../GOBALS';

export default class CommentTagModel {
    async uploadDocByMember(data) {

        // console.warn("uploadPhotoByMember", data);
        
        return fetch(GOBALS.URL + 'upload-image', {
            method: 'post',
            headers: {
            },
            body: data
        })
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson;
            }).catch((error) => {
                return {
                    data: [],
                    error: error,
                    // upload_result: false,
                    // server_result: false
                };
                //console.error(error);
            });
    }
}