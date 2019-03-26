import imageServices from "../services/imageServices.js";
import cloudinaryService from "../services/cloudinaryService.js";
import userServices from "../services/userServices.js";
import { stat } from "fs";
import { resolve } from "url";

export default {
  state: {
    isLoading: false,
    visitedUserImages: null,
    viewedImage: null,
    viewedImageOwner: null,
    userFavoriteImages: null,
    imagesForFeed: [],
    isConnected: false,
    isTyping: null,
    followeesThatLiked: []
  },
  getters: {
    followeesThatLiked: state => {
      return state.followeesThatLiked;
    },
    isTyping: state => {
      return state.isTyping;
    },
    visitedUserImages: state => {
      return state.visitedUserImages;
    },

    isLoading: state => {
      return state.isLoading;
    },
    viewedImage: state => {
      return state.viewedImage;
    },
    viewedImageOwner: state => {
      return state.viewedImageOwner;
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
    setFolloweesThatLiked(state, { users }) {
      state.followeesThatLiked = users;
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

      if (img) {
        if (img._id === data.image._id) {
          var comments = data.image.comments;
          var idx = comments.findIndex(
            comment => comment.id === data.comment.id
          );
          if (idx === -1) {
            comments.splice(comments.length, 0, data.comment);
          }
          state.viewedImage.comments = comments;
        }
      }
    },
    SOCKET_commentEdited(state, data) {
      var img = state.viewedImage;

      if (img._id === data.image._id) {
        var comments = data.image.comments;
        var idx = comments.findIndex(comment => comment.id === data.commentId);
        if (idx !== -1) {
          var commentToUpdate = comments[idx];
          commentToUpdate.comment = data.newComment;
          commentToUpdate.timeStamp = Date.now();
          comments.splice(idx, 1, commentToUpdate);
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
      var likes = data.image.likes;
      var user = data.user;
      var followees = state.followeesThatLiked;

      if (img) {
        if (img._id === data.image._id) {
          if (
            followees.findIndex(followee => followee._id === data.user._id) ===
            -1
          ) {
            state.followeesThatLiked.splice(0, 0, data.user);
          }
          if (likes.findIndex(id => id === user._id) === -1) {
            likes.splice(0, 0, user._id);
          }
          state.viewedImage.likes = likes;
        }
      }
    },
    SOCKET_likeRemoved(state, data) {
      var img = state.viewedImage;
      var likes = data.image.likes;
      var user = data.user;
      var followees = state.followeesThatLiked;

      if (img) {
        if (img._id === data.image._id) {
          var idx = followees.findIndex(followee => followee._id === user._id);
          if (idx > -1) {
            state.followeesThatLiked.splice(idx, 1);
          }
          var idx = likes.findIndex(id => id === user._id);
          if (idx !== -1) {
            likes.splice(idx, 1);
          }
          state.viewedImage.likes = likes;
        }
      }
    }
  },
  actions: {
    getViewedImageFollowers(context, { image, user }) {
      var followees = user.followees;

      var ids = [];
      followees.forEach(followeeId => {
        if (image.likes.findIndex(likeId => likeId === followeeId) !== -1) {
          ids.push(followeeId);
        }
      });
      if (
        image.likes.findIndex(id => id === user._id) > -1 &&
        ids.findIndex(id => id === user._id) === -1
      ) {
        ids.splice(0, 0, user._id);
      }

      if (ids.length === 0) {
        context.commit({ type: "setFolloweesThatLiked", users: [] });
        return [];
      } else {
        return userServices.getUserNamesById(ids).then(res => {
          context.commit({ type: "setFolloweesThatLiked", users: res });
          return res;
        });
      }
    },
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
      imageServices.getNamesOfLikes;
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
        if (context.state.viewedImage) {
          context.commit({ type: "updateViewedImage", image: res.value });
        }
        return res.value.comments;
      });
    },
    addUserComment(context, { comment, imageId, writerId }) {
      return imageServices
        .addUserComment(comment, imageId, writerId)
        .then(res => {
          if (context.state.viewedImage) {
            context.commit({ type: "updateViewedImage", image: res.value });
          }
          return res.value.comments;
        });
    },
    editComment(context, { commentId, imageId, newComment }) {
      return imageServices
        .editComment(commentId, imageId, newComment)
        .then(res => {
          if (context.state.viewedImage) {
            context.commit({ type: "updateViewedImage", image: res.value });
          }
          return res.value.comments;
        });
    },
    getUserFavoriteImages(context, { userId }) {
      context.commit({ type: "setIsLoading", isLoading: true });
      return userServices.getImagesByImageId(userId).then(images => {
        context.commit({ type: "setUserFavoriteImages", images });
        context.commit({ type: "setIsLoading", isLoading: false });

        return images;
      });
    },
    addUserLike(context, { imageId, userId }) {
      return imageServices.addUserLike(imageId, userId).then(res => {
        if (context.state.viewedImage) {
          context.commit({ type: "updateViewedImage", image: res.value });
        }
        return res.value.likes;
      });
    },
    removeUserLike(context, { imageId, userId }) {
      return imageServices.removeUserLike(imageId, userId).then(res => {
        if (context.state.viewedImage) {
          context.commit({ type: "updateViewedImage", image: res.value });
        }
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
      context.commit({ type: "setIsLoading", isLoading: true });
      return imageServices.getImagesByLocation(location).then(images => {
        context.commit({ type: "setIsLoading", isLoading: false });
        return images;
      });
    },
    getImagesByHashtag(context, { hashtag }) {
      context.commit({ type: "setIsLoading", isLoading: true });
      return imageServices.getImagesByHashtag(hashtag).then(images => {
        context.commit({ type: "setIsLoading", isLoading: false });
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
