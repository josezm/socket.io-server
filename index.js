const express = require('express');
const path = require('path');
require('dotenv').config();

//App de express
const app = express();
//Lectura y parseo del body
app.use(express.json());


//Node Server
const server = require('http').createServer(app);
//Socket.io
module.exports.io = require('socket.io')(server);
require('./sockets/sockets')


//Middlewares
//path inicial
app.use('/api/login', require('./routes/auth'));


// path publico
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

//SERVER
server.listen(process.env.PORT, (err)=>{
   if(err) throw new Error(err);
   console.log("Servidor corriendo en puerto " + process.env.PORT);
})