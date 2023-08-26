import express from "express";
import { WebSocketServer } from "ws";
import cors from "cors";

/* ------------------------------- DEFINICION DE VARIABLES -------------------------------*/
const app = express()
const expressPort = 3000

const wsPort = 3100
const wss = new WebSocketServer({port: wsPort})

let response = {"base_64": "Soy la Imagen", "prediction": "Ninguna"}


/* ------------------------------- METODOS DEL WEBSOCKET -------------------------------*/
wss.on('connection', function connection(ws) {
    console.log("Websocket del microbackend encendido")

    ws.send("Hola desde el MicroBackend")
});

/* ------------------------------- ENDPOINTS DE EXPRESS -------------------------------*/

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json())

app.listen(expressPort, ()=>{console.log("El puerto esta Funcionando")})

app.post('/image', (req, res) => {
    let request = req.body
    console.log(req.body)
    response.base_64 = request.base_64
    response.prediction = request.prediction

    wss.clients.forEach((client)=>{ client.send("Imagen Disponible")})
    res.send('Active la Disponibilidad de la Imagen')
})

app.get("/predict", (req, res)=>{
    res.json(response)
})

/* ------------------------------- ENDPOINTS DE PRUEBA -------------------------------*/
app.get('/image', (req, res) => {
    wss.clients.forEach((client)=>{ client.send("Imagen Disponible")})
    res.send('Active la Disponibilidad de la Imagen')
})

app.get('/', (req, res) => {
    res.send('Imagen a Procesar')
})