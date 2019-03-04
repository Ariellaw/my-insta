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
function addUserComment(comment, imageId, writerId) {
    var newHashtags = _findHashtags(comment);

    var comment = _createCommentObj(writerId, comment);

    return axios.put(`${BASE_URL}/${imageId}/comment`, { imageId, comment, newHashtags })
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
    var comment = _createCommentObj("5c5fecdbd16a8d56eaca3c98", imgDetails.text);
    //TODO - change word text to comment
    var comments = [];
    var timeStamp = Date.now();

    comments.push(comment)
    var imgObj =
    {
        "image": image,
        "ownerId": "5c5fecdbd16a8d56eaca3c98",
        "comments": comments,
        "likes": [],
        "timePosted": timeStamp,
        "location": imgDetails.location,
    }
    return axios.post(`${BASE_URL}/newImage`, { imgObj })
        .then(res => {
            return res.data;
        })
}


function getInitalImages() {
    return axios.get(`${BASE_URL}/initalFeedImages`)
        .then(res => {
            return res.data
        })
}
function getAdditionalImages(startingPoint) {
    return axios.get(`${BASE_URL}/${startingPoint}/additionalFeedImages`)
        .then(res => {
            return res.data
        })
}

function getImagesByLocation(location) {
    return axios.get(`${BASE_URL}/${location}/explore`)
        .then(res => {
            return res.data
        })
}
function getImagesByHashtag(hashtag) {
    console.log('services', hashtag)
    return axios.get(`${BASE_URL}/${hashtag}/search`)
        .then(res => {
            console.log("hastag", res.data)
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
    getAdditionalImages,
    getImagesByLocation,
    getImagesByHashtag

}

function _createCommentObj(writerId, comment) {
    var timeStamp = Date.now();
    var comment = { writerId, comment, timeStamp };
    return comment;

}

function _findHashtags(comment) {
    comment = comment.split(" ");
    var hashtags = comment.filter(word => 
       word[0] === '#'
    )
    hashtags.forEach((word, idx) => hashtags[idx] = word.toLowerCase())
    return hashtags;
}