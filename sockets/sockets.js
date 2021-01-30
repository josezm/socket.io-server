const {io} = require('../index');

//mensajes de sockets

io.on('connection', client => {
   console.log("Cliente conectado")
   client.on('disconnect', () => {
      console.log("Cliente desconectado");
    });

    client.on('mensaje', (payload)=>{
       console.log(payload.nombre);

       client.emit('mensaje', {admin:'Saludos terricolas'})

    })

 });