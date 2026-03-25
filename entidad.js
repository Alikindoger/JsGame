export class Entidad {
    constructor(gridX, gridY, ancho, alto, rutaImagen) {
        this.gridX = gridX;
        this.gridY = gridY;
        this.tileSize = 64; 


        
        this.x = this.gridX * this.tileSize;
        this.y = this.gridY * this.tileSize;
        

        this.targetX = this.x;
        this.targetY = this.y;

        this.lerpSpeed = 0.15; 
        this.moving = false;

        this.direccion = "ABAJO";
        
        this.ancho = ancho;
        this.alto = alto;
        
        this.imagen = new Image();
        this.imagen.src = rutaImagen;
        this.cargada = false;
        this.imagen.onload = () => { this.cargada = true; };
    }

    actualizarSuavizado() {

        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;

        if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
            this.x = this.targetX;
            this.y = this.targetY;
            this.moving = false;
        } else {

        if (Math.abs(dx) > Math.abs(dy) +0.1) {
            this.direccion = dx > 0 ? "DERECHA" : "IZQUIERDA";
        } else {
            this.direccion = dy > 0 ? "ABAJO" : "ARRIBA";
        }

            this.x += dx * this.lerpSpeed;
            this.y += dy * this.lerpSpeed;
            this.moving = true;
        }
    }

    moverDesdeRed(targetX,targetY){ //DEVUELVE LA CLAVE ANTERIOR
        let clave = null;
        if(this.targetX != targetX || this.targetY != targetY){
            clave = `${this.gridX},${this.gridY}`;
        }
        this.gridX = targetX;
        this.gridY = targetY;
        this.targetX = targetX * this.tileSize;
        this.targetY = targetY * this.tileSize;

        return clave;
    }

    

    dibujar(ctx, camara) {

        
    actualizarSuavizado();
        if (this.cargada) {
            ctx.drawImage(this.imagen, this.gridX * this.tileSize, this.gridY *this.tileSize, this.ancho, this.alto);
        } else {
            ctx.fillStyle = 'gray';
            ctx.fillRect(this.gridX * this.tileSize,  this.gridY *this.tileSize, this.ancho, this.alto);
        }
    }
}