// src/Conexion.js
import { NetworkedPlayer } from "./networkedPlayer.js";
import { Estado } from "./game.js";
class Conection {
    constructor() {
        this.url = 'ws://localhost:8080';
        this.socket = null;
        this.eventos = {};
        this.players = {};
        this.conectado = false;
        this.nombre = "";
        this.miIDLocal = null;
        
    }

    conectar() {
        
    conn.on("BIENVENIDA", (data) => {
        console.log("Servidor nos ha reconocido. ID asignado:", data.id);
        

        this.miIDLocal = data.id;

        Estado.textoCarga.innerText = "¡Mundo sincronizado!";
        setTimeout(() => {
            Estado.pantalla.style.display = "none";
            Estado.juegoIniciado = true;
        }, 500);
    });


    this.on("INTERACCION", (data) => {
    console.log("Activando bocadillo con el texto: " + data.texto);
    });

    this.on("abierto", () => {
        conn.enviar("NUEVO_JUGADOR", {
        nombre: "Jugador_" + this.nombre
        });
    });

    conn.on("NUEVO_JUGADOR", (data) => {

    if (data.id === this.miIDLocal) return;

    conn.on("MOVIMIENTO", (data) => {
    const p = this.players[data.id];
    if (p) {
        p.x = data.x;
        p.y = data.y;
        p.estadoActual = data.estadoActual;
        }
    });
    this.players[data.id] = new NetworkedPlayer(
        192+64,128*4, 
        data.nombre,
        null
        );        
    });

    conn.on("desconectado", () => {
        Estado.pantalla.style.display = "flex";
        Estado.textoCarga.innerText = "Conexión perdida. Reintentando...";
        Estado.juegoIniciado = false;
    });



        if (this.socket) return; 
        this.socket = new WebSocket(this.url);
        this.socket.onopen = () => {
            this.conectado = true;
            console.log("primer");
            
            this.nombre = Math.floor(Math.random() * 1000);
            console.log("Conectado al servidor");
            this.eventos["abierto"]();
        };

        this.socket.onmessage = (event) => {

            console.log(event.data);
            
            const data = JSON.parse(event.data);
            
            if (this.eventos[data.tipo]) {

                this.eventos[data.tipo](data);
            }
        };

        this.socket.onclose = () => {
            this.conectado = false;
            console.warn("Conexión perdida con el servidor");
        };

    }
    
    //para configurar los protocolos
    on(tipo, callback) {
        
        this.eventos[tipo] = callback;
    }

    enviar(tipo, datos = {}) {
        if (this.conectado && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify({ tipo, ...datos }));
        }
    }
}

export const conn = new Conection();