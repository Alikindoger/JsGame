export class UIManager{
    constructor(){
        this.elements = [];
        this.mouse = { x: 0, y: 0 };

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

}