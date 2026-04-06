export class BuildManager {
    constructor(canvas, sprites) {
        this.canvas = canvas;
        this.sprites = sprites;

        this.cursor = new Image();
        this.cursor.src = "assets/cursor.png";
        
        this.activo = false;
        this.mouse = { gx: 0, gy: 0 };
        this.objetoSeleccionado = 0;

        this.camOffX = 0;
        this.camOffY = 0;

        this.canvas.addEventListener('mousemove', (e) => {
            if (!this.activo) return;
            this.actualizarMouse(e);
        });
    }

    setActivo(valor) {
        this.activo = valor;
        if (this.activo) {
            this.canvas.style.cursor = "none";
        } else {
            this.canvas.style.cursor = "default";
        }
    }

    actualizarMouse(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;


        this.mouse.gx = Math.floor(x / 64) + this.camOffX;
        this.mouse.gy = Math.floor(y / 64) + this.camOffY;
    }

    estaCasillaLibre(gridEntidades) {
        const clave = `${this.mouse.gx},${this.mouse.gy}`;
        return gridEntidades[clave] === undefined;
    }

    dibujar(ctx, gridEntidades,camara) {
        if (!this.activo) return;

        const vx = this.mouse.gx * 64;
        const vy = this.mouse.gy * 64;

        this.camOffX = Math.floor(camara.x / 64);
        this.camOffY = Math.floor(camara.y / 64);

        const libre = this.estaCasillaLibre(gridEntidades);

        ctx.fillStyle = libre ? "rgba(46, 204, 113, 0.3)" : "rgba(231, 76, 60, 0.3)";
        ctx.fillRect(vx + this.camOffX , vy + this.camOffY , 64, 64);

        ctx.globalAlpha = 0.6;
        ctx.drawImage(this.cursor,7,7,18,18,vx + this.camOffX, vy + this.camOffY, 64, 64);
        ctx.globalAlpha = 1.0;

        ctx.strokeStyle = libre ? "#2ecc71" : "#e74c3c";
        ctx.lineWidth = 2;
        ctx.strokeRect(vx + this.camOffX, vy + this.camOffY, 64, 64);
    }
}