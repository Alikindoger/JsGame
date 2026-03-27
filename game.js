import { conn } from './conection.js';
import { Mapa } from './mapa.js';
import { Camera } from './camara.js';
import { Interfaz } from './interfaz.js';
import {  Panel, Boton, Icon } from './UI/Elements.js';
import { UIManager } from './UI/UIManager.js';

const canvas = document.getElementById('juegoCanvas');
const ctx = canvas.getContext('2d');

export const Estado = {
    juegoIniciado: false,
    pantalla: null,
    textoCarga: null,
    jugador : null,
    listaEntidades : {}
}
Estado.juegoIniciado = false;
Estado.pantalla = document.getElementById('layout-principal');
Estado.textoCarga = document.getElementById('mensaje-carga');


function configurarPixelArt() {
ctx.imageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;

}


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//login
const btnConectar = document.getElementById('btn-conectar');
const inputUser = document.getElementById('input-usuario');
const inputPass = document.getElementById('input-pass');
const inputIp = document.getElementById('input-ip');

//signin
const btnSignIn = document.getElementById('btn-registrar');
const inputRegUser = document.getElementById('reg-usuario');
const inputRegEmail = document.getElementById('reg-email');
const inputRegPass = document.getElementById('reg-pass');

//Interface
const ui = new UIManager();
const menuPausa = new Panel(1600, 700, 100, 100,'rgba(185, 56, 56, 0.7)','./assets/ui.png', () => {
    console.log("Cerrando...");
    location.reload(); 
});
const icon = new Icon(1625,728,80,80,0,16,'./assets/ui1.png');


ui.addElement(menuPausa);
ui.addElement(icon);



// --- ESTADO DEL JUEGO ---
const TICKS_POR_SEGUNDO = 60;
const TICK_TIME = 1000 / TICKS_POR_SEGUNDO;
let acumulador = 0;
let ultimoTiempo = 0;


const TILE_SIZE = 64;
export const mapa = new Mapa(TILE_SIZE,16,false);

const interfaz = new Interfaz(32);

btnSignIn.onclick = async () => {
    const user = inputRegUser.value;
    const email = inputRegEmail.value;
    const pass = inputRegPass.value;

    const ip = inputIp.value;
    conn.url = "ws://"+ ip+":8080";
    conn.conectar(); 

    if(user && email && pass ){
        await conn.esperarConexion();
        
        conn.enviar("REGISTRO",{usuario: user, email: email, password: pass});
    }
};

btnConectar.onclick = async () => {
    const user = inputUser.value;
    const pass = inputPass.value;
    const ip = inputIp.value;
    conn.url = "ws://"+ ip+":8080";
    conn.conectar(); 

    if (user && pass) { 
        await conn.esperarConexion(); 
        
        conn.enviar("LOGIN", { usuario: user, password: pass });
    }
};

const camara = new Camera(
    canvas.width, 
    canvas.height, 
    mapa.layer0[0].length * TILE_SIZE, 
    mapa.layer0.length * TILE_SIZE
);


const teclas = {};



// --- INPUTS ---
window.onkeydown = (e) => teclas[e.key] = true;
window.onkeyup = (e) => teclas[e.key] = false;


// --- BUCLE ---
function buclePrincipal(tiempoActual) {

    if (!Estado.juegoIniciado) {        
        requestAnimationFrame(buclePrincipal);
        return; 
    }

    if (!ultimoTiempo) {
        ultimoTiempo = tiempoActual;
        requestAnimationFrame(buclePrincipal);
        return;
    }

    let frameTime = tiempoActual - ultimoTiempo;
    if (frameTime > 250) frameTime = 250;
    
    ultimoTiempo = tiempoActual;
    acumulador += frameTime;

    while (acumulador >= TICK_TIME) {
        
       
        camara.centrarEn(Estado.jugador.x, Estado.jugador.y, Estado.jugador.ancho, Estado.jugador.alto);
        acumulador -= TICK_TIME;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(-Math.floor(camara.x), -Math.floor(camara.y));

    Estado.jugador.actualizar(teclas, canvas,frameTime);
    mapa.dibujar(ctx);
    Estado.jugador.dibujar(ctx,camara);
    
    for(const player of Object.values(conn.players)){

        player.actualizar(teclas,canvas,frameTime);
        player.dibujar(ctx,camara);
        
        
    }
        
    for(const ent of Object.values(conn.entidades)){
        
        ent.dibujar(ctx,camara);
    }
    ctx.restore();
    ui.dibujar(ctx);

    requestAnimationFrame(buclePrincipal);
}

configurarPixelArt();
requestAnimationFrame(buclePrincipal);