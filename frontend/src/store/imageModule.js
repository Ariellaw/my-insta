import imageServices from "../services/imageServices.js";
import cloudinaryService from "../services/cloudinaryService.js";
import userServices from "../services/userServices.js";

export default {
  state: {
    isLoadingUsersImages: false,
    visitedUserImages: null,
    viewedImage: null,
    viewedImageOwner: null,
    userFavoriteImages: null,
    imagesForFeed: [],
    isConnected: false,
    isTyping: null
  },
  getters: {
    isTyping: state => {
      return state.isTyping;
    },
    visitedUserImages: state => {
      return state.visitedUserImages;
    },

    isLoadingUsersImages: state => {
      return state.isLoadingUsersImages;
    },
    viewedImage: state => {
      return state.viewedImage;
    },
    viewedImageOwner: state => {
      return state.viewedImageOwner;
    },
    setIsLoadingFavorites: state => {
      return state.setIsLoadingFavorites;
    },
    userFavoriteImages: state => {
      return state.userFavoriteImages;
    },
    imagesForFeed: state => {
      return state.imagesForFeed;
    },
    viewedImageComments: state => {
      return state.viewedImageComments;
    },
    viewedImage: state => {
      return state.viewedImage;
    }
  },
  mutations: {
    setIsLoadingUserImages(state, { isLoading }) {
      state.isLoadingUsersImages = isLoading;
    },
    setIsLoadingFavorites(state, { isLoading }) {
      state.setIsLoadingFavorites = isLoading;
    },
    setVisitedUserImages(state, { images }) {
      state.visitedUserImages = images;
    },
    setAdditionalUserImages(state, { res }) {
      var length = state.visitedUserImages.length;
      state.visitedUserImages.splice(length, 0, ...res);
    },
    setViewedImage(state, { image }) {
      state.viewedImage = image;
    },
    updateViewedImage(state, { image }) {
      if (state.viewedImage._id === image._id) {
        state.viewedImage = image;
      }
    },
    setVisitedImageOwner(state, { user }) {
      state.viewedImageOwner = user;
    },
    setUserFavoriteImages(state, { images }) {
      state.userFavoriteImages = images;
    },
    setInitalImages(state, { res }) {
      state.imagesForFeed = res;
    },
    setAddionalImages(state, { res }) {
      state.imagesForFeed = state.imagesForFeed.concat(res);
    },
    SOCKET_CONNECT(state) {
      state.isConnected = true;
    },

    SOCKET_DISCONNECT(state) {
      state.isConnected = false;
    },

    SOCKET_commentAdded(state, data) {
      state.isTyping = null;
      var img = state.viewedImage;

      if (img._id === data.image._id) {
        var comments = data.image.comments;
        var idx = comments.findIndex(comment => comment.id === data.comment.id);
        if(idx===-1){
          comments.splice(comments.length, 0, data.comment);

        }
        state.viewedImage.comments = comments;
      }
    },
    SOCKET_commentDeleted(state, data) {
      var img = state.viewedImage;
      var comments = data.image.comments;
      if (img._id === data.image._id) {
        var idx = comments.findIndex(comment => comment.id === data.commentId);
        if (idx > -1) {
          comments.splice(idx, 1);
          state.viewedImage.comments = comments;
        }
      }
    },

    SOCKET_typing(state, data) {
      var img = state.viewedImage;
      if (img._id === data.imageId) {
        state.isTyping = data.userName;
      }
    },
    SOCKET_likeAdded(state, data) {
      var img = state.viewedImage;
      var likes = img.likes;
      var userId = data.userId;
      if (img._id === data.imageId) {
        if (likes.findIndex(id => id === userId) === -1) {
          likes.splice(likes.length, 0, userId);
        }
        state.viewedImage.likes = likes;
      }
    },
    SOCKET_likeRemoved(state, data) {
      var img = state.viewedImage;
      var likes = img.likes;
      var userId = data.userId;

      if (img._id === data.imageId) {
        var idx = likes.findIndex(id => id === userId);
        if (idx !== -1) {
          likes.splice(idx, 1);
        }
        state.viewedImage.likes = likes;
      }
    }
  },
  actions: {
    getVisitedUserImages(context, { userId }) {
      context.commit({ type: "setIsLoading", isLoading: true });

      return imageServices.getUserImages(userId).then(images => {
        context.commit({ type: "setIsLoading", isLoading: false });
        context.commit({ type: "setVisitedUserImages", images });
        return images;
      });
    },
    getViewedImageOwner(context, { userId }) {
      return userServices.getUserById(userId).then(user => {
        context.commit({ type: "setVisitedImageOwner", user });
      });
    },
    setViewedImage(context, { image }) {
      context.commit({ type: "setViewedImage", image });
      return image;
    },

    getCloudinaryPicUrl(context, { elForm }) {
      return cloudinaryService.uploadImg(elForm).then(res => {
        return res.url;
      });
    },
    deleteComment(context, { commentId, imageId }) {
      return imageServices.deleteComment(commentId, imageId).then(res => {
        context.commit({ type: "updateViewedImage", image: res.value });
        // console.log(res.value.comments)
        return res.value.comments;
      });
    },
    addUserComment(context, { comment, imageId, writerId }) {
      return imageServices
        .addUserComment(comment, imageId, writerId)
        .then(res => {
          context.commit({ type: "updateViewedImage", image: res.value });
          return res.value.comments;
        });
    },
    getUserFavoriteImages(context, { userId }) {
      context.commit({ type: "setIsLoadingUserImages", isLoading: true });
      return userServices.getImagesByImageId(userId).then(images => {
        context.commit({ type: "setUserFavoriteImages", images });
        context.commit({ type: "setIsLoadingUserImages", isLoading: false });

        return images;
      });
    },
    addUserLike(context, { imageId, userId }) {
      return imageServices.addUserLike(imageId, userId).then(res => {
        context.commit({ type: "updateViewedImage", image: res.value });
        return res.value.likes;
      });
    },
    removeUserLike(context, { imageId, userId }) {
      return imageServices.removeUserLike(imageId, userId).then(res => {
        context.commit({ type: "updateViewedImage", image: res.value });
        return res.value.likes;
      });
    },
    addImage(context, { imgDetails, image }) {
      return imageServices.addImage(imgDetails, image);
      //TODO: findout if displayedprofile is loggedinuserprofiel and update inthat case
    },
    getInitalImages(context) {
      return imageServices.getInitalImages().then(res => {
        context.commit({ type: "setInitalImages", res });
      });
    },
    getAdditionalImages(context) {
      var feedImages = context.state.imagesForFeed;
      var startingPoint = 0;
      if (feedImages.length !== 0) {
        startingPoint = feedImages[feedImages.length - 1]._id;
      }
      return imageServices
        .getAdditionalImages(startingPoint, feedImages)
        .then(res => {
          context.commit({ type: "setAddionalImages", res });
        });
    },
    getAdditionalUserImages(context, { userId, startingPoint }) {
      return imageServices
        .getAdditionalImages(startingPoint, userId)
        .then(res => {
          context.commit({ type: "setAdditionalUserImages", res });
          return res;
        });
    },
    getImagesByLocation(context, { location }) {
      return imageServices.getImagesByLocation(location).then(images => {
        return images;
      });
    },
    getImagesByHashtag(context, { hashtag }) {
      return imageServices.getImagesByHashtag(hashtag).then(images => {
        return images;
      });
    },
    getImageById(context, { imageId }) {
      return imageServices.getImageById(imageId).then(image => {
        return image;
      });
    }
  }
};
