import { ImagePipe } from './image.pipe';

describe('ImagePipe', () => {

  let pipe: ImagePipe;

  beforeEach(() => {
    pipe = new ImagePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('directorio por defecto debe ser assets/img/', () => {
    // imagen = 'barco.png'
    // <img src="{{imagen.src | image }}"
    let imagen = 'barco.png';
    expect(pipe.transform(imagen)).toEqual('assets/img/barco.png');
  });

  it('diretorio pasado por parámetro', () => {
    // {{imagen | image('assets/imagenes') }}
    let imagen = 'barco.png';
    expect(pipe.transform(imagen,'assets/imagenes')).toEqual('assets/imagenes/barco.png');
  });

  it('diretorio pasado por parámetro', () => {
    // {{imagen | image('assets/imagenes/') }}
    let imagen = 'barco.png';
    expect(pipe.transform(imagen,'assets/imagenes/')).toEqual('assets/imagenes/barco.png');
  });
});
