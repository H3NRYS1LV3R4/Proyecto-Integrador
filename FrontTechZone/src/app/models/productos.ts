import { Categoria } from "./categoria";

export interface Productos {
    codprod: number;
    nom_prod: string;
    des_prod: string;
    cod_cat: number;
    stock_prod: number;
    precio_compra: number;
    cod_prov: number;
    cod_marca: number;
}
