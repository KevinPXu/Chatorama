const path = require("path");
const express = require("express");
const helpers = require("./utils/helpers");

const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const exphbs = require("express-handlebars");
const hbs = exphbs.create({ helpers });

const routes = require("./controllers");
const sequelize = require("./config/connection");

const http = require('http');
const { Server } = require('socket.io');

const app = express();

const PORT = process.env.PORT || 3001;

//creates a session and a cookie with a max age of 5 minutes and allows the storage of session information to that cookie
const sess = {
  secret: "Shhhhhhhhhh",
  cookie: {
    maxAge: 300000,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

//uses the session in the application
app.use(session(sess));

//allows the render function to render handlebar templates
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);


const httpServer = http.Server(app);
const io = new Server(httpServer);

io.on('connection', (socket) => { //when a connection event occurs
  console.log('Client connected'); //logs to back end console
  socket.on('disconnect', () => console.log('Client disconnected')); //when a disconnection occurs log to back end console

  //if current user is in the chat room, assign them to the channel they are in.
  socket.on('channelEmit', (chatroomID) => { //listen for emit and assign the socket to proper room
      console.log('Socket joined from', chatroomID);
      socket.join(chatroomID.toString());
  });
  socket.on('chatroomUpdate', (updateObj) => { //listen for a chatroomUpdate from the user
      io.to(updateObj.id.toString()).emit("updateMessages"); //update all room members
  });
});

//syncs the sequelize ORM to the express server
sequelize.sync({ force: false }).then(() => {
  httpServer.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});
