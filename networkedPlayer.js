import { Jugador } from './jugador.js';

export class NetworkedPlayer extends Jugador {
    constructor(gridX, gridY, nombre, mapa) {
        super(gridX, gridY, nombre, null);
        this.lastX = gridX;
        this.lastY = gridY;
        

        this.targetX = this.x;
        this.targetY = this.y;

        this.lerpSpeed = 0.15; // Velocidad de suavizado (0.1 a 0.2 es ideal)
        this.moving = false;

        this.estadoActual = "IDLE_ABAJO";
    }

    actualizarDesdeRed(data) {
        this.targetX = data.x;
        this.targetY = data.y;
        this.estadoActual = data.estadoActual;
    }

    actualizarSuavizado() {

        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;

        if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
            this.x = this.targetX;
            this.y = this.targetY;
            this.moving = false;
        } else {
            this.x += dx * this.lerpSpeed;
            this.y += dy * this.lerpSpeed;
            this.moving = true;
        }
    }

dibujar(ctx, camara) {
        this.actualizarSuavizado();


        if(camara.estaMoviendose()){
         this.auxX = -Math.floor(camara.x); 
         this.auxY =   -Math.floor(camara.y); 
        }
        
        
        const screenX = Math.floor(this.x - camara.x) - this.auxX;
        const screenY = Math.floor(this.y - camara.y) - this.auxY;


        if(!this.moving){

            this.estadoActual = this.estadoActual.replace("WALK","IDLE");
            
        }

       
        
        if(this.estadoActual.includes("WALK")){
            this.swapAnimator(this.WalkAnimator);
        } else {
            
            this.swapAnimator(this.IdleAnimator);
        }

        const anim = this.animaciones[this.estadoActual];
        

        this.sprite.dibujar(ctx, screenX - 13, screenY, this.ancho, this.alto, anim.fila, 2, 4, true);
        const config = this.animaciones[this.estadoActual];
        this.sprite.actualizar(config.frames, config.velocidad);

        this.lastX = this.x;
        this.lastY = this.y;

        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(this.nombre, screenX + this.ancho/2 - 4, screenY - 5);
    }

}