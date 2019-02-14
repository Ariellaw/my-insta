import axios from 'axios';
import utilService from './utilServices'
const BASE_URL = 'http://localhost:3003/image'


function getImageById(imageId) {
    return axios.get(`${BASE_URL}/image/${imageId}`)
        .then(res => {
            return res.data
        })
}
function getUserImages(userId) {
    return axios.get(`${BASE_URL}/images/${userId}`)
        .then(res => {
            return res.data
        })
}
function addUserComment(userComment, imageId, commentWriterId) {
    var id = utilService.makeId()
    var userComment = { commentOwnerId: commentWriterId, comment: userComment };
    userComment.id=id;
    return axios.put(`${BASE_URL}/${imageId}/comment`, { imageId, userComment })
        .then(res => {
            return res.data
        })
}
function addUserLike(imageId, userId){
    return axios.put(`${BASE_URL}/${imageId}/likes`, {imageId, userId})
    .then(res => {
        return res.data
    })
 }

function removeUserLike(imageId, userId){
    console.log('services remove', imageId, userId)

    return  axios.delete(`${BASE_URL}/${imageId}/${userId}/likes`)
        .then(res => {
            return res.data
        })
}
export default {
    getUserImages,
    getImageById,
    addUserComment,
    addUserLike,
    removeUserLike

}

