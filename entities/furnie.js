import { Entidad } from './entidad.js';
import {CATALOGO_MUEBLES} from './furnieData.js';

export class Furnie extends Entidad {
    constructor(id, gx, gy, furnieId, source=null) { //furnieID marcará la skin
        super(gx, gy, 64,64,null,id);
        
        
        const data = CATALOGO_MUEBLES[furnieId];

        this.gx = gx;
        this.gy = gy;     
        
        this.sx = data.sx;
        this.sy = data.sy;


        this.furnieId = furnieId;

        this.spriteSheet = new Image();
        this.spriteSheet.src = "../assets/furnies1.png";
        this.cargada = false;
        this.spriteSheet.onload = () => this.cargada = true; //mejor instanciar fuera qeu crear ruta, mover a FactoriaEntidades

        data.tags.forEach(tag => this.tags.add(tag));   //añadimos los tags     

        this.anchoFrame = 16;
        this.altoFrame = 16;
        
        this.tags.add("obstaculo");
    }


    actualizar(deltaTime) { //anims
    }

    dibujar(ctx) {
        
        ctx.drawImage(
            this.spriteSheet,
            this.sx, this.sy, this.anchoFrame, this.altoFrame,
            this.gx * 64, this.gy * 64, 64, 64
        );
    }
}