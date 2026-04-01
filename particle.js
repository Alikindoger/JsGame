export class Particle {
    constructor() {
        this.activo = false; 
    }

    inicializar(x, y, color, vidaMS) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.vidaTotal = vidaMS;
        this.tiempoVida = 0;
        this.activo = true;
        this.alpha = 1.0; // Transparencia inicial

        this.vx = (Math.random() - 0.5) * 2; 
        this.vy = (Math.random() - 0.5) * 2;
    }

    actualizar(deltaTime) {
        if (!this.activo) return;

        this.tiempoVida += deltaTime;
        
        let progreso = this.tiempoVida / this.vidaTotal;

        if (progreso >= 1) {
            this.activo = false; 
        } else {
            this.alpha = 1.0 - progreso; 
            this.x += this.vx * (deltaTime / 16); 
            this.y += this.vy * (deltaTime / 16) - 1;
        }
    }

    dibujar(ctx) {
        if (!this.activo) return;

        ctx.globalAlpha = this.alpha; // Aplicamos la transparencia
        ctx.fillStyle = this.color;

        ctx.fillRect(Math.floor(this.x), Math.floor(this.y), 4, 4); 
        
        ctx.globalAlpha = 1.0; 
    }
}