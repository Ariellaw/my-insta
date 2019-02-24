import axios from 'axios';
import utilService from './utilServices'
const BASE_URL = 'http://localhost:3003/image'
import userServices from "./userServices"


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
    var id = utilService.makeId();
    var timeStamp = Date.now;
    var userComment = { commentOwnerId: commentWriterId, comment: userComment, timeStamp};
    userComment.id = id;
    return axios.put(`${BASE_URL}/${imageId}/comment`, { imageId, userComment })
        .then(res => {
            return res.data
        })
}
function addUserLike(imageId, userId) {
    return axios.put(`${BASE_URL}/${imageId}/likes`, { imageId, userId })
        .then(res => {
            return res.data
        })
}

function removeUserLike(imageId, userId) {

    return axios.delete(`${BASE_URL}/${imageId}/${userId}/likes`)
        .then(res => {
            return res.data
        })
}
function createImgObj(imgDetails, image) {
   var commentId = utilService.makeId();
    var comments = [];
    var timeStamp = Date.now();
    comments.push({ commentOwnerId: "5c5fecdbd16a8d56eaca3c98", comment: imgDetails.text, id: commentId, timeStamp })
    var imgObj =
    {
        "image": image,
        "ownerId": "5c5fecdbd16a8d56eaca3c98",
        "comments": comments,
        "likes": [],
        "timePosted": timeStamp,
        "location": imgDetails.location,
    }
    return axios.post(`${BASE_URL}/newImage`, {imgObj})
        .then(res =>{
            return res.data;
        })
}
function getInitalImages(){
    return axios.get(`${BASE_URL}/initalFeedImages`)
        .then(res => {
            return res.data
        })
} 
function getAdditionalImages(startingPoint){
    console.log('services feed additional images startingPoint', startingPoint)
    return axios.get(`${BASE_URL}/${startingPoint}/additionalFeedImages`)
        .then(res => {
            return res.data
        })
} 
export default {
    getUserImages,
    getImageById,
    addUserComment,
    addUserLike,
    removeUserLike,
    createImgObj,
    getInitalImages,
    getAdditionalImages

}

