import axios from 'axios';
const BASE_URL = (process.env.NODE_ENV !== 'development')
 ? '/user'
 : "//10.100.102.4:3003/user";

 
function createNewUser(user){
    return axios.post(`${BASE_URL}/newUser`, {user})
        .then(res =>{
            return res.data;
        })
}
function getUserNamesById(ids){
    return axios.post(`${BASE_URL}/userNameById`, {ids})
        .then(res => {
            return res.data})
}
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
    }).catch(error=>{
    })
}

function getLoggedInUser(){
return axios.get(`${BASE_URL}/loggedInUser`)
    .then(res=>{
        return res.data;
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
//TODO move to authentication services :-)
function authenticateUser(credentials){

    return axios.post('/login', {credentials})

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
    addFollowers,
    removeFollowers,
    addToUserFavorites,
    removeFromUserFavorites,
    getImagesByImageId,
    updateUserDetails,
    authenticateUser,
    findRelevantUsers,
    getUserByUsername,
    getUserNamesById,
    getLoggedInUser,
    createNewUser
}