import { Productos } from "./productos";

export interface ItemCarrito {
    producto: Productos;
    cantidad: number;
    total: number;
}