import React from "react";
import "../styles/PredictionPage.css";
import { useEffect, useState } from "react";
import Logo from "../assets/Logo_Cariety.png";

export default function PredictionPage() {
  const url_socket = "ws://20.231.67.81:8080";
  const URL_PREDICCION = "http:///20.231.67.81:3000/predict";

  const webSocket = new WebSocket(url_socket);
  const [text, setText] = useState("Esperando al socket");
  const [prob, setProb] = useState(0);
  const [image, setImage] = useState(Logo);

  useEffect(() => {
    webSocket.onopen = () => {
      console.log("Websocket iniciado");
    };

    webSocket.onmessage = (event) => {
      console.log(event.data);
      setText(event.data);
      if (event.data === "Imagen Disponible") {
        getResult();
      }
    };
  }, []);

  const getResult = () => {
    console.log("buscando");
    fetch(URL_PREDICCION, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then((response) =>
      response.json().then((r) => {
        console.log(r);
        setText(r.label);
        setImage(r.base_64);
        setProb(r.prob);
        console.log("Exito!");
      })
    );
  };
  return (
    <div className="container">
      <div className="text-container">
        <span className="span-pred">
          Predicción:{" "}
          {text != "good" && text != "bad"
            ? text
            : text == "good"
            ? "Buena"
            : "Mala"}
        </span>
        <div className="prob">
          <span className="span-prob">
            Certeza: {(prob * 100).toFixed(0) + "%"}
          </span>
        </div>
      </div>
      <div className="image-container">
        <img className="image" src={image}></img>
      </div>
    </div>
  );
}
