import axios from 'axios';
const BASE_URL = 'http://localhost:3003/image'


function getImageById(imageId){
    return axios.get(`${BASE_URL}/image/${imageId}`)
    .then(res =>{
        return res.data
    })
}
function getUserImages(userId) {
    return axios.get(`${BASE_URL}/images/${userId}`)
        .then(res =>{
            return res.data
        })
}


export default {
    getUserImages,
    getImageById

}

