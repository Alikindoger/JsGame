import { Interactuable } from "./interactable.js";
export class Cofre extends Interactuable {
    constructor(x, y,dialogo) {
        super(x, y, 64, 64, "cofre_tesoro",dialogo);
        this.abierto = false;
    }

    interact() {
        if (!this.abierto) {
            this.abierto = true;
            console.log("¡Has encontrado una poción!");
            // Aquí cambiarías el frame de la animación del cofre a "abierto"
        }
    }

    dibujar(ctx) {
        ctx.fillStyle = this.abierto ? "gold" : "sienna";
        ctx.fillRect(this.x , this.y , this.ancho, this.alto);
    }
}