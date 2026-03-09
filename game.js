import { conn } from './conection.js';
import { Mapa } from './mapa.js';
import { Jugador } from './jugador.js';
import { Camera } from './camara.js';
import { Interfaz } from './interfaz.js';
import { LocalPlayer } from './localPlayer.js';
import { NetworkedPlayer } from './networkedPlayer.js';

const canvas = document.getElementById('juegoCanvas');
const ctx = canvas.getContext('2d');

function configurarPixelArt() {
ctx.imageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;

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

const jugador2 = new NetworkedPlayer(192,128*4, "bOT",mapa);


const interfaz = new Interfaz(32);


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
    jugador2.dibujar(ctx,camara);
    ctx.restore();

    interfaz.dibujar(ctx, camara, jugador);

    requestAnimationFrame(buclePrincipal);
}

conn.conectar(); // TO-DO alguna forma de esperar conectar
const jugador = new LocalPlayer(192+64,128*4, conn.nombre,mapa);
configurarPixelArt();
requestAnimationFrame(buclePrincipal);