import { Particle } from './particle.js';

export class ManagerEffect {
    constructor(capacidadMax = 100) {
        this.pool = [];
        this.capacidad = capacidadMax;

        // Pre-instanciamos todas las partículas al inicio
        for (let i = 0; i < this.capacidad; i++) {
            this.pool.push(new Particle());
        }
    }

    // Función para "crear" un efecto (busca una partícula inactiva)
    crearEfectoCasilla(gx, gy, color) {
        // Convertimos grid a píxeles (centro de la casilla)
        const px = gx * 64 + 32;
        const py = gy * 64 + 32;

        // Lanzamos varias partículas para hacer un efecto tipo "explosión"
        const cantidad = 10;
        for (let i = 0; i < cantidad; i++) {
            this.emitirParticula(px, py, color);
        }
    }

    // Busca la primera partícula inactiva en el pool y la activa
    emitirParticula(x, y, color) {
        for (let i = 0; i < this.capacidad; i++) {
            if (!this.pool[i].activo) {
                // Vida aleatoria entre 300ms y 600ms
                const vida = 300 + Math.random() * 300; 
                this.pool[i].inicializar(x, y, color, vida);
                return; // Encontrada y activada, salimos
            }
        }
        // Si el pool está lleno (100 activas), no emitimos más (límite de rendimiento)
    }

    actualizar(deltaTime) {
        // Solo actualizamos las que estén activas
        for (let i = 0; i < this.capacidad; i++) {
            if (this.pool[i].activo) {
                this.pool[i].actualizar(deltaTime);
            }
        }
    }

    dibujar(ctx) {
        // Solo dibujamos las que estén activas
        for (let i = 0; i < this.capacidad; i++) {
            if (this.pool[i].activo) {
                this.pool[i].dibujar(ctx);
            }
        }
    }
}