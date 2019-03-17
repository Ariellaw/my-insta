import axios from "axios";
import utilService from "./utilServices";
const BASE_URL = " http://192.168.1.105:3003/image";
import userServices from "./userServices";

function getImageById(imageId) {
  return axios.get(`${BASE_URL}/image/${imageId}`).then(res => {
    return res.data;
  });
}
function getUserImages(userId) {
  return axios.get(`${BASE_URL}/images/${userId}`).then(res => {
    return res.data;
  });
}
function addUserComment(comment, imageId, writerId) {

  return axios
    .put(`${BASE_URL}/${imageId}/comment`, { comment, imageId, writerId})
    .then(res => {
      return res.data;
    });
}
function addUserLike(imageId, userId) {
  return axios
    .put(`${BASE_URL}/${imageId}/likes`, { imageId, userId })
    .then(res => {
      return res.data;
    });
}

function removeUserLike(imageId, userId) {
  return axios.delete(`${BASE_URL}/${imageId}/${userId}/likes`).then(res => {
    return res.data;
  });
}


function getInitalImages() {
  return axios.get(`${BASE_URL}/initalFeedImages`).then(res => {
    return res.data;
  });
}
function getAdditionalImages(startingPoint) {
  return axios
    .get(`${BASE_URL}/${startingPoint}/additionalFeedImages`)
    .then(res => {
      return res.data;
    });
}

function getImagesByLocation(location) {
  return axios.get(`${BASE_URL}/${location}/explore`).then(res => {
    return res.data;
  });
}
function getImagesByHashtag(hashtag) {
  return axios.get(`${BASE_URL}/${hashtag}/search`).then(res => {
    return res.data;
  });
}
function addImage(imgDetails, image){
    return axios.post(`${BASE_URL}/newImage`, { imgDetails, image }).then(res => {
        return res.data;
      });
}
export default {
  getUserImages,
  getImageById,
  addUserComment,
  addUserLike,
  removeUserLike,
  addImage,
  getInitalImages,
  getAdditionalImages,
  getImagesByLocation,
  getImagesByHashtag
};


// function _findHashtags(comment) {
//   if (!comment) {
//     return [];
//   }
//   var updatedHashtagList = [];
//   comment = comment.split(" ");
//  
 
//   hashtags.forEach(hashtag => {
//     hashtag = hashtag.toLowerCase();
//     if (updatedHashtagList.findIndex(word => word === hashtag) === -1) {
//       updatedHashtagList.push(hashtag);
//     }
//   });
//   console.log(updatedHashtagList)
//   return updatedHashtagList;
// }
// var regex = "/^s+|s+$/g";
// hashtag.replace(regex, "");
