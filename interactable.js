export class Interactuable {
    constructor(x, y, ancho, alto, id) {
        this.x = x;
        this.y = y;
        this.ancho = ancho;
        this.alto = alto;
        this.id = id;
        this.rangoInteraccion = 10; // Píxeles extra de margen para detectar al jugador
    }

    interact() {
        console.log("Interacción base: Este objeto no hace nada todavía.");
    }
}