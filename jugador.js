import { Entidad } from './entidad.js';
import { Animador } from './animador.js';

export class Jugador extends Entidad {
    constructor(x, y,mapa,debug = false) {
        super(x, y, 64, 64, null);

        this.hitBoxX = 64;
        this.hitBoxY = 64;

        this.mapa = mapa;
        this.IdleAnimator = new Animador('./assets/idle_player.png',16,16);
        this.WalkAnimator = new Animador('./assets/walk_player.png',16,16);

        this.sprite = new Animador('./assets/idle_player.png', 16, 16);
        
        this.animaciones = {
            'IDLE_ABAJO':   { fila: 0, frames: 4, velocidad: 12 },
            'IDLE_ARRIBA':  { fila: 4, frames: 4, velocidad: 12 },
            'IDLE_IZQUIERDA': {fila:5, frames: 4, velocidad: 12},
            'IDLE_DERECHA':{fila:2, frames: 4, velocidad: 12},

            'WALK_ABAJO':   { fila: 0, frames: 4, velocidad: 12 },
            'WALK_ARRIBA':  { fila: 4, frames: 4, velocidad: 12 },
            'WALK_IZQUIERDA': {fila:5, frames: 4, velocidad: 12},
            'WALK_DERECHA':{fila:2, frames: 4, velocidad: 12}

        };
        this.debug = debug;

        this.estadoActual = 'IDLE_ABAJO';
        this.velocidad = 4;
        this.ultimaDireccion = 'ABAJO';

        this.auxX = 0;
        this.auxY = 0;
    }


    actualizar(teclas, canvas) {
        let moviendose = false;
        let nuevoEstado = 'ABAJO';

        let movY = 0;
        let movX = 0;

        if (teclas['w']) { movY -= this.velocidad; nuevoEstado = 'ARRIBA'; moviendose = true; }
        else if (teclas['s']) { movY += this.velocidad; nuevoEstado = 'ABAJO'; moviendose = true; }
        if (teclas['a']) { movX -= this.velocidad; nuevoEstado = 'IZQUIERDA'; moviendose = true; }
        else if (teclas['d']) { movX += this.velocidad; nuevoEstado = 'DERECHA'; moviendose = true; }

        
        if (!this.mapa.esSolido(this.x + movX, this.y, this.ancho, this.alto)) {

            
            this.x += movX;
        }

        if (!this.mapa.esSolido(this.x, this.y + movY, this.hitBoxX, this.hitBoxY)) {
            
            
            this.y += movY;
        }

  
        if (moviendose) {
            this.estadoActual = 'WALK_'+nuevoEstado;
            this.ultimaDireccion = nuevoEstado;
            this.swapAnimator(this.WalkAnimator);
        } else {
            this.swapAnimator(this.IdleAnimator);
            this.estadoActual = 'IDLE_'+this.ultimaDireccion;
        }

        
        const config = this.animaciones[this.estadoActual];
        this.sprite.actualizar(config.frames, config.velocidad);

        this.x = Math.max(0, Math.min(this.x, canvas.width - this.ancho - this.auxX));
        this.y = Math.max(0, Math.min(this.y, canvas.height - this.alto - this.auxY));
    }

    swapAnimator(anim){
        if(anim != this.sprite){
            this.sprite = anim;
            this.sprite.frameActual = 0;
        }
    }

    dibujar(ctx,camara) {
 

        if(camara.estaMoviendose()){
         this.auxX = -Math.floor(camara.x); 
         this.auxY =   -Math.floor(camara.y); 
        }


        const anim = this.animaciones[this.estadoActual];
        this.sprite.dibujar(ctx, this.x - 6, this.y, this.ancho, this.alto, anim.fila,2,4,true);
        
        if(this.debug){
        ctx.strokeStyle = "red";
        ctx.strokeRect(this.x, this.y, this.ancho, this.alto);
        ctx.fillStyle = "white";
        ctx.fillRect(this.x, this.y, 4, 4);
        }

    }
}