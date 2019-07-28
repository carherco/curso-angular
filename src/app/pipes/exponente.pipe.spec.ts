import { ExponentePipe } from './exponente.pipe';

describe('ExponentePipe', () => {

  let pipe: ExponentePipe;

  beforeEach(() => {
    pipe = new ExponentePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('Al aplicarla a X devuelve Y', () => {
    expect(pipe.transform(3,2)).toBe(9);
    expect(pipe.transform(1,7)).toBe(1);
    expect(pipe.transform(6,0)).toBe(1);
  });

});
