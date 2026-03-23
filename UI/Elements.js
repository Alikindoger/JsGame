import { UIElement } from "./UIElement.js";

export class Panel extends UIElement {
    constructor(x, y, ancho, alto, color = 'rgba(185, 56, 56, 0.7)', rutaImg = null, onClick = null) {
        super(x, y, ancho, alto,onClick);
        this.color = color;
       
        this.img = new Image();
        this.img.src = rutaImg;
       
        this.cargada = false;
        if(this.img != null){
            this.img.onload = () => this.cargada = true;
        }
    }

    dibujar(ctx) {

        if(this.img == null){
        ctx.fillStyle = this.color;
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.fillRect(this.x, this.y, this.ancho, this.alto);
        ctx.strokeRect(this.x, this.y, this.ancho, this.alto);
        }else{
            ctx.drawImage(this.img, 152, 7,32,32,this.x, this.y, 128, 128);
        }
    }
}

export class Icon extends UIElement {
    constructor(x,y,ancho,alto,cropX,cropY,rutaImg){
        super(x,y,ancho,alto);

         this.img = new Image();
        this.img.src = rutaImg;
        
        this.cropX = cropX;
        this.cropY = cropY;

        this.cargada = false;
    }

    
    dibujar(ctx) {

        if(this.img != null){
            ctx.drawImage(this.img, this.cropX, this.cropY,16,16,this.x, this.y, this.ancho, this.alto);
        }
    }
}

export class Boton extends UIElement {
    constructor(x, y, ancho, alto, texto, onClick) {
        super(x, y, ancho, alto, onClick);
        this.texto = texto;
    }

    dibujar(ctx) {
        // Efecto visual de hover
        ctx.fillStyle = this.hover ? "#555" : "#222";
        ctx.strokeStyle = "white";
        ctx.fillRect(this.x, this.y, this.ancho, this.alto);
        ctx.strokeRect(this.x, this.y, this.ancho, this.alto);

        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "16px monospace";
        ctx.fillText(this.texto, this.x + this.ancho / 2, this.y + this.alto / 2);
    }
}