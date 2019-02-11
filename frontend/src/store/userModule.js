import userServices from '../services/userServices.js'
// import cloudinaryService from '../services/cloudinaryService.js'

export default {
    state: {

        visitedUser: null,
        loggedInUser:{
            _id : "5c5fecdbd16a8d56eaca3c96",
            firstName : "Olivier",
            lastName : "Da silva",
            userName : "sadbird972",
            followees : ["5c5fecdbd16a8d56eaca3c9b"],
            followers : [],
            profilePic : "https://randomuser.me/api/portraits/men/6.jpg",
            backgroundPic : "https://randomuser.me/api/portraits/men/6.jpg",
            email : "olivier.dasilva@example.com"
        }

    },
    getters: {
        visitedUser: state => { return state.visitedUser },
        loggedInUser: state => { return state.loggedInUser }


    },
    mutations: {
        setIsLoading(state, { isLoading }) {
            state.isLoadingSamples = isLoading;
        },


        updateFollowers(state, { users }) {
            console.log("followers test", users[0].value, users[1].value)

        },
        updateUserFavorites(state, { user }) {
            var favorites = user.favorites;
            state.loggedInUser.favorites = favorites;
        },

        getVisitedUser(state, { user }) {
            state.visitedUser = user;
            // state.visitedUserSamples = data.samples;
            // state.visitedUserFavorites = data.favorites;
        },
        updateUserDetails(state, { newUser }) {
            state.loggedInUser = newUser;
        }
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
                    context.commit({ type: 'getVisitedUser', user })
                    return user;
                })
        },
        getUserById(context, { userId }) {
            return userServices.getUserById(userId)
                .then(owner => {
                    return owner
                })
        },

        signUp(context, userDetails) {
            return userServices.registration(userDetails)
                .then(user => {
                    context.commit({ type: 'setUser', user })
                    return user;
                })
        },
        logIn(context, userDetails) {
            return userServices.logIn(userDetails)
                .then(user => {
                    context.commit({ type: 'setUser', user })
                    return user;
                })
        },

        updateFollowers(context, { followeeId }) {
            userServices.updateFollowers(followeeId, context.state.loggedInUser._id)
                .then(users => {
                    context.commit({ type: 'updateFollowers', users })
                })
        },
        addSamplesToFavorites(context, { sampleId, userId }) {

            userServices.addSamplesToFavorites(sampleId, userId)
                .then(user => {
                    context.commit({ type: 'updateUserFavorites', user })
                })
        },
        removeSamplesFromFavorites(context, { sampleId, userId }) {

            userServices.removeSamplesFromFavorites(sampleId, userId)
                .then(user => {
                    context.commit({ type: 'updateUserFavorites', user })
                })
        },
        updateUserDetails(context, { newUserDetails, loggedInUserId }) {

            return userServices.updateUserDetails(newUserDetails, loggedInUserId)
                .then(newUser => {
                    context.commit({ type: 'updateUserDetails', newUser });
                    return newUser
                })
        }

    }


}
