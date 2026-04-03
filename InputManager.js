export class InputManager {
    constructor(canvas) {
        this.canvas = canvas;
        
        this.teclas = new Set();

        this.mouse = {
            x: 0, y: 0,
            gx: 0, gy: 0, 
            click: false,
            derecho: false
        };

        //mapa de acciones WIP
        this.ACCIONES = {
            ARRIBA: ['ArrowUp', 'w'],
            ABAJO: ['ArrowDown', 's'],
            IZQUIERDA: ['ArrowLeft', 'a'],
            DERECHA: ['ArrowRight', 'd'],
            INTERACTUAR: [' ', 'e'],
            CONSTRUIR: ['b']
        };

        this.setupListeners();
    }

    setupListeners() {
        
        window.addEventListener('keydown', (e) => this.teclas.add(e.key));
        window.addEventListener('keyup', (e) => this.teclas.delete(e.key));

        
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
            
            // snap
            this.mouse.gx = Math.floor(this.mouse.x / 64);
            this.mouse.gy = Math.floor(this.mouse.y / 64);
        });

        // click
        this.canvas.addEventListener('mousedown', (e) => {
            if (e.button === 0) this.mouse.click = true;
            if (e.button === 2) this.mouse.derecho = true;
        });

        this.canvas.addEventListener('mouseup', (e) => {
            if (e.button === 0) this.mouse.click = false;
            if (e.button === 2) this.mouse.derecho = false;
        });

        // quitar contextual
        this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
    }

    estaActiva(accion) {
        const teclasAsignadas = this.ACCIONES[accion];
        if (!teclasAsignadas) return false;
        return teclasAsignadas.some(t => this.teclas.has(t));
    }

    estaActiva(){
        return this.teclas;
    }

    postUpdate() {
        // Si quieres que el click solo se detecte una vez por pulsación
        // this.mouse.click = false; 
    }
}