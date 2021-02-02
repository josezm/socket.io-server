const db = require('../database/config');
const { comprobarJWT } = require('../helpers/jwt');
const {io} = require('../index');

//mensajes de sockets

io.on('connection', async client => {
   console.log("Cliente conectado")

    const token = client.handshake.headers['x-token'];
    const [valido, uid] = comprobarJWT(token);

    if(!valido) {
      console.log("Deconectando cliente");
      return client.disconnect();
    }
    console.log('Cliente autenticado');
    //Set active in DB
    await db.setUserOnline(uid);
    console.log('Cliente actualizado en BD');

    //Ingresar al usuario a una sala
    client.join(uid);

    //Escuchar evento mensaje-personal
    client.on('mensaje-personal', async payload => {
      // GUARDAR MENSAJE EN BD
      await db.saveMessage(payload);
      // console.log(payload);

      io.to(payload.to).emit('mensaje-personal', payload);
    });

    client.on('disconnect', async () => {
      await db.setUserOffline(uid);
      console.log('Cliente desconectado') 
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