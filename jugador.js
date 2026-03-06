import { Entidad } from './entidad.js';

export class Jugador extends Entidad {
    constructor(gridX, gridY, nombre, spriteSheet, animaciones) {
        // Pasamos los datos a Entidad (alto/ancho suelen ser 32)
        super(gridX, gridY, 32, 32, spriteSheet.src);
        
        this.nombre = nombre;
        this.sprite = spriteSheet; // Tu objeto Sprite
        this.animaciones = animaciones;
        this.estadoActual = 'idle';
    }

    // Sobrescribimos el dibujar de Entidad para usar tu sistema de Sprites
    dibujar(ctx, camara) {
        this.actualizarSuavizado();

        const screenX = Math.floor(this.x - camara.x);
        const screenY = Math.floor(this.y - camara.y);

        const anim = this.animaciones[this.estadoActual];
        
        // Usamos tu método de sprite con el offset de -13 que tenías
        this.sprite.dibujar(ctx, screenX - 13, screenY, this.ancho, this.alto, anim.fila, 2, 4, true);

        // Nombre del jugador
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(this.nombre, screenX + this.ancho/2, screenY - 5);
    }
}