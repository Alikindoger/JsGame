// src/Conexion.js
class Conection {
    constructor() {
        this.url = 'ws://localhost:8080';
        this.socket = null;
        this.eventos = {};
        this.players = {};
        this.conectado = false;
        this.nombre = "";
    }

    conectar() {
        

        this.on("INTERACCION", (data) => {
    console.log("Activando bocadillo con el texto: " + data.texto);
    });

        this.on("abierto", () => {
            conn.enviar("NUEVO_JUGADOR", {
              nombre: "Jugador_" + this.nombre
            });

    });

    conn.on("NUEVO_JUGADOR", (data) => {
    if (data.id === miIDLocal) return;


    // Creamos la instancia y la guardamos en el diccionario
    otrosJugadores[data.id] = new NetworkedPlayer(
        data.gridX, 
        data.gridY, 
        data.nombre, 
        spriteSheetCompartida, 
        animacionesGlobales, 
        data.id
        );
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