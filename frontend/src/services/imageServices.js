import axios from "axios";
const BASE_URL = (process.env.NODE_ENV !== 'development')
 ? '/image'
 : "//192.168.1.105:3003/image";




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
    .put(`${BASE_URL}/${imageId}/comment`, { comment, imageId, writerId })
    .then(res => {
      return res.data;
    });
}
function editComment(commentId, imageId, newComment){
  return axios
    .put(`${BASE_URL}/${imageId}/${commentId}/edit`, {newComment})
      .then(res =>{
        return res.data;
      })
}
function deleteComment(commentId, imageId) {

  return axios
    .put(`${BASE_URL}/${imageId}/${commentId}/deleteComment`)
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
function getAdditionalImages(startingPoint, currFeedImages) {
  return axios
    .post(`${BASE_URL}/${startingPoint}/additionalFeedImages`, {
      currFeedImages
    })
    .then(res => {
      return res.data;
    });
}
function additionalUserImages(startingPoint, userId) {
  return axios
    .get(`${BASE_URL}/${startingPoint}/${userId}/additionalUserImages`, {
      currFeedImages
    })
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
function addImage(imgDetails, image) {
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
  getImagesByHashtag,
  additionalUserImages,
  deleteComment,
  editComment
};
