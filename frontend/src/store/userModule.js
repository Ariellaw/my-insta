import userServices from "../services/userServices.js";

export default {
  state: {
    visitedUser: null,
    loggedInUser: null,
    searchedUsers: null,
  },
  getters: {
    visitedUser: state => {
      return state.visitedUser;
    },
    loggedInUser: state => {
      return state.loggedInUser;
    },
    searchedUsers: state => {
      return state.searchedUsers;
    },

  },
  mutations: {
  
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
    },

    setSeachedUsers(state, { users }) {
      state.searchedUsers = users;
    },

  },
  actions: {


    getUserNamesById(context, { ids }) {
      return userServices.getUserNamesById(ids).then(res => {
        context.commit({type:"setLoggedInUser", user:res.loggedInUser})
        return res.users;
      });
    },
    getVisitedUser(context, { userName }) {
      return userServices.getUserByUsername(userName).then(res => {
        context.commit({ type: "setVisitedUser", user:res.user });
        context.commit({type:"setLoggedInUser", user:res.loggedInUser})
        return res.user;
      });
    },
    getUserById(context, { userId }) {
  
      return userServices.getUserById(userId).then(res => {
        context.commit({type:"setLoggedInUser", user:res.loggedInUser})
        return res.user;
      });
    },
    getUserByUsername(context, { userName }) {
      return userServices.getUserByUsername(userName).then(res => {
        context.commit({type:"setLoggedInUser", user:res.loggedInUser})
        return res.user;
      });
    },
    addFollowers(context, { followeeId }) {
      return userServices
        .addFollowers(followeeId, context.state.loggedInUser._id)
        .then(res => {
          context.commit({ type: "updateUsers", users:res.users });
          context.commit({type:"setLoggedInUser", user:res.loggedInUser})
          return res.users;
        });
    },
    removeFollowers(context, { followeeId }) {
      return userServices
        .removeFollowers(followeeId, context.state.loggedInUser._id)
        .then(res => {
          context.commit({ type: "updateUsers", users:res.users });
          context.commit({type:"setLoggedInUser", user:res.loggedInUser})
          return res;
        });
    },
    addToUserFavorites(context, { imageId }) {
      return userServices
        .addToUserFavorites(imageId, context.state.loggedInUser._id)
        .then(res => {
          context.commit({ type: "updateLoggedInUser", user: res.user.value });
          // context.commit({type: "setLoggedInUser", user:res.loggedInUser})
          return res;
        });
    },
    removeFromUserFavorites(context, { imageId }) {
      return userServices
        .removeFromUserFavorites(imageId, context.state.loggedInUser._id)
        .then(res => {
          context.commit({ type: "updateLoggedInUser", user: res.user.value });
          // context.commit({type: "setLoggedInUser", user:res.loggedInUser})
          return res;
        });
    },
    updateUserDetails(context, { userDetails }) {
      userServices.updateUserDetails(userDetails).then(res => {
        context.commit({ type: "updateLoggedInUser", user: res.value });
        context.commit({type: "setLoggedInUser", user:res.value.loggedInUser})
        return res.value;
      });
    },

    findRelevantUsers(context, { keyword }) {
      userServices.findRelevantUsers(keyword).then(res => {
        context.commit({ type: "setSeachedUsers", users:res.users });
        context.commit({type: "setLoggedInUser", user:res.loggedInUser})
      });
    }
  }
};
