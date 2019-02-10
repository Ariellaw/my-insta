const CLOUD_NAME = "dtvk88yvj"

export default {
    uploadSample,
    uploadImg
}

function uploadSample(elForm) {
    var UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`
    var formData = new FormData();
    formData.append('file', elForm[0].files[0])
    formData.append('upload_preset', 'zbj5g7nm');

    return fetch(UPLOAD_URL, {
        method: 'POST',
        body: formData
    })
    .then(function (response) {
        return response.json()
    })
    .catch(function (error) {
        console.error(error)
    })
}

function uploadImg(elForm) {
    var UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    var formData = new FormData();
    formData.append('file', elForm[0].files[0])
    formData.append('upload_preset', 'zbj5g7nm');

    return fetch(UPLOAD_URL, {
        method: 'POST',
        body: formData
    })
    .then(function (response) {
        return response.json()
    })
    .catch(function (error) {
        console.error('this is an error ariella', error)
    })
}
