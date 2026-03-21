import { Jugador } from './jugador.js';

export class NetworkedPlayer extends Jugador {
    constructor(gridX, gridY, nombre, mapa) {
        super(gridX, gridY, nombre, null);
        this.lastX = gridX;
        this.lastY = gridY;
        
    }

    actualizarDesdeRed(data) {
        this.gridX = data.gridX;
        this.gridY = data.gridY;
        this.estadoActual = data.anim;
    }

dibujar(ctx, camara) {
       // this.actualizarSuavizado();


        if(camara.estaMoviendose()){
         this.auxX = -Math.floor(camara.x); 
         this.auxY =   -Math.floor(camara.y); 
        }
        
        
        const screenX = Math.floor(this.x - camara.x) - this.auxX;
        const screenY = Math.floor(this.y - camara.y) - this.auxY;




        if(this.estadoActual.includes("WALK")){ //TO-DO: algun tipo de orden de finalización?
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