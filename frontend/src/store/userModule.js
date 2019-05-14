import userServices from "../services/userServices.js";

export default {
  state: {
    visitedUser: null,
    loggedInUser: null,
    searchedUsers: null
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
    }
  },
  mutations: {
    updateUsers(state, { users, followeeId }) {
      state.loggedInUser = users[1].value;
      if (state.visitedUser) {
        if (state.visitedUser._id === followeeId) {
          state.visitedUser = users[0].value;
        }
      }
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
    }
  },
  actions: {
    updateLoggedInUserTemp(context, { detailToUpdate, detail}){
      var user = context.state.loggedInUser;
      user[detailToUpdate]=detail;
      if(!user){
        return;
      }
      context.commit({type:"updateLoggedInUser", user})
    },
    registerNewUser(context, { user }) {
      return userServices.createNewUser(user);
    },
    getUserNamesById(context, { ids }) {
      return userServices.getUserNamesById(ids).then(res => {
        context.commit({ type: "setLoggedInUser", user: res.loggedInUser });
        return res.users;
      });
    },
    setVisitedUser(context, user) {
      context.commit({ type: "setVisitedUser", user });
    },
    getVisitedUser(context, { userName }) {
      return userServices.getUserByUsername(userName).then(res => {
        context.commit({ type: "setVisitedUser", user: res.user });
        return res.user;
      });
    },
    getUserById(context, { userId }) {
      return userServices.getUserById(userId).then(res => {
        context.commit({ type: "setLoggedInUser", user: res.loggedInUser });
        return res.user;
      });
    },
    getUserByUsername(context, { userName }) {
      return userServices.getUserByUsername(userName).then(res => {
        context.commit({ type: "setLoggedInUser", user: res.loggedInUser });
        return res.user;
      });
    },
    addFollowers(context, { followeeId }) {
      return userServices
        .addFollowers(followeeId, context.state.loggedInUser._id)
        .then(res => {
          context.commit({ type: "updateUsers", users: res.users, followeeId });
          return res.users;
        });
    },
    removeFollowers(context, { followeeId }) {
      return userServices
        .removeFollowers(followeeId, context.state.loggedInUser._id)
        .then(res => {
          context.commit({ type: "updateUsers", users: res.users, followeeId });
          return res.users;
        });
    },
    addToUserFavorites(context, { imageId }) {
      return userServices
        .addToUserFavorites(imageId, context.state.loggedInUser._id)
        .then(res => {
          context.commit({ type: "updateLoggedInUser", user: res.user.value });
          return res;
        });
    },
    removeFromUserFavorites(context, { imageId }) {
      return userServices
        .removeFromUserFavorites(imageId, context.state.loggedInUser._id)
        .then(res => {
          context.commit({ type: "updateLoggedInUser", user: res.user.value });
          return res;
        });
    },
    updateUserDetails(context, { userDetails }) {
      userServices.updateUserDetails(userDetails).then(res => {
        context.commit({ type: "updateLoggedInUser", user: res.value });

        return res.value;
      });
    },

    findRelevantUsers(context, { keyword }) {
      userServices.findRelevantUsers(keyword).then(res => {
        context.commit({ type: "setSeachedUsers", users: res.users });
        context.commit({ type: "setLoggedInUser", user: res.loggedInUser });
      });
    },
    logout(context) {
      context.commit({ type: "setLoggedInUser", user: null });
    },

    getLoggedInUser(context) {
      userServices.getLoggedInUser().then(res => {
        context.commit({ type: "setLoggedInUser", user: res.loggedInUser });
        return res.loggedInUser;
      });
    }
  }
};
