import { Entidad } from "../entidad.js";
import {Animador} from "../animador.js";


export class Slime extends Entidad{
    
    constructor(gridX,gridY,ancho,alto,id){
        super(gridX,gridY,ancho,alto,null,id);

        this.tags.add("damagable");

        this.estadoActual = "IDLE_ABAJO";
        this.ultimaDireccion = "ABAJO";

        this.IdleAnimator = new Animador('./assets/gslime_idle.png',64,64);
        this.WalkAnimator = new Animador('./assets/gslime_run.png',64,64);
                
        this.sprite = this.IdleAnimator;
                        
                        this.animaciones = {
                            'IDLE_ABAJO':   { fila: 0, frames: 6, velocidad: 16 },
                            'IDLE_ARRIBA':  { fila: 1, frames: 6, velocidad: 16 },
                            'IDLE_IZQUIERDA': {fila:2, frames: 6, velocidad: 16},
                            'IDLE_DERECHA':{fila:3, frames: 6, velocidad: 16},
                
                            'WALK_ABAJO':   { fila: 0, frames: 8, velocidad: 4.5 },
                            'WALK_ARRIBA':  { fila: 1, frames: 8, velocidad: 4.5 },
                            'WALK_IZQUIERDA': {fila:2, frames: 8, velocidad: 4.5},
                            'WALK_DERECHA': {fila:3, frames: 8, velocidad: 4.5}
                        };

        this.hp = 50;
        this.maxHp = 50;
    }
    
    swapAnimator(anim){
        if(anim != this.sprite){
            this.sprite = anim;
            this.sprite.frameActual = 0;
        }
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
            this.swapAnimator(this.WalkAnimator);
        } else {
            this.swapAnimator(this.IdleAnimator);
        }

        const anim = this.animaciones[this.estadoActual];
        
        this.sprite.dibujar(ctx,this.x,this.y,128,128,anim.fila,0,0,false);

        const config = this.animaciones[this.estadoActual];
        this.sprite.actualizar(config.frames, config.velocidad);
        this.dibujarBarraVida(ctx);
    }

    dibujarBarraVida(ctx) {
    if (this.hp === undefined) return;

    const anchoBarra = 50;
    const altoBarra = 6;
    const x = this.x + 40;
    const y = this.y + 84;

    // BG
    ctx.fillStyle = "black";
    ctx.fillRect(x, y, anchoBarra, altoBarra);

    // FILL
    const porcentaje = this.hp / this.maxHp;
    ctx.fillStyle = porcentaje > 0.3 ? "#2ecc71" : "#e74c3c";
    ctx.fillRect(x, y, anchoBarra * porcentaje, altoBarra);
    }

}