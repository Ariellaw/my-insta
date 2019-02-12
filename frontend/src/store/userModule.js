import userServices from '../services/userServices.js'
// import cloudinaryService from '../services/cloudinaryService.js'

export default {
    state: {

        visitedUser: null,
        loggedInUser: null,

    },
    getters: {
        visitedUser: state => { return state.visitedUser },
        loggedInUser: state => { return state.loggedInUser }


    },
    mutations: {
        setIsLoading(state, { isLoading }) {
            state.isLoadingSamples = isLoading;
        },
        updateUsers(state, {users}){
            state.loggedInUser = users[1].value;
            state.visitedUser =  users[0].value;
        },
        setLoggedInUser(state, { user }) {
            state.loggedInUser = user;
        },

        // updateUserFavorites(state, { user }) {
        //     var favorites = user.favorites;
        //     state.loggedInUser.favorites = favorites;
        // },

        setVisitedUser(state, { user }) {
            state.visitedUser = user;
            // state.visitedUserSamples = data.samples;
            // state.visitedUserFavorites = data.favorites;
        },
        // updateUserDetails(state, { newUser }) {
        //     state.loggedInUser = newUser;
        // }
    },
    actions: {
        // getCloudinaryPicUrl(context, { elForm }) {
        //     return cloudinaryService.uploadImg(elForm)
        //         .then(res => {
        //             return res.url;
        //         })
        // },



        getVisitedUser(context, { userId }) {
            return userServices.getUserById(userId)
                .then(user => {
                    context.commit({ type: 'setVisitedUser', user })
                    return user;
                })
        },
        getLoggedInUser(context, { userId }) {
            return userServices.getUserById(userId)
                .then(user => {
                    context.commit({ type: 'setLoggedInUser', user })
                    return user;
                })
        },
        getUserById(context, { userId }) {
            return userServices.getUserById(userId)
                .then(user => {
                    return user
                })
        },
        addFollowers(context, { followeeId }) {
            return userServices.addFollowers(followeeId, context.state.loggedInUser._id)
                .then(users => {
                    context.commit({ type: 'updateUsers', users })
                    return users;
                })
        },
        removeFollowers(context, { followeeId }) {

            return userServices.removeFollowers(followeeId, context.state.loggedInUser._id)
                .then(users => {
                    context.commit({ type: 'updateUsers', users })
                    return users;
                })
        }

        // signUp(context, userDetails) {
        //     return userServices.registration(userDetails)
        //         .then(user => {
        //             context.commit({ type: 'setUser', user })
        //             return user;
        //         })
        // },
        // logIn(context, userDetails) {
        //     return userServices.logIn(userDetails)
        //         .then(user => {
        //             context.commit({ type: 'setUser', user })
        //             return user;
        //         })
        // },


        //     addSamplesToFavorites(context, { sampleId, userId }) {

        //         userServices.addSamplesToFavorites(sampleId, userId)
        //             .then(user => {
        //                 context.commit({ type: 'updateUserFavorites', user })
        //             })
        //     },
        //     removeSamplesFromFavorites(context, { sampleId, userId }) {

        //         userServices.removeSamplesFromFavorites(sampleId, userId)
        //             .then(user => {
        //                 context.commit({ type: 'updateUserFavorites', user })
        //             })
        //     },
        //     updateUserDetails(context, { newUserDetails, loggedInUserId }) {

        //         return userServices.updateUserDetails(newUserDetails, loggedInUserId)
        //             .then(newUser => {
        //                 context.commit({ type: 'updateUserDetails', newUser });
        //                 return newUser
        //             })
        //     }

    }


}
