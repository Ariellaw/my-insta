import imageServices from '../services/imageServices.js'
import cloudinaryService from '../services/cloudinaryService.js'
import userServices from '../services/userServices.js'



export default {

    state: {
        isLoadingImages: false,
        visitedUserImages: null,
        viewedImage: null,
        viewedImageOwner: null,
        // viewedImageComments: null,
    },
    getters: {
        visitedUserImages: state => { return state.visitedUserImages },
        isLoadingImages: state => { return state.isLoadingImages },
        viewedImage: state => { return state.viewedImage },
        viewedImageOwner: state => { return state.viewedImageOwner },
        // viewedImageComments: state => { return state.viewedImage.comments },
        setIsLoadingFavorites: state => { return state.setIsLoadingFavorites },




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
        // getPostById(context,{id}){
        //     return imageServices.getPostById(id)
        //     .then(image => {
        //       context.commit({type:'setViewedPost', image});  
        //       userServices.getUserById(image.owenerId) 
        //       return image;

        //     })
        // },
        getCloudinaryPicUrl(context, { elForm }) {
            return cloudinaryService.uploadImg(elForm)
                .then(res => {
                    return res.url;
                })
        },
        addUserComment(context, { userComment, imageId, commentWriterId }) {
            return imageServices.addUserComment(userComment, imageId, commentWriterId)
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
                    context.commit({ type: 'setIsLoading', isLoading: false })
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
        }

    }



}
