import { Entidad } from "../entidad.js";
import {MasterAnimador} from "../masterAnimator.js";

export class Slime extends Entidad{
    
    constructor(gridX,gridY,ancho,alto,id){
        super(gridX,gridY,ancho,alto,null,id);

        this.tags.add("damagable");

        this.estadoActual = "IDLE_ABAJO";
        this.ultimaDireccion = "ABAJO";


         this.animaciones = {
                            'IDLE_ABAJO':   { fila: 0, frames: 6, velocidad: 16, sprite: "IDLE" },
                            'IDLE_ARRIBA':  { fila: 1, frames: 6, velocidad: 16, sprite: "IDLE" },
                            'IDLE_IZQUIERDA': {fila:2, frames: 6, velocidad: 16, sprite: "IDLE"},
                            'IDLE_DERECHA':{fila:3, frames: 6, velocidad: 16, sprite: "IDLE"},
                
                            'WALK_ABAJO':   { fila: 0, frames: 8, velocidad: 4.5, sprite: "WALK" },
                            'WALK_ARRIBA':  { fila: 1, frames: 8, velocidad: 4.5, sprite: "WALK" },
                            'WALK_IZQUIERDA': {fila:2, frames: 8, velocidad: 4.5, sprite: "WALK"},
                            'WALK_DERECHA': {fila:3, frames: 8, velocidad: 4.5, sprite: "WALK"}
                        };

            this.spriteLibrary = {
                    'IDLE': './assets/gslime_idle.png',
                    'WALK': './assets/gslime_run.png'
                };

        this.masterAnim = new MasterAnimador(this.spriteLibrary,this.animaciones,64,64,128,128);

        this.hp = 50;
        this.maxHp = 50;
    }
    

    updateAnimation(){
        if(this.moving){
            
            this.estadoActual = "WALK_";

            this.estadoActual += this.direccion;

        }else{

            this.estadoActual = "IDLE_";

            this.estadoActual += this.direccion;
        }

        
    }

    readCombatData(data) {
    this.hp = data.hp;
    this.maxHp = data.maxHp;
    }

    dibujar(ctx, camara) {
        this.actualizarSuavizado();
        this.updateAnimation();

        if(this.estadoActual.includes("WALK")){
            this.masterAnim.solicitarCambio(this.estadoActual);
        } else {
            this.masterAnim.solicitarCambio(this.estadoActual);
        }

        this.masterAnim.dibujar(ctx,this.x -32,this.y-16);
        this.dibujarBarraVida(ctx);
    }

    dibujarBarraVida(ctx) {
    if (this.hp === undefined) return;

    const anchoBarra = 50;
    const altoBarra = 6;
    const x = this.x ;
    const y = this.y + 64;

    // BG
    ctx.fillStyle = "black";
    ctx.fillRect(x, y, anchoBarra, altoBarra);

    // FILL
    const porcentaje = this.hp / this.maxHp;
    ctx.fillStyle = porcentaje > 0.3 ? "#2ecc71" : "#e74c3c";
    ctx.fillRect(x, y, anchoBarra * porcentaje, altoBarra);
    }

}