
// export default {
//   state: {
//     isConnected: false,

//   },
//   getters: {},
//   mutations: {
//     SOCKET_CONNECT(state) {
//       state.isConnected = true;
//     },

//     SOCKET_DISCONNECT(state) {
//       state.isConnected = false;
//     },
//     SOCKET_commentAdded(data) {
//       console.log("commentAddednjkbjblj");
//       var img = this.state.viewedImage;

//       if (img._id === data.imageId) {
//         var comments = this.viewedImage.comments;
//         comments.splice(comments.length, 0, data.comment);
//         this.state.viewedImage.comments = comments;
//         console.log(
//           "test",
//           this.state.viewedImage,
//           comments,
//           img._id === data.imageId
//         );
//       }
//     },
//     likesAdded(data) {
//       this.likes = data;
//     }
//   },
//   actions: {}
// };
