import express from "express";
import { WebSocketServer } from "ws";
import cors from "cors";
//import bodyParser from "bodyParser"


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
  
    //No sirve
    ws.on('message', function message(data) {
        console.log('Me active');
        ws.send("Imagen Lista")
    });
});

/* ------------------------------- ENDPOINTS DE EXPRESS -------------------------------*/

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json())

app.listen(expressPort, ()=>{console.log("Port is working")})

app.post('/image', (req, res) => {
    let request = req.body
    image = request.base_64

    wss.clients.forEach((client)=>{ client.send("Imagen Disponible")})
    res.send('Active la Disponibilidad de la Imagen')
})



app.get('/image', (req, res) => {
    wss.clients.forEach((client)=>{ client.send("Imagen Disponible")})
    image = image + " I "
    res.send('Active la Disponibilidad de la Imagen')
})

app.get('/', (req, res) => {
    res.send('Imagen a Procesar')
})

app.get("/predict", (req, res)=>{
    console.log(image)
    res.json({"base_64": image})

})