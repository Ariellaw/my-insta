import imageServices from "../services/imageServices.js";
import cloudinaryService from "../services/cloudinaryService.js";
import userServices from "../services/userServices.js";
// import { stat } from "fs";
// import { resolve } from "url";

export default {
  state: {
    isLoading: false,
    visitedUserImages: null,
    viewedImage: null,
    viewedImageOwner: null,
    userFavoriteImages: [],
    imagesForFeed: [],
    isConnected: false,
    isTyping: null,
    followeesThatLiked: [],
    viewedImageCollection: []
  },
  getters: {
    viewedImageCollection: state => {
      return state.viewedImageCollection;
    },
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
    setViewedImageCollection(state, { images }) {
      state.viewedImageCollection = images;
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
      if (state.viewedImage) {
        state.viewedImage = image;
      }
    },
    setVisitedImageOwner(state, { user }) {
      state.viewedImageOwner = user;
    },
    setUserFavoriteImages(state, { images }) {
      state.userFavoriteImages = images;
    },
    setInitalImages(state, { images }) {
      state.imagesForFeed = images;
    },
    setAddionalImages(state, { images }) {
      state.imagesForFeed = state.imagesForFeed.concat(images);
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
      var comments = data.image.comments;
      var idx = comments.findIndex(comment => comment.id === data.comment.id);
      if (idx === -1) {
        comments.splice(comments.length, 0, data.comment);
      }
      if (img) {
        if (img._id === data.image._id) {
          state.viewedImage.comments = comments;
        }
      }
      idx = state.imagesForFeed.findIndex(
        image => image._id === data.image._id
      );
      if (idx >= 0) {
        state.imagesForFeed[idx].comments = comments;
      }
    }
  },
  SOCKET_commentEdited(state, data) {
    var img = state.viewedImage;
    var comments = data.image.comments;
    var idx = comments.findIndex(comment => comment.id === data.commentId);
    if (idx !== -1) {
      var commentToUpdate = comments[idx];
      commentToUpdate.comment = data.newComment;
      commentToUpdate.timeStamp = Date.now();
      comments.splice(idx, 1, commentToUpdate);
    }

    if (img) {
      if (img._id === data.image._id) {
        state.viewedImage.comments = comments;
      }
    }
    idx = state.imagesForFeed.findIndex(image => image._id === data.image._id);
    if (idx >= 0) {
      state.imagesForFeed[idx].comments = comments;
    }
  },
  SOCKET_commentDeleted(state, data) {
    var img = state.viewedImage;
    var comments = data.image.comments;
    var idx = comments.findIndex(comment => comment.id === data.commentId);
    if (idx > -1) {
      comments.splice(idx, 1);
    }
    if (img) {
      if (img._id === data.image._id) {
        state.viewedImage.comments = comments;
      }
    }
    idx = state.imagesForFeed.findIndex(image => image._id === data.image._id);
    if (idx >= 0) {
      state.imagesForFeed[idx].comments = comments;
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

    if (
      followees.findIndex(followee => followee._id === data.user._id) === -1
    ) {
      state.followeesThatLiked.splice(0, 0, data.user);
    }
    if (likes.findIndex(id => id === user._id) === -1) {
      likes.splice(0, 0, user._id);
    }
    if (img) {
      if (img._id === data.image._id) {
        state.viewedImage.likes = likes;
      }
    }
    idx = state.imagesForFeed.findIndex(image => image._id === data.image._id);
    if (idx >= 0) {
      state.imagesForFeed[idx].likes = likes;
    }
  },
  SOCKET_likeRemoved(state, data) {
    var img = state.viewedImage;
    var likes = data.image.likes;
    var user = data.user;
    var followees = state.followeesThatLiked;
    var idx = followees.findIndex(followee => followee._id === user._id);
    if (idx > -1) {
      state.followeesThatLiked.splice(idx, 1);
    }
    idx = likes.findIndex(id => id === user._id);
    if (idx !== -1) {
      likes.splice(idx, 1);
    }
    if (img) {
      if (img._id === data.image._id) {
        state.viewedImage.likes = likes;
      }
    }
    idx = state.imagesForFeed.findIndex(image => image._id === data.image._id);
    if (idx >= 0) {
      state.imagesForFeed[idx].likes = likes;
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
          context.commit({ type: "setFolloweesThatLiked", users: res.users });
          context.rootState.userModule.loggedInUser = res.loggedInUser;
          return res;
        });
      }
    },
    getVisitedUserImages(context, { userId }) {
      context.commit({ type: "setIsLoading", isLoading: true });
      context.commit({ type: "setViewedImageCollection", images: null });

      return imageServices.getUserImages(userId).then(res => {
        context.commit({ type: "setIsLoading", isLoading: false });
        context.commit({
          type: "setViewedImageCollection",
          images: res.images
        });
        // context.commit({ type: "setVisitedUserImages", images:res.images });
        context.rootState.userModule.loggedInUser = res.loggedInUser;
        return res.images;
      });
    },
    getViewedImageOwner(context, { userId }) {
      return userServices.getUserById(userId).then(res => {
        context.commit({ type: "setVisitedImageOwner", user: res.user });
        console.log("viewedImage Owner actios", res.user);
        context.rootState.userModule.loggedInUser = res.loggedInUser;
      });
    },
    setViewedImage(context, { image }) {
      //TODO - thsetViewedImageink if this needs to go to the database
      context.commit({ type: "setViewedImage", image });
      return image;
    },

    getCloudinaryPicUrl(context, { elForm }) {
      return cloudinaryService.uploadImg(elForm).then(res => {
        return res.url;
      });
    },
    deleteComment(context, { commentId, imageId }) {
      //TODO also update image in feed
      return imageServices.deleteComment(commentId, imageId).then(res => {
        context.commit({ type: "updateViewedImage", image: res.image.value });
        context.rootState.userModule.loggedInUser = res.loggedInUser;
        return res.image.value.comments;
      });
    },
    addUserComment(context, { comment, imageId, writerId }) {
      return imageServices
        .addUserComment(comment, imageId, writerId)
        .then(res => {
          context.commit({
            type: "updateViewedImage",
            image: res.image.value
          });
          context.rootState.userModule.loggedInUser = res.loggedInUser;
          return res.image.value.comments;
        });
    },
    editComment(context, { commentId, imageId, newComment }) {
      return imageServices
        .editComment(commentId, imageId, newComment)
        .then(res => {
          context.commit({
            type: "updateViewedImage",
            image: res.image.value
          });
          context.rootState.userModule.loggedInUser = res.loggedInUser;
          return res.image.value.comments;
        });
    },
    getUserFavoriteImages(context, { userId }) {
      context.commit({ type: "setIsLoading", isLoading: true });
      context.commit({ type: "setViewedImageCollection", images: null });

      return userServices.getImagesByImageId(userId).then(res => {
        context.commit({
          type: "setViewedImageCollection",
          images: res.images
        });
        // context.commit({ type: "setUserFavoriteImages", images:res.images });
        context.commit({ type: "setIsLoading", isLoading: false });
        context.rootState.userModule.loggedInUser = res.loggedInUser;
        return res.images;
      });
    },
    addUserLike(context, { imageId, userId }) {
      return imageServices.addUserLike(imageId, userId).then(res => {
        context.commit({ type: "updateViewedImage", image: res.image.value });
        context.rootState.userModule.loggedInUser = res.loggedInUser;
        return res.image.value.likes;
      });
    },
    removeUserLike(context, { imageId, userId }) {
      return imageServices.removeUserLike(imageId, userId).then(res => {
        context.commit({ type: "updateViewedImage", image: res.image.value });

        context.rootState.userModule.loggedInUser = res.loggedInUser;
        return res.image.value.likes;
      });
    },
    addImage(context, { imgDetails, image }) {
      return imageServices.addImage(imgDetails, image);
      //TODO: findout if displayedprofile is loggedinuserprofiel and update inthat case
    },
    getInitalImages(context) {
      return imageServices.getInitalImages().then(res => {
        context.commit({ type: "setInitalImages", images: res.images });
        context.rootState.userModule.loggedInUser = res.loggedInUser;
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
          context.commit({ type: "setAddionalImages", images: res.images });
          context.rootState.userModule.loggedInUser = res.loggedInUser;
        });
    },
    // getAdditionalUserImages(context, { userId, startingPoint }) {
    //   return imageServices
    //     .getAdditionalImages(startingPoint, userId)
    //     .then(res => {
    //       context.commit({ type: "setAdditionalUserImages", res });
    //       return res;
    //     });
    // },
    getImagesByLocation(context, { location }) {
      context.commit({ type: "setIsLoading", isLoading: true });
      context.commit({ type: "setViewedImageCollection", images: null });
      return imageServices.getImagesByLocation(location).then(res => {
        context.commit({ type: "setIsLoading", isLoading: false });
        context.commit({
          type: "setViewedImageCollection",
          images: res.images
        });
        context.rootState.userModule.loggedInUser = res.loggedInUser;
        return res.images;
      });
    },
    getImagesByHashtag(context, { hashtag }) {
      context.commit({ type: "setIsLoading", isLoading: true });
      context.commit({ type: "setViewedImageCollection", images: null });
      return imageServices.getImagesByHashtag(hashtag).then(res => {
        context.commit({ type: "setIsLoading", isLoading: false });
        context.commit({
          type: "setViewedImageCollection",
          images: res.images
        });
        context.rootState.userModule.loggedInUser = res.loggedInUser;
        return res.images;
      });
    },
    getImageById(context, { imageId }) {
      console.log("imageId", imageId);
      return imageServices.getImageById(imageId).then(res => {
        context.rootState.userModule.loggedInUser = res.loggedInUser;
        return res.image;
      });
    }
  }
};
