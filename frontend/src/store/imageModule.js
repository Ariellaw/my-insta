import imageServices from '../services/imageServices.js'
import cloudinaryService from '../services/cloudinaryService.js'
import userServices from '../services/userServices.js'

export default {
  state: {
    isLoading: false,
    visitedUserImages: null,
    // loggedInUserImages: [],
    searchedResults:[],
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
      return state.viewedImageCollection
    },
    searchedResults:state=>{
      return state.searchedResults
    },
    // loggedInUserImages:state=>{
    //   return state.loggedInUserImages
    // },
    followeesThatLiked: state => {
      return state.followeesThatLiked
    },
    isTyping: state => {
      return state.isTyping
    },
    visitedUserImages: state => {
      return state.visitedUserImages
    },

    isLoading: state => {
      return state.isLoading
    },
    viewedImage: state => {
      return state.viewedImage
    },
    viewedImageOwner: state => {
      return state.viewedImageOwner
    },
    userFavoriteImages: state => {
      return state.userFavoriteImages
    },
    imagesForFeed: state => {
      return state.imagesForFeed
    },
    viewedImageComments: state => {
      return state.viewedImageComments
    },
    viewedImage: state => {
      return state.viewedImage
    }
  },
  mutations: {
    setSearchedResults(state, {images}){
      state.searchedResults = images
    },
    setFolloweesThatLiked (state, { users }) {
      state.followeesThatLiked = users
    },
    setViewedImageCollection (state, { images }) {
      state.viewedImageCollection = images
    },
    // setLoggedInUsersImages (state, { images }) {
    //   state.loggedInUserImages = images
    // },
    deleteImage (state, { imageId }) {
      var idx = state.viewedImageCollection.findIndex(
        img => img._id === imageId
      )
      if (idx >= 0) {
        state.viewedImageCollection.splice(idx, 1)
      }
    },
    // addToLoggedInUserAlbum(state, {image}){

    //   if(state.loggedInUserImages.findIndex(img => img._id===image._id)===-1){
    //     state.loggedInUserImages.splice(0,0,image)
    //   }
    // },
    setVisitedUserImages (state, { images }) {
      state.visitedUserImages = images
    },
    addToVisitedUserImages (state, { image }) {
      state.visitedUserImages.splice(0, image)
    },
    setAdditionalUserImages (state, { res }) {
      var length = state.visitedUserImages.length
      state.visitedUserImages.splice(length, 0, ...res)
    },
    setViewedImage (state, { image }) {
      state.viewedImage = image
    },
    updateViewedImage (state, { image }) {
      if (state.viewedImage) {
        state.viewedImage = image
      }
    },
    setVisitedImageOwner (state, { user }) {
      state.viewedImageOwner = user
    },
    setUserFavoriteImages (state, { images }) {
      state.userFavoriteImages = images
    },
    setInitalImages (state, { images }) {
      state.imagesForFeed = images
    },
    setAddionalImages (state, { images }) {
      state.imagesForFeed = state.imagesForFeed.concat(images)
    },

    SOCKET_CONNECT (state) {
      state.isConnected = true
    },

    SOCKET_DISCONNECT (state) {
      state.isConnected = false
    },

    SOCKET_commentAdded (state, data) {
      state.isTyping = null
      var img = state.viewedImage
      var comments = data.image.comments
      var idx = comments.findIndex(comment => comment.id === data.comment.id)
      if (idx === -1) {
        comments.splice(comments.length, 0, data.comment)
      }
      if (img) {
        if (img._id === data.image._id) {
          state.viewedImage.comments = comments
        }
      }
      idx = state.imagesForFeed.findIndex(image => image._id === data.image._id)
      if (idx >= 0) {
        state.imagesForFeed[idx].comments = comments
      }
    },
    SOCKET_commentEdited (state, data) {
      var img = state.viewedImage
      var comments = data.image.comments
      var idx = comments.findIndex(comment => comment.id === data.commentId)
      if (idx > -1) {
        var commentToUpdate = comments[idx]
        commentToUpdate.comment = data.newComment
        commentToUpdate.timeStamp = Date.now()
        comments.splice(idx, 1, commentToUpdate)
      }

      if (img) {
        if (img._id === data.image._id) {
          state.viewedImage.comments = comments
        }
      }
      idx = state.imagesForFeed.findIndex(image => image._id === data.image._id)
      if (idx >= 0) {
        state.imagesForFeed[idx].comments = comments
      }
    },
    SOCKET_commentDeleted (state, data) {
      var img = state.viewedImage
      var comments = data.image.comments
      var idx = comments.findIndex(comment => comment.id === data.commentId)
      if (idx > -1) {
        comments.splice(idx, 1)
      }
      if (img) {
        if (img._id === data.image._id) {
          state.viewedImage.comments = comments
        }
      }
      idx = state.imagesForFeed.findIndex(image => image._id === data.image._id)
      if (idx >= 0) {
        state.imagesForFeed[idx].comments = comments
      }
    },

    SOCKET_typing (state, data) {
      var img = state.viewedImage
      if (img) {
        if (img._id === data.imageId) {
          state.isTyping = data.userName
        }
      }
    },
    SOCKET_likeAdded (state, data) {
      var img = state.viewedImage
      var likes = data.image.likes
      var user = data.user
      var followees = state.followeesThatLiked

      if (likes.findIndex(id => id === user._id) === -1) {
        likes.splice(0, 0, user._id)
      }
      if (img) {
        if (img._id === data.image._id) {
          state.viewedImage.likes = likes
          var idx = followees.findIndex(followee => followee === user.userName)
          if (idx === -1) {
            state.followeesThatLiked.splice(0, 0, user.userName)
          }
        }
      }
      idx = state.imagesForFeed.findIndex(image => image._id === data.image._id)
      if (idx >= 0) {
        state.imagesForFeed[idx].likes = likes
      }
    },
    SOCKET_likeRemoved (state, data) {
      var img = state.viewedImage
      var likes = data.image.likes
      var user = data.user
      var followees = state.followeesThatLiked

      idx = likes.findIndex(id => id === user._id)
      if (idx !== -1) {
        likes.splice(idx, 1)
      }
      if (img) {
        if (img._id === data.image._id) {
          state.viewedImage.likes = likes
          var idx = followees.findIndex(
            followee => followee === user.userName || followee === 'You'
          )
          if (idx > -1) {
            state.followeesThatLiked.splice(idx, 1)
          }
        }
      }
      idx = state.imagesForFeed.findIndex(image => image._id === data.image._id)
      if (idx >= 0) {
        state.imagesForFeed[idx].likes = likes
      }
    }
  },
  actions: {
    getViewedImageFollowers (context, { image, loggedInUser }) {
      var followees = loggedInUser.followees

      var ids = []
      followees.forEach(followeeId => {
        if (image.likes.findIndex(likeId => likeId === followeeId) !== -1) {
          ids.push(followeeId)
        }
      })
      if (
        image.likes.findIndex(id => id === loggedInUser._id) > -1 &&
        ids.findIndex(id => id === loggedInUser._id) === -1
      ) {
        ids.splice(0, 0, loggedInUser._id)
      }

      if (ids.length === 0) {
        context.commit({ type: 'setFolloweesThatLiked', users: [] })
        return []
      } else {
        return userServices.getUserNamesById(ids).then(res => {
          var users = []
          res.users.forEach(user => {
            if (user.userName === loggedInUser.userName) {
              users.unshift(loggedInUser.userName)
            } else {
              users.push(user.userName)
            }
          })
          context.commit({ type: 'setFolloweesThatLiked', users })
          return users
        })
      }
    },
    getVisitedUserImages (context, { userId, isLoggedInUser=false}) {
      context.commit({ type: 'setIsLoading', isLoading: true })
      // context.commit({ type: 'setViewedImageCollection', images: null })

      return imageServices.getUserImages(userId).then(res => {
        context.commit({ type: 'setIsLoading', isLoading: false })
        context.commit({
          type: 'setViewedImageCollection',
          images: res.images
        })
        // if (isLoggedInUser) {
        //   context.commit({ type: 'setLoggedInUsersImages', images: res.images })
        // }
        return res.images
      })
    },
    getViewedImageOwner (context, { userId }) {
      return userServices.getUserById(userId).then(res => {
        context.commit({ type: 'setVisitedImageOwner', user: res.user })
      })
    },
    setViewedImage (context, { image }) {
      //TODO - thsetViewedImageink if this needs to go to the database
      context.commit({ type: 'setViewedImage', image })
      return image
    },

    getCloudinaryPicUrl (context, { elForm }) {
      return cloudinaryService.uploadImg(elForm).then(res => {
        return res.url
      })
    },
    deleteComment (context, { commentId, imageId }) {
      //TODO also update image in feed
      return imageServices.deleteComment(commentId, imageId).then(res => {
        context.commit({ type: 'updateViewedImage', image: res.image.value })
        return res.image.value.comments
      })
    },
    addUserComment (context, { comment, imageId, writerId }) {
      return imageServices
        .addUserComment(comment, imageId, writerId)
        .then(res => {
          context.commit({
            type: 'updateViewedImage',
            image: res.image.value
          })
          return res.image.value.comments
        })
    },
    editComment (context, { commentId, imageId, newComment }) {
      return imageServices
        .editComment(commentId, imageId, newComment)
        .then(res => {
          context.commit({
            type: 'updateViewedImage',
            image: res.image.value
          })
          return res.image.value.comments
        })
    },
    getUserFavoriteImages (context, { userId }) {
      context.commit({ type: 'setIsLoading', isLoading: true })
      // context.commit({ type: 'setUserFavoriteImages', images: null })

      return userServices.getImagesByImageId(userId).then(res => {
        context.commit({
          type: 'setUserFavoriteImages',
          images: res.images
        })

        return res.images
      })
    },
    addUserLike (context, { imageId, userId }) {
      return imageServices.addUserLike(imageId, userId).then(res => {
        context.commit({ type: 'updateViewedImage', image: res.image.value })
        return res.image.value.likes
      })
    },
    removeUserLike (context, { imageId, userId }) {
      return imageServices.removeUserLike(imageId, userId).then(res => {
        context.commit({ type: 'updateViewedImage', image: res.image.value })

        return res.image.value.likes
      })
    },
    addImage (context, { imgDetails, image }) {
      imgDetails.ownerId = context.rootState.userModule.loggedInUser._id
      return imageServices.addImage(imgDetails, image).then(res => {
        const image = res.image.ops[0]
        // context.commit({ type: 'addToLoggedInUserAlbum', image })

      })
    },

    getInitalImages (context) {
      return imageServices.getInitalImages().then(res => {
        context.commit({ type: 'setInitalImages', images: res.images })
      })
    },
    getAdditionalImages (context) {
      var feedImages = context.state.imagesForFeed
      var startingPoint = 0
      if (feedImages.length !== 0) {
        startingPoint = feedImages[feedImages.length - 1]._id
      }
      return imageServices
        .getAdditionalImages(startingPoint, feedImages)
        .then(res => {
          context.commit({ type: 'setAddionalImages', images: res.images })
        })
    },

    getImagesByLocation (context, { location }) {
      context.commit({ type: 'setIsLoading', isLoading: true })
      // context.commit({ type: 'setViewedImageCollection', images: null })
      return imageServices.getImagesByLocation(location).then(res => {
        context.commit({ type: 'setIsLoading', isLoading: false })
        context.commit({
          type: 'setSearchedResults',
          images: res.images
        })
        return res.images
      })
    },
    getImagesByHashtag (context, { hashtag }) {
      context.commit({ type: 'setIsLoading', isLoading: true })
      // context.commit({ type: 'setViewedImageCollection', images: null })
      return imageServices.getImagesByHashtag(hashtag).then(res => {
        context.commit({ type: 'setIsLoading', isLoading: false })
        context.commit({
          type: 'setSearchedResults',
          images: res.images
        })
        return res.images
      })
    },
    getImageById (context, { imageId }) {
      return imageServices.getImageById(imageId).then(res => {
        return res.image
      })
    },
    deleteImage (context, { imageId }) {
      return imageServices
        .deleteImage(imageId)
        .then(res =>
          context.commit({ type: 'deleteImage', imageId: res.value._id })
        )
    }
  }
}
