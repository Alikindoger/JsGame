import { Entidad } from './entidad.js';
import { MasterAnimador } from './masterAnimator.js';

export class Jugador extends Entidad {
    constructor(gridX, gridY, nombre, mapa) {
        super(gridX, gridY, 64, 64, null);
        
        this.mapa = mapa;
        this.nombre = nombre;
        this.estadoActual = 'IDLE_ABAJO';
        this.velocidad = 4;

        this.x = gridX;
        this.y = gridY;

        this.hitBoxX = 62;
        this.hitBoxY = 62;

        this.estadoActual = "IDLE_ABAJO";
        this.ultimaDireccion = "ABAJO";

                
                this.animaciones = {
                    'IDLE_ABAJO':   { fila: 0, frames: 4, velocidad: 12, sprite: "IDLE" },
                    'IDLE_ARRIBA':  { fila: 4, frames: 4, velocidad: 12, sprite: "IDLE" },
                    'IDLE_IZQUIERDA': {fila:5, frames: 4, velocidad: 12, sprite: "IDLE"},
                    'IDLE_DERECHA':{fila:2, frames: 4, velocidad: 12, sprite: "IDLE"},
        
                    'WALK_ABAJO':   { fila: 0, frames: 4, velocidad: 12, sprite: "WALK" },
                    'WALK_ARRIBA':  { fila: 4, frames: 4, velocidad: 12, sprite: "WALK" },
                    'WALK_IZQUIERDA': {fila:5, frames: 4, velocidad: 12, sprite: "WALK"},
                    'WALK_DERECHA':{fila:2, frames: 4, velocidad: 12, sprite: "WALK"},

                    'INTERACT_ABAJO':   { fila: 0, frames: 4, velocidad: 12, sprite: "INTERACT"},
                    'INTERACT_ARRIBA':  { fila: 4, frames: 4, velocidad: 12, sprite: "INTERACT" },
                    'INTERACT_IZQUIERDA': {fila:3, frames: 4, velocidad: 12, sprite: "INTERACT"},
                    'INTERACT_DERECHA':{fila:3, frames: 4, velocidad: 12, sprite: "INTERACT"}
        
                };

                this.spriteLibrary = {
                    'IDLE': './assets/idle_player.png',
                    'WALK': './assets/walk_player.png',
                    'INTERACT': './assets/interact_player.png'
                };

                this.masterAnim = new MasterAnimador(this.spriteLibrary,this.animaciones,16,16);

                    this.input = {
            pressed: {},  // Teclas que están bajadas actualmente
            justPressed: {} // Teclas que se acaban de pulsar en este instante
        };
        window.addEventListener("keydown", (e) => {
            const key = e.key.toLowerCase();
            // Si la tecla no estaba ya pulsada, significa que se acaba de pulsar ahora
            if (!this.input.pressed[key]) {
                this.input.justPressed[key] = true;
            }
            this.input.pressed[key] = true;
        });

        window.addEventListener("keyup", (e) => {
            const key = e.key.toLowerCase();
            this.input.pressed[key] = false;
            this.input.justPressed[key] = false;
});
    }

    actualizar(teclas,canvas,deltaTime){
        this.masterAnim.actualizar(deltaTime);

    }


    dibujar(ctx, camara) {
       // this.actualizarSuavizado();


        if(camara.estaMoviendose()){
         this.auxX = -Math.floor(camara.x); 
         this.auxY =   -Math.floor(camara.y); 
        }
        
        const screenX = Math.floor(this.x - camara.x) - this.auxX;
        const screenY = Math.floor(this.y - camara.y) - this.auxY;

        

        this.masterAnim.dibujar(ctx,screenX -13,screenY);
        
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(this.nombre, screenX + this.ancho/2 - 4, screenY - 5);
        
    }

}