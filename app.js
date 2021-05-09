const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');
const {requireAuth, checkUser} = require('./middleware/authMiddleware');
const app = express();
let server = require('http').createServer(app);
let io = require('socket.io')(server, { cors: {origin: "*"}});
let canvasData;
var cors = require('cors');
app.use(cors());

// middleware
app.use(express.static('public'));

//app.use('/public', express.static(__dirname + '/public'));

app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
const bodyParser = require('body-parser');


// view engine
app.set('view engine', 'ejs');
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next)=>{ res.locals['socketio'] = io; next(); });



// database connection
const dbURI = "mongodb+srv://vishaka:Vishaka@cluster0.u0mor.mongodb.net/diagram-tool?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => server.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));


app.use(authRoutes);
app.use(userRoutes);

/*let history = [];

io.on('connection', function(socket){
    console.log('a user connected', socket.id);
    // socket.broadcast.to(socket.id).emit('drawing', canvasData);

    for(let item of history)
      socket.emit('drawing',item);

    

    socket.on('disconnect', function(){
        history = [];
        console.log('user disconnected');
    });

    socket.on('ready', function(msg) {
       console.log(msg);
    });

    socket.on('drawing', function (canvasJson) {
       console.log("Drawing");
       canvasData = canvasJson;
       history.push(canvasData);
       socket.broadcast.emit('drawing', canvasData);
    });
});*/
