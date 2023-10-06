import express from "express";
import { WebSocketServer } from "ws";
import cors from "cors";

/* ------------------------------- DEFINICION DE VARIABLES -------------------------------*/
const app = express()
const expressPort = 3000

const wsPort = 8080
const wss = new WebSocketServer({port: wsPort, 'Access-Control-Allow-Origin': "*"})

let response = {"name": "Mi Nombre", "base_64": "Soy la Imagen", "label": "Ninguna", "prob": 0.0}


/* ------------------------------- METODOS DEL WEBSOCKET -------------------------------*/
wss.on('connection', function connection(ws) {
    console.log("Websocket del microbackend encendido")

    ws.send("N/A")
});

/* ------------------------------- ENDPOINTS DE EXPRESS -------------------------------*/

app.use(cors({ origin: 'http://20.231.67.81:5173' }));
app.use(express.json())

app.listen(expressPort, ()=>{console.log("Puerto funcionando")})

app.post('/image', (req, res) => {
    let request = req.body
    console.log(req.body)
    response.base_64 = request.base_64
    response.prob = request.prob
    response.name = request.name
    response.label = request.label


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