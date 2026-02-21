import { Mapa } from './mapa.js';
import { Jugador } from './jugador.js';
import { Camera } from './camara.js';

const canvas = document.getElementById('juegoCanvas');
const ctx = canvas.getContext('2d');

function configurarPixelArt() {
    ctx.imageSmoothingEnabled = false;       // Estándar
    ctx.mozImageSmoothingEnabled = false;    // Firefox antiguo
    ctx.webkitImageSmoothingEnabled = false; // Safari/Chrome antiguo
    ctx.msImageSmoothingEnabled = false;     // IE
}


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// --- ESTADO DEL JUEGO ---
const TICKS_POR_SEGUNDO = 60;
const TICK_TIME = 1000 / TICKS_POR_SEGUNDO;
let acumulador = 0;
let ultimoTiempo = 0;


const TILE_SIZE = 64;
const mapa = new Mapa(TILE_SIZE,16,false);
const jugador = new Jugador(192+64, 128*4,mapa,false);

const camara = new Camera(
    canvas.width, 
    canvas.height, 
    mapa.datos[0].length * TILE_SIZE, 
    mapa.datos.length * TILE_SIZE
);


const teclas = {};

// --- INPUTS ---
window.onkeydown = (e) => teclas[e.key] = true;
window.onkeyup = (e) => teclas[e.key] = false;


// --- BUCLE ---
function buclePrincipal(tiempoActual) {
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
        jugador.actualizar(teclas, canvas);
        camara.centrarEn(jugador.x, jugador.y, jugador.ancho, jugador.alto);
        acumulador -= TICK_TIME;
        
        
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(-Math.floor(camara.x), -Math.floor(camara.y));
    
    mapa.dibujar(ctx);
    jugador.dibujar(ctx,camara);
    ctx.restore();

     

    requestAnimationFrame(buclePrincipal);
}
configurarPixelArt();
requestAnimationFrame(buclePrincipal);