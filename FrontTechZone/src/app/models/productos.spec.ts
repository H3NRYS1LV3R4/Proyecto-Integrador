import { Productos } from './productos';

describe('Productos', () => {
  it('should create an instance', () => {
    const productos: Productos = { cod_prod: 1,
      nom_prod: 'Mouse Inalambrico',
      des_prod: '',
      cod_cat: 1,
      stock_prod: 245,
      precio_compra: 29.9,
      cod_prov: 5,
      cod_marca: 2, };
    expect(productos).toBeTruthy();
  });
});

