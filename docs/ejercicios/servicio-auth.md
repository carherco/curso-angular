# Ejercicio

Programar un servicio de autenticación AuthService con las siguientes especificaciones:

4 métodos:

- logIn(username: string, password: string): boolean
- logOut(): boolean
- isLogged(): boolean
- getUsername(): string

El servicio (fake) de login dará por válidas las credenciales "test" / "test" y por inválidas el resto de combinaciones de usuario y password.

Si las credenciales son válidas, se almacenará la información del login y del usuario en el localstorage.

## Consejo

Programar además un componente loginComponent, que se mostrará en la cabecera de la aplicación cuando el usuario NO esté logueado y que permita al usuario hacer login.

Programar un componente loggedComponent, que se mostrará en la cabecera de la aplicación cuando el usuario SÍ esté loguedado. Este componente mostrará el username del usuario y un botón para desloguearse.
