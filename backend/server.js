const express = require("express");
const mongoService = require("./services/mongo-services");
const imageService = require("./services/imageService");
const userService = require("./services/userService.js")

const addUserRoutes = require("./routes/user-routes");
const addImageRoutes = require("./routes/image-routes");

const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const addAuthRoutes = require("./routes/auth-routes.js");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');





const app = express();
app.use(
  cors({
    // origin: ['http://192.168.1.105:8080'],
    // origin: "*",
    origin: ["http://192.168.1.105:8080"],
    credentials: true // enable set cookie
    // Access-Control-Allow-Origin: https://maps.googleapis.com
  })
);

mongoService.initDbConnection();

app.set("view engine", "ejs");

//

app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static("public"));
// app.use(session({ secret: "cats" }));
app.use(
  session({
    secret: "cats",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);
app.use(bodyParser.urlencoded({ extended: false }));



// app.configure(function() {
//   app.use(express.static('public'));
//   app.use(express.cookieParser());
//   app.use(express.bodyParser());
//   app.use(express.session({ secret: 'keyboard cat' }));
//   app.use(passport.initialize());
//   app.use(passport.session());
//   app.use(app.router);
// });



passport.serializeUser(function(user, done) {
  console.log("serializeUser()", user._id);
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  console.log("deserializeUser()", id);
  userService.getById(id)
    .then(user => {
      console.log("deserializeUser() success", user);
      done(null, user);
    }).catch(err => {
      console.log("deserializeUser() err", err);
      done(err);
    })
});


passport.use(
  new LocalStrategy(function(username, password, done) {
    // console.log("localstrategy first printout")
    userService
      .getUserByUsername(username)
      .then(user => {
        // console.log("SERVER print the user", user);
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        if (user.password !== password) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      })
      .catch(err => {
        // console.log("SERVER print the error", err);

        return done(err);
      });
  })
);
       
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());



addUserRoutes(app, passport);
addImageRoutes(app, passport);
addAuthRoutes(app,passport);
// app.get('/', (req, res) => {
//     res.send('Hello World! YAY')
// })

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`));

var server = app.listen(8810);
const io = require("socket.io")(server, {
  path: "/socket.io"
});

io.on("connection", function(socket) {
  socket.on("commentAdded", function(data) {
    var comment = imageService.createCommentObj(data.writerId, data.comment);
    io.emit("commentAdded", { comment, image:data.image });
  });
  socket.on("likeAdded", function(data) {
    io.emit("likeAdded", data);
  });
  socket.on("likeRemoved", function(data) {
    io.emit("likeRemoved", data);
  });
  socket.on("commentDeleted", function(data) {
    io.emit("commentDeleted", data);
  });
  socket.on("commentEdited", function(data) {
    io.emit("commentEdited", data);
  });
  socket.on("typing", function(data) {
    socket.broadcast.emit("typing", data);
  });
});


