const express = require("express");
const nodemailer = require('nodemailer')
const mongoService = require("./services/mongo-services");
const imageService = require("./services/imageService");
const userService = require("./services/userService.js")
const contactService = require("./services/contactService");

const addUserRoutes = require("./routes/user-routes");
const addImageRoutes = require("./routes/image-routes");
const addAuthRoutes = require("./routes/auth-routes.js");
const addContactRoutes = require("./routes/contact-routes");

const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');




const app = express();
app.use(
  cors({
    origin: ["http://10.100.102.4:3003", "http://ariellaw.github.io", "https://ariellaw.github.io", "https://ariellaw.github.io/", 
  "http://127.0.0.1:5500", "https://maps.googleapis.com"],
    credentials: true // enable set cookie
  })
);



mongoService.initDbConnection();



app.set("view engine", "ejs");


app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static("public"));
app.use(
  session({
    secret: "cats",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);
app.use(bodyParser.urlencoded({ extended: false }));


passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  userService.getById(id)
    .then(user => {
      done(null, user);
    }).catch(err => {
      done(err);
    })
});


passport.use(
  new LocalStrategy(function(username, password, done) {
    userService
      .getUserByUsername(username)
      .then(user => {
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        if (user.password !== password) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      })
      .catch(err => {
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
addContactRoutes(app);


// app.get('/', (req, res) => {
//     res.send('Hello World! YAY')
// })

const PORT = process.env.PORT || 3003;
var server = app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`));

// var server = app.listen(8810);
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
    console.log("commentEdited")
    io.emit("commentEdited", data);
  });
  socket.on("typing", function(data) {
    socket.broadcast.emit("typing", data);
  });
});


