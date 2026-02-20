export class Entidad {
    constructor(x, y, ancho, alto, rutaImagen) {
        this.x = x;
        this.y = y;
        this.ancho = ancho;
        this.alto = alto;
        
        
        this.imagen = new Image();
        this.imagen.src = rutaImagen;
        this.cargada = false;

        
        this.imagen.onload = () => {
            this.cargada = true;
        };
    }

    dibujar(ctx) {
        if (this.cargada) {
            ctx.drawImage(this.imagen, this.x, this.y, this.ancho, this.alto);
        } else {
            
            ctx.fillStyle = 'gray';
            ctx.fillRect(this.x, this.y, this.ancho, this.alto);
        }
    }
}