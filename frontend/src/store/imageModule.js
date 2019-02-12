import imageServices from '../services/imageServices.js'
import cloudinaryService from '../services/cloudinaryService.js'
import userServices from '../services/userServices.js'



export default {

    state:{
        pictures:null,
        isLoadingImages: false,
        visitedUserImages:null,
        viewedImage:null,
        viewedImageOwner:null
    },
    getters:{
        visitedUserImages: state => { return state.visitedUserImages },
        isLoadingImages: state =>  {return state.isLoadingImages},
        viewedImage: state =>  {return state.viewedPost},
        viewedImageOwner:state => {return state.viewedImageOwner}


    },
    mutations:{
        setIsLoading(state, { isLoading }) {
            state.isLoadingImages = isLoading;
        },
        setVisitedUserImages(state, {images}){
            state.visitedUserImages = images;
        },
        setViewedPost(state, {image}){
            state.viewedImage = image;
        },
        setVisitedImageOwner(state, {user}){
            state.viewedImageOwner = user;
        }
    },
    actions:{
        getVisitedUserImages(context, {userId}) {
            context.commit({ type: 'setIsLoading', isLoading: true })

            return imageServices.getUserImages(userId)
                .then(images => {
                    context.commit({ type: 'setIsLoading', isLoading: false })
                    context.commit({type:'setVisitedUserImages', images})
                    return images;
                })
        },
        getViewedImageOwner(context, {userId}){
            return userServices.getUserById(userId)
            .then(user => {
                context.commit({type:'setVisitedImageOwner', user})
            })
        },
        // getPostById(context,{id}){
        //     return imageServices.getPostById(id)
        //     .then(image => {
        //       context.commit({type:'setViewedPost', image});  
        //       userServices.getUserById(image.owenerId) 
        //       return image;

        //     })
        // },
        getCloudinaryPicUrl(context,{elForm}){
            return cloudinaryService.uploadImg(elForm)
                .then(res => {
                    return res.url;
                })
        },

    }



}
