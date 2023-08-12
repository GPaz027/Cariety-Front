import React from "react";
import { useEffect, useState } from "react";

export default function Main() {

    const URL = "ws://localhost:3100/ws"

    const URL_PREDICCION = "http://127.0.0.1:3000/predict"

    const webSocket = new WebSocket(URL);

    const [text, setText] = useState("Esperando al socket")
    const [image, setImage] = useState("https://es.vitejs.dev/logo.svg")
    const [n, setN] = useState(0) 

    useEffect(()=>{
        webSocket.onopen = (event) => { console.log("Websocket iniciado") }

        webSocket.onmessage = (event) => {
            console.log(event.data)
            setText(event.data)
            if (event.data === "Imagen Disponible"){
                getResult()
            }
        }

    }, [])

    //webSocket.onopen = (event) =>{console.log("Websocket iniciado")}

    /*
    webSocket.onmessage = (event) => {
        console.log(event.data)
        setText(event.data)
    }
    */

    const click = ()=>{ setText("El valor es " + n); setN(n+1); getResult() }

    const getResult = () => {
        console.log("buscando")
        fetch(URL_PREDICCION, {
            method: 'GET', 
            headers: {
              'Content-Type': 'application/json'
            },
            //body: JSON.stringify(data) 
          }).then(response => response.json().then((r) => {
            setText(r.image)
            console.log("Exito!")
          }))
    }


    return(
        <>
            {text}
            {n}
            <img src={image} ></img>
            <button onClick={click}>Apreta aca</button>
        </>
    )

}