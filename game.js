import { Jugador } from './jugador.js';

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

const jugador = new Jugador(canvas.width / 2, canvas.height / 2);
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
        // La lógica del jugador ahora vive en su propia clase
        jugador.actualizar(teclas, canvas);
        acumulador -= TICK_TIME;
        
        
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    jugador.dibujar(ctx);

    requestAnimationFrame(buclePrincipal);
}
configurarPixelArt();
requestAnimationFrame(buclePrincipal);