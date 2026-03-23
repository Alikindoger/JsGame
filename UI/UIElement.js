export class UIElement {

    //CLASE BASE DE LA QUE HEREDAN TODOS LOS UI

    constructor(x,y,ancho,alto,onClick = null){

        this.x = x;
        this.y = y;
        this.ancho = ancho;
        this.alto = alto;
        this.onClick = onClick;
        this.hover = false;
    }

    mouseIn(mx,my){
        return mx >= this.x && mx <= this.x + this.ancho &&
               my >= this.y && my <= this.y + this.alto;
    }

    actualizar(mx, my) {
        this.hover = this.mouseIn(mx, my);
    }


}