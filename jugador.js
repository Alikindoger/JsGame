import { Entidad } from './entidad.js';
import { Animador } from './animador.js';

export class Jugador extends Entidad {
    constructor(x, y) {
        super(x, y, 64, 64, null);
        
        // Cargamos la hoja de sprites (ejemplo: cada frame es de 32x32)
        this.sprite = new Animador('./assets/idle_player.png', 16, 16);
        
        this.animaciones = {
            'IDLE_ABAJO':   { fila: 0, frames: 4, velocidad: 12 },
            'IDLE_ARRIBA':  { fila: 4, frames: 4, velocidad: 12 },
            'IDLE_IZQUIERDA': {fila:5, frames: 4, velocidad: 12},
            'IDLE_DERECHA':{fila:2, frames: 4, velocidad: 12}

        };

        this.estadoActual = 'IDLE_ABAJO';
        this.velocidad = 4;
        this.ultimaDireccion = 'ABAJO';
    }


    actualizar(teclas, canvas) {
        let moviendose = false;
        let nuevoEstado = 'ABAJO';

        if (teclas['w']) { this.y -= this.velocidad; nuevoEstado = 'ARRIBA'; moviendose = true; }
        else if (teclas['s']) { this.y += this.velocidad; nuevoEstado = 'ABAJO'; moviendose = true; }
        if (teclas['a']) { this.x -= this.velocidad; nuevoEstado = 'IZQUIERDA'; moviendose = true; }
        else if (teclas['d']) { this.x += this.velocidad; nuevoEstado = 'DERECHA'; moviendose = true; }

        if (moviendose) {
            this.estadoActual = 'IDLE_ARRIBA';
            this.ultimaDireccion = nuevoEstado;
        } else {
            this.estadoActual = 'IDLE_'+this.ultimaDireccion;
        }

        
        console.log(this.ultimaDireccion);
        
        const config = this.animaciones[this.estadoActual];
        this.sprite.actualizar(config.frames, config.velocidad);

        this.x = Math.max(0, Math.min(this.x, canvas.width - this.ancho));
        this.y = Math.max(0, Math.min(this.y, canvas.height - this.alto));
    }

    dibujar(ctx) {
        const anim = this.animaciones[this.estadoActual];
        this.sprite.dibujar(ctx, this.x, this.y, this.ancho, this.alto, anim.fila,2,4,true);
    }
}