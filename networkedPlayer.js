import { Jugador } from './jugador.js';

export class NetworkedPlayer extends Jugador {
    constructor(gridX, gridY, nombre, sprite, anims, id) {
        super(gridX, gridY, nombre, sprite, anims);
        this.id = id;
    }

    actualizarDesdeRed(data) {
        this.gridX = data.gridX;
        this.gridY = data.gridY;
        this.estadoActual = data.anim;
    }
}