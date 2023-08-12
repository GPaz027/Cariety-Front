import React from "react";
import "../styles/PredictionPage.css"
import { useEffect, useState } from "react";


export default function PredictionPage() {

    const URL_WEBSOCKET = "ws://localhost:3100/ws"
    const URL_PREDICCION = "http://127.0.0.1:3000/predict"

    const webSocket = new WebSocket(URL_WEBSOCKET);

    const [text, setText] = useState("Esperando al socket")
    const [image, setImage] = useState("https://es.vitejs.dev/logo.svg")

    useEffect(()=>{
        webSocket.onopen = () => { console.log("Websocket iniciado") }

        webSocket.onmessage = (event) => {
            console.log(event.data)
            setText(event.data)
            if (event.data === "Imagen Disponible"){
                getResult()
            }
        }
    }, [])

    const getResult = () => {
        console.log("buscando")
        fetch(URL_PREDICCION, { method: 'GET', headers: { 'Content-Type': 'application/json'}})
        .then(
            response => response.json()
            .then((r) => { 
                console.log(r)
                setText(r.base_64)
                setImage(r.base_64)
                console.log("Exito!")
            })
        )
    }
    return(
        <div className="container">
            <div className="text-container">
                {"Prediccion: "}
                <span className="prediction">{text}</span>
            </div>
            <div className="image-container">
                <img className="image" src={image}></img>
            </div>
        </div>
    )

}