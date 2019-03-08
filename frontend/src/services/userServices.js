import axios from 'axios';
import utilService from './utilServices'
const BASE_URL = 'http://192.168.1.105:3003/user'

function getUserById(userId) {

    return axios.get(`${BASE_URL}/${userId}`)
        .then(res =>{
            return res.data
            
        })
}
function getUserByUsername(userName){
    return axios.get(`${BASE_URL}/${userName}/nickname`)
    .then(res =>{
        return res.data
        
    })
}
function updateFollowers(followeeId, followerId){
//TODO - ask Eyali about best practices - https://blog.mwaysolutions.com/2014/06/05/10-best-practices-for-better-restful-api/
   return axios.put(`${BASE_URL}/updateFollowers`, {followeeId, followerId})
   .then(res => {
       return res.data
   })
}

function addFollowers(followeeId, followerId){
    return axios.put(`${BASE_URL}/${followeeId}/followers`, {followeeId, followerId})
    .then(res => {
        return res.data
    })
}
function removeFollowers(followeeId, followerId){

    return axios.delete(`${BASE_URL}/${followeeId}/${followerId}/followers`)
    .then(res => {
        return res.data
    })
}
function addToUserFavorites(imageId, loggedInUserId){

    return  axios.put(`${BASE_URL}/${imageId}/favorites`, {imageId, loggedInUserId})
        .then(res => {
            return res.data
        })
}
function removeFromUserFavorites(imageId, loggedInUserId){
    return  axios.delete(`${BASE_URL}/${imageId}/${loggedInUserId}/favorites`)
        .then(res => {
            return res.data
        })
}
function getImagesByImageId(userId){

    return axios.get(`${BASE_URL}/${userId}/images`)
    .then(res =>{
        return res.data       
    })
}
function updateUserDetails(userDetails){
    var userId = userDetails._id;
    return axios.put(`${BASE_URL}/${userId}/userDetails`, {userDetails})
        .then(res => {
            return res.data
        })
}
function authenticateUser(user){
    return axios.post(`login`, {user})
        .then(res =>{
            return res.data
        })
}

function findRelevantUsers(keyword){
    return axios.get(`${BASE_URL}/searchResults/users/${keyword}`)
        .then(res => {
            return res.data;
        })
}
export default {
    getUserById,
    updateFollowers,
    addFollowers,
    removeFollowers,
    addToUserFavorites,
    removeFromUserFavorites,
    getImagesByImageId,
    updateUserDetails,
    authenticateUser,
    findRelevantUsers,
    getUserByUsername
}