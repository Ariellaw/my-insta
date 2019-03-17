const express = require('express');
const mongoService = require('./services/mongo-services');
const imageService = require('./services/imageService');


const addUserRoutes = require('./routes/user-routes');
const addImageRoutes = require('./routes/image-routes');

const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const addAuthRoutes = require('./routes/auth-routes.js');
// const io = require('socket.io');
// const addUserRoutes = require('./routes/user-route')

const app = express();
app.use(cors({
  // origin: ['http://localhost:8080'],
  // origin: "*",
  origin: ['http://192.168.1.105:8080'],
  credentials: true, // enable set cookie
  // Access-Control-Allow-Origin: https://maps.googleapis.com

}));



mongoService.initDbConnection();


app.set('view engine', 'ejs');

//
// app.use(express.static('public'));


app.use(bodyParser.json())
app.use(cookieParser());

app.use(session({
  secret: 'puki muki',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

addUserRoutes(app);
addImageRoutes(app);
addAuthRoutes(app);
// app.get('/', (req, res) => {
//     res.send('Hello World! YAY')
// })





const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`))

// var server = require('http').Server(app);
var server = app.listen(8810)
const io = require('socket.io')(server, {
  path: '/socket.io'
});


io.on('connection', function(socket){
  socket.on('commentAdded', function(data){
    var comment = imageService.createCommentObj(data.writerId, data.comment)
    console.log('commentAdded: ', comment);
    io.emit('commentAdded', {comment, imageId:data.imageId });
  });
  socket.on('likesAdded', function(data){
    io.emit('likesAdded', data)
  })
});
