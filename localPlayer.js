import { Jugador } from './jugador.js';
import { conn } from './conection.js';

export class LocalPlayer extends Jugador {
    actualizar(teclado, mapa) {
        if (Math.abs(this.x - this.gridX * this.tileSize) < 1) {
            let movido = false;
            let nX = this.gridX;
            let nY = this.gridY;

            if (teclado.isDown('ArrowUp')) { nY--; movido = true; }
            if (teclado.isDown('ArrowDown')) { nY++; movido = true; }

            if (movido && mapa.esAccesible(nX, nY)) {
                this.gridX = nX;
                this.gridY = nY;
                conn.enviar('movimiento', { gridX: nX, gridY: nY, anim: this.estadoActual });
            }
        }
    }
}