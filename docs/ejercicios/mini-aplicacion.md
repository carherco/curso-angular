# Ejercicio mini-aplicación completa con API REST

Se trata de desarrollar una mini aplicación similar a la de la url: https://carherco.es/curso-angular-ejercicio-final

Características:

- HomePageComponent (con botón para ir a página de login)
- LoginComponent (con formulario de login)
- AdminHomeComponent (con un menú en la que una entrada es "Listado de usuarios", las otras entradas, links falsos/inventados)
- UserListComponent (listdo de usuarios)
- UserEditComponent(formulario para editar un usuario)
- UserAddComponent (formulario para añadir un usuario)

- Los datos los extraeremos de la API https://reqres.in/

Tendremos un servicio userService

- getAll
- getOne
- add
- edit
- delete

Un servicio de autenticación como el programado en el ejercicio servicio-auth.

Un guard AuthGuard de tipo canActivate que no deje entrar a la parte privada si el usuario no está logueado.
