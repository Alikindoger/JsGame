import { CursorManager } from "./cursorManager.js";

export class UIManager{
    constructor(){
        this.elements = [];
        this.mouse = { x: 0, y: 0 , gx : 0, gy : 0};

        this.image = new Image();
        this.image.src = "assets/cursor.png";


        this.cursorManager = new CursorManager(this.image);

        window.addEventListener('mousedown', (e) => {
            this.elements.forEach(el => {
                if (el.mouseIn(this.mouse.x, this.mouse.y) && el.onClick) {
                    el.onClick();
                }
            });
        });

        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;

            
            this.mouse.gx = Math.floor(this.mouse.x / 64); // TODO: FIX MOVER PANTALLA RATON SE VE MAL
            this.mouse.gy = Math.floor(this.mouse.y / 64);
        });
    }

    addElement(el){
        this.elements.push(el);
    }

    dibujar(ctx) {
        this.elements.forEach(el => {
            el.actualizar(this.mouse.x, this.mouse.y);
            el.dibujar(ctx);
        });


    }

    dibujarCursor(ctx,camara){
            
        this.cursorManager.dibujar(ctx,this.mouse.gx + Math.floor(camara.x / 64), this.mouse.gy + Math.floor(camara.y / 64));
    }

}