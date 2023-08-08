import { useEffect, useState } from "react";



export default function Main() {

    const URL = "ws://localhost:8000/ws"

    const webSocket = new WebSocket(URL);

    webSocket.onopen = (event) =>{console.log("Websocket iniciado")}

    webSocket.onmessage = (event) => {console.log(event.data); setText(event.data)}

    const [text, setText] = useState("Esperando al socket")



    return(
        <>
            {text}
        </>
    )

}