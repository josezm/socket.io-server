const {io} = require('../index');

//mensajes de sockets

io.on('connection', client => {
   console.log("Cliente conectado")
   client.on('disconnect', () => {
      console.log("Cliente desconectado");
    });

   //  client.on('mensaje', (payload)=>{
   //    //  console.log(payload.nombre);
   //    //  console.log(payload.mensaje);

   //     client.broadcast.emit('mensaje', payload)

   //  });

   //  client.on('nuevo-mensaje', (payload) =>{
   //     io.emit('nuevo-mensaje', 'mensaje: ' + payload);
   //  });

 });