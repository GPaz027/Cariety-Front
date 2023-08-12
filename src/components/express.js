import express from "express";
import { WebSocketServer } from "ws";
import cors from "cors";


/* ------------------------------- DEFINICION DE VARIABLES -------------------------------*/
const app = express()
const expressPort = 3000

const wsPort = 3100
const wss = new WebSocketServer({port: wsPort})

let image = "Soy la Imagen"


/* ------------------------------- METODOS DEL WEBSOCKET -------------------------------*/
wss.on('connection', function connection(ws) {
    console.log("Websocket del microbackend encendido")

    ws.send("Hola desde el MicroBackend")
  
    ws.on('message', function message(data) {
        console.log('Me active');
        ws.send("Imagen Lista")
    });
});

/* ------------------------------- ENDPOINTS DE EXPRESS -------------------------------*/

app.use(cors({ origin: 'http://localhost:5173' }));

app.listen(expressPort, ()=>{console.log("Port is working")})


app.get('/image', (req, res) => {
    wss.clients.forEach((client)=>{ client.send("Imagen Disponible")})
    image = image + " I "
    res.send('Active la Disponibilidad de la Imagen')
})

app.get('/', (req, res) => {
    res.send('Imagen a Procesar')
})

app.get("/predict", (req, res)=>{
    res.send({"image": image})

})