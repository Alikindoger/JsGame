export class Interfaz {
    constructor() {
        this.padding = 10;
        this.fontSize = 14;
    }

    dibujar(ctx, camara, jugador) {
        const obj = jugador.objetoEnfocado;

        // Solo dibujamos si hay un objeto con diálogo
        if (obj) {
            this._dibujarBocadillo(ctx, camara, obj);
        }
    }

    _dibujarBocadillo(ctx, camara, obj) {
        ctx.font = `bold ${this.fontSize}px Arial`;
        const texto = "Hola";
        const metrica = ctx.measureText(texto);
        
        const anchoCaja = metrica.width + (this.padding * 2);
        const altoCaja = this.fontSize + (this.padding * 1.5);


        const xEnPantalla = (obj.x - camara.x) + (obj.ancho / 2) - (anchoCaja / 2);
        const yEnPantalla = (obj.y - camara.y) - altoCaja - 12; // 12px de margen hacia arriba

        // --- DIBUJO ---
        
        // 1. Fondo (Caja redondeada)
        ctx.fillStyle = "rgba(0, 0, 0, 0.85)";
        this._roundRect(ctx, xEnPantalla, yEnPantalla, anchoCaja, altoCaja, 6);
        ctx.fill();

        // 2. Texto
        ctx.fillStyle = "white";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText(texto, xEnPantalla + this.padding, yEnPantalla + (this.padding / 2));

        // 3. Pico del bocadillo (Triangulito)
        const picoX = (obj.x - camara.x) + (obj.ancho / 2);
        const picoY = yEnPantalla + altoCaja;
        
        ctx.beginPath();
        ctx.moveTo(picoX - 6, picoY);
        ctx.lineTo(picoX + 6, picoY);
        ctx.lineTo(picoX, picoY + 8);
        ctx.fill();
    }

    _roundRect(ctx, x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.closePath();
    }
}