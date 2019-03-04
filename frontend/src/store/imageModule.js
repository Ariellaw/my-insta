import imageServices from '../services/imageServices.js'
import cloudinaryService from '../services/cloudinaryService.js'
import userServices from '../services/userServices.js'



export default {

    state: {
        isLoadingImages: false,
        visitedUserImages: null,
        viewedImage: null,
        viewedImageOwner: null,
        userFavoriteImages: null,
        imagesForFeed: [],
    },
    getters: {
        visitedUserImages: state => { return state.visitedUserImages },
        isLoadingImages: state => { return state.isLoadingImages },
        viewedImage: state => { return state.viewedImage },
        viewedImageOwner: state => { return state.viewedImageOwner },
        setIsLoadingFavorites: state => { return state.setIsLoadingFavorites },
        userFavoriteImages: state => { return state.userFavoriteImages },
        imagesForFeed: state => { return state.imagesForFeed }



    },
    mutations: {
        setIsLoading(state, { isLoading }) {
            state.isLoadingImages = isLoading;
        },
        setIsLoadingFavorites(state, { isLoading }) {
            state.setIsLoadingFavorites = isLoading;
        },
        setVisitedUserImages(state, { images }) {
            state.visitedUserImages = images;
        },
        setViewedImage(state, { image }) {
            state.viewedImage = image;
        },
        setVisitedImageOwner(state, { user }) {
            state.viewedImageOwner = user;
        },
        setUserCommentsAndImage(state, { res }) {
            var image = res.value;
            state.viewedImage = image;
            state.viewedImageComments = image.comments;
        },
        setUserFavoriteImages(state, { images }) {
            state.userFavoriteImages = images;

        },
        setInitalImages(state, { res }) {
            state.imagesForFeed = res;
        },
        setAddionalImages(state, {res}){
            state.imagesForFeed = state.imagesForFeed.concat(res);
        }

    },
    actions: {
        getVisitedUserImages(context, { userId }) {
            context.commit({ type: 'setIsLoading', isLoading: true })

            return imageServices.getUserImages(userId)
                .then(images => {
                    context.commit({ type: 'setIsLoading', isLoading: false })
                    context.commit({ type: 'setVisitedUserImages', images })
                    return images;
                })
        },
        getViewedImageOwner(context, { userId }) {

            return userServices.getUserById(userId)
                .then(user => {
                    context.commit({ type: 'setVisitedImageOwner', user })
                })
        },
        setViewedImage(context, { image }) {
            context.commit({ type: 'setViewedImage', image })
            return image;

        },

        getCloudinaryPicUrl(context, { elForm }) {
            return cloudinaryService.uploadImg(elForm)
                .then(res => {
                    return res.url;
                })
        },
        addUserComment(context, { comment, imageId, writerId }) {

            return imageServices.addUserComment(comment, imageId, writerId)
                .then(res => {
                    context.commit({ type: 'setUserCommentsAndImage', res })
                    return res.value.comments;
                })
        },
  
        getUserFavoriteImages(context, { userId }) {
            context.commit({ type: 'setIsLoadingFavorites', isLoading: true })
            return userServices.getImagesByImageId(userId)
                .then(images => {
                    context.commit({ type: 'setUserFavoriteImages', images })
                    context.commit({ type: 'setIsLoadingFavorites', isLoading: false })
                    return images;
                })
        },
        addUserLike(context, { imageId, userId }) {
            return imageServices.addUserLike(imageId, userId)
                .then(res => {
                    // context.commit({type:'setViewedImage', res});
                    return res.value.likes;
                })
        },
        removeUserLike(context, { imageId, userId }) {

            return imageServices.removeUserLike(imageId, userId)
                .then(res => {

                    // context.commit({type:'setViewedImage', res});
                    return res.value.likes;
                })
        },
        createImgObj(context, { imgDetails, image }) {
            return imageServices.createImgObj(imgDetails, image);
            //TODO: findout if displayedprofile is loggedinuserprofiel and update inthat case
        },
        getInitalImages(context) {

            return imageServices.getInitalImages()
                .then(res => {
                    context.commit({ type: "setInitalImages", res })
                })
        },
        getAdditionalImages(context){
            var feedImages = context.state.imagesForFeed;
            var startingPoint = 0;
            if (feedImages.length !== 0) {
                startingPoint = feedImages[feedImages.length - 1]._id;
            }
            
            return imageServices.getAdditionalImages(startingPoint)
                .then(res => {
                    context.commit({ type: "setAddionalImages", res })
                })
        },
        getImagesByLocation(context,{location}){
            return imageServices.getImagesByLocation(location)
                .then(images => {
                    return images;
                })
        },
        getImagesByHashtag( contxt, {hashtag}){
            console.log('hashtag actions', hashtag)
            return imageServices.getImagesByHashtag(hashtag)
            .then(images => {
                return images;
            })
        }

    }



}
