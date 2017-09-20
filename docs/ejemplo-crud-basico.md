# Ejercicio: creación de un crud básico

Se trata de hacer un listado de elementos, con posibilidad de añadir más elementos, editar elementos y borrar elementos.

El ejemplo resuelto está en el componente crud-basico

# Ejercicio: CRUD con API REST y Autenticación

- HomePageComponent (con botón para ir a página de login)
- LoginComponent (con formulario de login)
- AdminHomeComponent (con un menú en la que una entrada es "Listado de usuarios", las otras entradas, links falsos/inventados)
- UserListComponent (listdo de usuarios)
- UserEditComponent(formulario para editar un usuario)
- UserAddComponent (formulario para añadir un usuario)

- Usaremos la API https://reqres.in/

Tendremos un servicio userService
- getAll
- getOne
- add
- edit
- delete

Un servicio AuthService con métodos:
- login()
- logOut()
- isLogged()

Un guard AuthGuard de tipo canActivate.



