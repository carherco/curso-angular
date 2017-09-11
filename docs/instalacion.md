# Instalación

## Requisitos para la instalación

* Node.js
* npm

## Instalación

1. Instalar Angular cli

npm install -g @angular/cli

2. Crear un proyecto

ng new miApp

Se creará un directorio miApp/ con la estructura que veremos más adelante.

Con el modificador --style se puede configurar para usar sass en vez de css

Con el modificador --routing se puede generar el proyecto con un módulo de routing

3. Servir la aplicación

cd miApp
ng serve --open

ng serve lanza el servidor, construye la aplicación, vigila los archivos de la aplicación y reconstruye la aplicación cuando algún archivo sufra cambios.

La aplicación está servida en http://localhost:4200/

Si se utiliza el modificador --open o -o, se abre automáticamete el navegador.

## Instalación de un proyecto angular ya existente en un repositorio git

1. Obtener el código

git checkout url_código

2. Instalar dependencias

npm install

3. Servir la aplicación

ng serve
