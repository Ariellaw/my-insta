import axios from 'axios';
const BASE_URL = 'http://localhost:3003/user'

function getUserById(userId) {
    return axios.get(`${BASE_URL}/${userId}`)
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
export default {
    getUserById,
    updateFollowers,
    addFollowers,
    removeFollowers
}