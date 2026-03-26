import { Jugador } from './jugador.js';
import { conn } from './conection.js';
import { Estado, mapa } from "./game.js";

export class LocalPlayer extends Jugador {

    constructor(gridX, gridY, nombre, mapa) {
        super(gridX,gridY,nombre,mapa)

        this.checkX = 0;
        this.checkY = 0;

    }

actualizar(teclas, canvas) {
        let moviendose = false;
        let nuevaDir = this.ultimaDireccion;

        let movY = 0;
        let movX = 0;

        if (teclas['w']) { movY -= this.velocidad; nuevaDir = 'ARRIBA'; moviendose = true; }
        else if (teclas['s']) { movY += this.velocidad; nuevaDir = 'ABAJO'; moviendose = true; }
        
        if (teclas['a']) { movX -= this.velocidad; nuevaDir = 'IZQUIERDA'; moviendose = true; }
        else if (teclas['d']) { movX += this.velocidad; nuevaDir = 'DERECHA'; moviendose = true; }

        
        if (this.input.justPressed['e']) {
            this.interact();          
              
            this.input.justPressed['e'] = false;
        }

        if (!this.mapa.esSolido(this.x + movX, this.y, this.hitBoxX, this.hitBoxY)) {
            this.x += movX;
        }
        if (!this.mapa.esSolido(this.x, this.y + movY, this.hitBoxX, this.hitBoxY)) {
            this.y += movY;
        }

        this.gridX = Math.round(this.x/64);
        this.gridY = Math.round(this.y/64);
        
        if(moviendose){
            conn.enviar("MOVIMIENTO",{
                x : this.x,
                y : this.y,
                estadoActual : this.estadoActual
            });
        }


                let frenteX = this.x + this.ancho / 2;
        let frenteY = this.y + this.alto / 2;
        const distanciaCheck = 32;

        if(this.estadoActual.includes("IDLE_ABAJO")){
            frenteY += 70;
        }
        if(this.estadoActual.includes("IDLE_ARRIBA")){
            frenteY -= 70;
        }
        if(this.estadoActual.includes("IDLE_DERECHA")){
            frenteX += 70;
        }
        if(this.estadoActual.includes("IDLE_IZQUIERDA")){
            frenteX -= 70;
        }
        
        this.objetoEnfocado = this.mapa.obtenerObjetoEnPixeles(frenteX, frenteY);

        if (moviendose) {
            this.estadoActual = 'WALK_' + nuevaDir;
            this.ultimaDireccion = nuevaDir;
            this.swapAnimator(this.WalkAnimator);
        } else {
            this.estadoActual = 'IDLE_' + this.ultimaDireccion;
            this.swapAnimator(this.IdleAnimator);
        }
     
   
    }

    getFocus(){
        return `${this.checkX},${this.checkY}`;
    }

    getEntity(checkX,checkY){
        let clave = `${checkX},${checkY}`;        

        return Estado.listaEntidades[clave];
    }

    interact(){


        if(this.estadoActual.includes("ABAJO")){
            this.checkX = this.gridX;
            this.checkY = this.gridY +1;
        }
        else if(this.estadoActual.includes("ARRIBA")){
            this.checkX = this.gridX;
            this.checkY = this.gridY -1;
        }
        else if(this.estadoActual.includes("DERECHA")){
            this.checkX = this.gridX + 1;
            this.checkY = this.gridY;
        }
        else if(this.estadoActual.includes("IZQUIERDA")){
            this.checkX = this.gridX - 1;
            this.checkY = this.gridY;
        }
        

        let ent = this.getEntity(this.checkX,this.checkY);
        

        if(ent != null && ent.tags.has("damagable")){
            conn.enviar("ENTITY_ATTACK",{
                id : ent.id
            });
        }
        
        let objeto = (this.mapa.obtenerObjetoEnPixeles(this.checkX,this.checkY)); //esto no funciona checkX y checkY son ahora rows
        if(objeto != null && objeto.canInteract) objeto.interact();

    }

    dibujar(ctx,camara){
        super.dibujar(ctx,camara);
        ctx.strokeStyle = "red";
        ctx.strokeRect(this.checkX * 64, this.checkY * 64, 64, 64);
    }

}