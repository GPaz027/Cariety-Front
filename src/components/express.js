import express from "express";
import server from "http"
import WebSocket, { WebSocketServer } from "ws";

const app = express()
const port = 3000
const wsPort = 3100

const wss = new WebSocketServer({port: wsPort})


wss.on('connection', function connection(ws) {
    console.log("Websocket del microbackend encendido")

    ws.send("Hola desde el MicroBackend")
  
    ws.on('message', function message(data) {
        console.log('Me active');
        ws.send("Imagen Lista")
        

    });
  });



/*
wss.addListener('imageReady', function connection(ws) {
    ws.send("La imagen esta Lista")
})
*/




app.listen(port, ()=>{console.log("Port is working")})


app.get('/image', (req, res) => {
        //wss.emit('connection')
        wss.clients.forEach((client)=>{ client.send("Imagen Disponible")})
        res.send('Active la Disponibilidad de la Imagen')
    })

    app.get('/', (req, res) => {
        res.send('Imagen a Procesar')
    })