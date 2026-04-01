export class CursorManager {
    constructor(spriteCursor) {
        this.spriteCursor = spriteCursor; // La imagen del cuadro de selección
        this.activo = true;
        this.objetoAColocar = null; // Aquí guardaremos el ID del item seleccionado (ej: 'COFRE')
    }

    dibujar(ctx, gx, gy) {
        if (!this.activo) return;

        const vx = gx * 64;
        const vy = gy * 64;

        
        ctx.globalAlpha = 1; 
        ctx.drawImage(this.spriteCursor,7,7,18,18,vx, vy, 64, 64);

        if (this.objetoAColocar) {
            //sprite
        }
        
        ctx.globalAlpha = 1.0;
    }
}