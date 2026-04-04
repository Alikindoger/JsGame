import { Jugador } from './jugador.js';
import { conn } from './conection.js';
import { Estado, mapa, efectos } from "./game.js";

export class LocalPlayer extends Jugador {

    constructor(gridX, gridY, nombre, mapa) {
        super(gridX,gridY,nombre,mapa)

        this.checkX = 0;
        this.checkY = 0;

    }

actualizar(teclas, canvas,deltaTime) {
        super.actualizar(teclas,canvas,deltaTime);
        let moviendose = false;
        let nuevaDir = this.ultimaDireccion;
    
        
        let movY = 0;
        let movX = 0;

        if (teclas.has('w')) { movY -= this.velocidad; nuevaDir = 'ARRIBA'; moviendose = true; }
        else if (teclas.has('s')) { movY += this.velocidad; nuevaDir = 'ABAJO'; moviendose = true; }
        
        if (teclas.has("a")) { movX -= this.velocidad; nuevaDir = 'IZQUIERDA'; moviendose = true; }
        else if (teclas.has('d')) { movX += this.velocidad; nuevaDir = 'DERECHA'; moviendose = true; }

        
        this.updateCheckers();
        
        const entidad =  this.getEntity(this.getFocus());

        if (this.input.justPressed['e']) {
            this.interact();          
              
            this.input.justPressed['e'] = false;
        }       

        if (!this.mapa.esSolido(this.x + movX, this.y, this.hitBoxX, this.hitBoxY) && !(entidad && entidad.tags.has("obstaculo"))) {
   
            this.x += movX;
        }
        if (!this.mapa.esSolido(this.x, this.y + movY, this.hitBoxX, this.hitBoxY) && !(entidad && entidad.tags.has("obstaculo"))) {
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

        
        this.objetoEnfocado = this.mapa.obtenerObjeto(this.checkX, this.checkY);

        if (moviendose) {
            this.estadoActual = 'WALK_' + nuevaDir;
            this.ultimaDireccion = nuevaDir;
            this.masterAnim.solicitarCambio(this.estadoActual,175);
        } else {
            this.estadoActual = 'IDLE_' + this.ultimaDireccion;
            this.masterAnim.solicitarCambio(this.estadoActual);
        }
  
    }

    updateCheckers(){
        if(this.estadoActual.includes("ABAJO")){
            this.checkX = this.gridX;
            this.checkY = Math.floor((this.y + 64 + 1) / 64);
            
        }
        else if(this.estadoActual.includes("ARRIBA")){
            this.checkX = this.gridX;
            this.checkY = Math.floor((this.y - 1) / 64);
        }
        else if(this.estadoActual.includes("DERECHA")){
            this.checkX = Math.floor((this.x + 64 - 1) / this.tileSize);
            this.checkY = this.gridY;
        }
        else if(this.estadoActual.includes("IZQUIERDA")){
            this.checkX = Math.floor((this.x - 1) / this.tileSize);
            this.checkY = this.gridY;
        }
    }


    getFocus(){
        return `${this.checkX},${this.checkY}`;
    }

    getEntity_(checkX,checkY){
        let clave = `${checkX},${checkY}`;

        return Estado.listaEntidades[clave];
    }

    getEntity(clave){
        return Estado.listaEntidades[clave];
    }

    interact(){        

        let ent = this.getEntity_(this.checkX,this.checkY);        
        
        this.masterAnim.solicitarCambio("INTERACT_"+this.ultimaDireccion,50);

        efectos.crearEfectoCasilla(this.checkX, this.checkY, "#f12d0f");

        if(ent != null && ent.tags.has("damagable")){
            conn.enviar("ENTITY_ATTACK",{
                id : ent.id
            });
        }
        
        let objeto = (this.mapa.obtenerObjeto(this.checkX,this.checkY));
        if(objeto != null && objeto.canInteract) objeto.interact();

    }

    dibujar(ctx,camara){
        super.dibujar(ctx,camara);
        ctx.strokeStyle = "red";
        ctx.strokeRect(this.checkX * 64, this.checkY * 64, 64, 64);

    }

}