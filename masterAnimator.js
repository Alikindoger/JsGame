export class MasterAnimador{
    constructor(assets, mapAnims, frameW, frameH, finalW = 64,finalH=64) {
        this.assets = assets;
        this.images = {};
        this.mapAnims = mapAnims; // { "IDLE": { row: 0, frames: 4 }, ... }
        
        this.finalW = finalW;
        this.finalH = finalH;
        this.frameW = frameW;
        this.frameH = frameH;

        this.currentAnim = "IDLE_ABAJO";
        this.currentFrame = 0;
        this.msPerFrame = 100; // 10 FPS por defecto
        this.acumuladoTime = 0;

        // --- NUEVO: SISTEMA DE BLOQUEO ---
        this.estaBloqueada = false; // Indica si la animación actual DEBE terminar
        
        // Definimos qué animaciones NO se pueden cortar
        this.animacionesIninterrumpibles = new Set(["INTERACT_ABAJO", "INTERACT_ARRIBA", "INTERACT_DERECHA", "INTERACT_IZQUIERDA"]);

        for (let estado in assets) {
                    this.imagen = new Image();
                    this.imagen.src = this.assets[estado];
                    this.images[estado] = this.imagen;
        }   

    }

    solicitarCambio(nuevaAnim, msPorFrame = 250) {
        if (this.estaBloqueada) {
            return false;
        }

        if (this.currentAnim === nuevaAnim) return true;

        if (this.animacionesIninterrumpibles.has(nuevaAnim)) {
            this.estaBloqueada = true;
        }

        this.currentAnim = nuevaAnim;
        this.currentFrame = 0;
        this.acumuladoTime = 0;
        this.msPerFrame = msPorFrame;
        return true;
    }

    actualizar(deltaTime) {
       
        
        if (!this.mapAnims[this.currentAnim]) return;

        this.acumuladoTime += deltaTime;

        if (this.acumuladoTime >= this.msPerFrame) {
            this.acumuladoTime = 0;
            
            const totalFrames = this.mapAnims[this.currentAnim].frames;
            this.currentFrame++;
            // --- LÓGICA DE FINALIZACIÓN ---
            if (this.currentFrame >= totalFrames) {
                
                
                if (this.estaBloqueada) {
                    this.estaBloqueada = false; // DESBLOQUEAMOS
                    
                    
                    
                    // Opcional: Volver a IDLE automáticamente tras un ataque o daño
                    if (this.currentAnim !== "MUERTE") {
                        this.currentAnim = "IDLE_ABAJO"; 
                        this.msPerFrame = 175;
                    }
                }
                
                // Si la animación no es de MUERTE (que se queda en el último frame), loopeamos
                if (this.currentAnim !== "MUERTE") {
                    this.currentFrame = 0;
                } else {
                    // Si es muerte, nos quedamos en el último frame tirados en el suelo
                    this.currentFrame = totalFrames - 1;
                }
            }
        }
    }

    dibujar(ctx, x, y) {

        const animConfig = this.mapAnims[this.currentAnim];
        if (!animConfig) return;

        const nombreSprite = animConfig.sprite;
        const img = this.images[nombreSprite];

        let offsetX = 2;
        let offsetY = 4;

        if(this.currentFrame !=0){
                offsetX = offsetX*2;
        }

        if(animConfig.fila != 0){
            offsetY = offsetY * animConfig.fila +4;
        }

        const sx = this.currentFrame * this.frameW + offsetX * this.currentFrame;
        const sy = animConfig.fila * this.frameH +offsetY;            
        
        ctx.drawImage(
                img,
                sx, sy, this.frameW, this.frameH, // Recorte
                x, y, this.finalH, this.finalW    // Destino
            );  
    }

}