import { Categoria } from './categoria';

describe('Categoria', () => {
  it('should create an instance', () => {
    const categoria: Categoria = { codcat: 1, nom_cat: 'Hardware' };
    expect(categoria).toBeTruthy();
  });
});

