import axios from 'axios';
const BASE_URL = 'http://localhost:3003/image'



function getUserImages(userId) {
    return axios.get(`${BASE_URL}/images/${userId}`)
        .then(res =>{
            return res.data
        })
}


export default {
    getUserImages,

}

