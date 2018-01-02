# Instalación

## Requisitos para la instalación

* Node.js: https://nodejs.org/es/download/
* npm: En las distribuciones actuales de node.js viene integrado npm.

## Instalación

1. Instalar Angular cli (https://github.com/angular/angular-cli)

> npm install -g @angular/cli

2. Crear un proyecto

> ng new miApp

Se creará un directorio miApp/ con la estructura que veremos más adelante.

Con el modificador --style se puede configurar para usar sass en vez de css

Con el modificador --routing se puede generar el proyecto con un módulo de routing

3. Servir la aplicación

> cd miApp

> ng serve --open

ng serve lanza el servidor, construye la aplicación, vigila los archivos de la aplicación y reconstruye la aplicación cuando algún archivo sufra cambios.

La aplicación está servida en http://localhost:4200/

Si se utiliza el modificador --open o -o, se abre automáticamete el navegador.

El comando ng-serve permite cambiar el host y el puerto:

> ng serve --host 0.0.0.0 --port 4201

Al instalar una aplicación angular con *ng new*, se crea un fichero README.md con un recordatorio de los comandos principales de *angular cli*. 

## Instalación de un proyecto angular ya existente en un repositorio git

1. Obtener el código

> git checkout url_código

2. Instalar dependencias

> npm install

3. Servir la aplicación

> ng serve


[Índice](index.md)
