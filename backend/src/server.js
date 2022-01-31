const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const routes = require('./routes')

const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
})

const connectedUsers = {

}

io.on('connection', socket => {
  const { user } = socket.handshake.query

  connectedUsers[user] = socket.id
})

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0.08wl5.mongodb.net/omnistack8?retryWrites=true&w=majority', {
  useNewUrlParser: true,
})

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
})

app.use(cors())
app.use(express.json())
app.use(routes);

server.listen(3333);

// M - Model, V - View, C - Controller

// const mongoose = require('mongoose')
// const express = require('express');
// const socketio = require('socket.io');
// const http = require('http');
// const cors = require('cors');


// const PORT = 3333;

// const routes = require('./routes');

// const app = express();
// const server = http.createServer(app);
// const io = socketio(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//     allowedHeaders: ["my-custom-header"],
//     credentials: true
//   }
// })

// io.on('connection', (socket) => {
//   console.log('Novo usuário conectado!');

//   socket.on('disconnect', () => {
//     console.log('Usuário desconectado!');
//   })
// });

// mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0.08wl5.mongodb.net/omnistack8?retryWrites=true&w=majority', {
//   useNewUrlParser: true,
// })

// app.use(cors());
// app.use(express.json())
// app.use(routes);

// server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));