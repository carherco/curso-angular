# Instalación

## Requisitos para la instalación

* Node.js: https://nodejs.org/es/download/
* npm: En las distribuciones actuales de node.js viene integrado npm.

## Instalación

1. Instalar Angular cli (https://github.com/angular/angular-cli)

> npm install -g @angular/cli

Podemos comprobar que está instalado ejecutando

> ng version

Angular-cli (`ng`) es una aplicación que sirve para:

* Generar la estructura completa de un proyecto angular (scaffolding).
* Generar nuevos módulos, componentes y servicios a un proyecto angular.
* Arrancar un servidor de desarrollo que automáticamente recompila la aplicación y refresca el browser cuando guardamos los cambios que realizamos en el código.
* Revisa la corrección del código que escribimos (lint)
* Lanza los test
* Construye la aplicación lista para su distribución en producción.
* Y más cosas ...

En defininiva, proporciona un entorno de desarrollo completo que facilita muchísimo la construcción de aplicaciones con angular.

Más información sobre angular-cli: [angular-cli](angular-cli.md)

2. Crear un proyecto

> ng new miApp

Se creará un directorio miApp/ con la estructura que veremos más adelante.

Con el modificador --style se puede configurar para usar sass en vez de css

> ng new miApp --style=sass

Con el modificador --routing se puede generar el proyecto con un módulo de routing

> ng new miApp --routing

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

> git clone url_código

2. Instalar dependencias

> npm install

3. Servir la aplicación

> ng serve


[Índice](index.md)
