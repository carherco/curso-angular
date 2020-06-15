# Instalar una versión antigua

Para instalar una versión específica del CLI:

> npm install -g @angular/cli@7.3.10

Si ya teníamos alguna versión instalada, entonces habrá que borrarla previamente:

> npm uninstall -g @angular/cli

> npm cache clean --force

> npm install -g @angular/cli@7

Podemos ver las versiones disponibles con este comando:

> npm view @angular/cli

Se puede volver a la última versión con:

> npm install -g @angular/cli@latest
