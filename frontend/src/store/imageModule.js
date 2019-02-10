import imageServices from '../services/imageServices.js'
import cloudinaryService from '../services/cloudinaryService.js'
import userServices from '../services/userServices.js'



export default {

    state:{
        pictures:null,
        isLoadingImages: false,
        visitedUserImages:null,
        viewedPost:null,
    },
    getters:{
        visitedUserImages: state => { return state.visitedUserImages },
        isLoadingImages: state =>  {return state.isLoadingImages},
        viewedPost: state =>  {return state.viewedPost}


    },
    mutations:{
        setIsLoading(state, { isLoading }) {
            state.isLoadingImages = isLoading;
        },
        setVisitedUserImages(state, {images}){
            console.log(images);
            state.visitedUserImages = images;
        },
        setViewedPost(state, {post}){
            state.viewedPost = post;
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
        getPostById(context,{id}){
            return imageServices.getPostById(id)
            .then(post => {
              context.commit({type:'setViewedPost', post});
              return post;

            })
        },
        getCloudinaryPicUrl(context,{elForm}){
            return cloudinaryService.uploadImg(elForm)
                .then(res => {
                    return res.url;
                })
        },

    }



}
