import { CATALOGO_MUEBLES } from '../entities/furnieData.js';


export class BuildUIManager {
    constructor(buildManager) {
        this.buildManager = buildManager;
        this.menu = document.getElementById('ui-build-menu');
        this.container = document.getElementById('furnie-list');
        this.imgSheet = '../assets/furnies1.png'; 

        this.categoriaActual = "TODO";
        
        this.setupTabs();
        this.renderizar();
    }

    setupTabs() {
        const botones = document.querySelectorAll('.tab-btn');
        botones.forEach(btn => {
            btn.onclick = () => {

                botones.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                this.categoriaActual = btn.dataset.categoria;
                this.renderizar();
            };
        });
    }

    renderizar() {
        this.container.innerHTML = "";

        // 2. Recorrer el catálogo y filtrar
        for (const [key, data] of Object.entries(CATALOGO_MUEBLES)) {
            
            if (this.categoriaActual !== "TODO" && data.categoria !== this.categoriaActual) {
                continue;
            }

            this.crearBotonMueble(key, data);
        }
    }

    crearBotonMueble(key, data) {
        const btn = document.createElement('button');
        btn.className = 'furnie-btn';
        
        // Ajuste de escala 16px -> 64px (x4)
        const escala = 4;



        btn.style.backgroundImage = `url(${this.imgSheet})`;
        btn.style.backgroundSize = `${32*4}px auto`; //32 ES EL ANCHO DE LA IMAGEN
        btn.style.backgroundPosition = `-${data.sx * 4}px -${data.sy * 4}px`;

        btn.onclick = () => {
            this.buildManager.objetoSeleccionado = key;
            // Feedback visual de selección
            document.querySelectorAll('.furnie-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
        };

        this.container.appendChild(btn);
    }

    seleccionarMueble(key, elemento) {
        document.querySelectorAll('.furnie-btn').forEach(b => b.classList.remove('selected'));
        elemento.classList.add('selected');
        this.buildManager.objetoSeleccionado = key;
    }

    toggleMenu(visible) {
        this.menu.style.display = visible ? 'block' : 'none';
    }
}