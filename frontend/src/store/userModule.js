import userServices from '../services/userServices.js'
// import cloudinaryService from '../services/cloudinaryService.js'

export default {
    state: {

        visitedUser: null,
        loggedInUser: null,
        searchedUsers:null


    },
    getters: {
        visitedUser: state => { return state.visitedUser },
        loggedInUser: state => { return state.loggedInUser },
        searchedUsers: state => {return state.searchedUsers}



    },
    mutations: {
        setIsLoading(state, { isLoading }) {
            state.isLoadingImages = isLoading;
        },
        updateUsers(state, { users }) {
            state.loggedInUser = users[1].value;
            state.visitedUser = users[0].value;
        },
        setLoggedInUser(state, { user }) {
            state.loggedInUser = user;
        },
        updateLoggedInUser(state, { user }) {
            state.loggedInUser = user;
        },
        

        setVisitedUser(state, { user }) {
            state.visitedUser = user;
            // state.visitedUserSamples = data.samples;
            // state.visitedUserFavorites = data.favorites;
        },

        setSeachedUsers(state, {res}){
            state.searchedUsers = res;
        }
    },
    actions: {
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
        },
        addToUserFavorites(context, { imageId }) {

            return userServices.addToUserFavorites(imageId, context.state.loggedInUser._id)
                .then(user => {
                    context.commit({ type: 'updateLoggedInUser', user:user.value })
                    return user;
                })
        },
        removeFromUserFavorites(context, { imageId }) {
            return userServices.removeFromUserFavorites(imageId, context.state.loggedInUser._id)
                .then(user => {
                    context.commit({ type: 'updateLoggedInUser', user:user.value  })
                    return user;
                })
        },
        updateUserDetails(context,{userDetails}){
            userServices.updateUserDetails(userDetails)
                .then(user =>{
                    context.commit({ type: 'updateLoggedInUser', user:user.value })
                    return user.value;
                } )
        },
        // authenticateUser(context, {user}){
        //     userServices.authenticateUser(user)
        //         .then(user =>{
        //             console.log('actions return user', user)
        //         })
        // }
        findRelevantUsers(context, {keyword}){
           userServices.findRelevantUsers(keyword)
            .then(res =>{
                context.commit({type:"setSeachedUsers", res})
            })
        }
    }
}
   

