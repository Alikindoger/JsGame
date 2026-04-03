import { Entidad } from '../entidad.js';
import { Slime } from './slime.js';


export function crearEntidad(data) {
    switch (data.entity) {
        case "SLIME":
            return new Slime(data.gridX, data.gridY,32,32,data.id);
        default:
            return new Entidad(data.id, data.x, data.y, data.tipo,null,data.id);
    }
}