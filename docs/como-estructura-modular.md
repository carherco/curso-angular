# Ejercicio: creación de la estructura modular para un proyecto extenso

## Creación del proyecto con routing

    ng new modular --routing

## Creación de los módulos con routing

    ng g m admin --routing
    ng g m keystorage --routing
    ng g m public --routing


## Creación de los componentes

    ng g c admin/usuarios
    ng g c admin/grupos
    ng g c admin/menu-admin (para evitar conflictos)

    ng g c keystorage/services
    ng g c keystorage/keys
    ng g c keystorage/menu-keystorage

    ng g c public/register
    ng g c public/landingpage
    ng g c public/menu-public

    ng g c not-found

## Añadimos rutas

En admin-routing.module.ts

    const routes: Routes = [
    { 
        path: 'admin',
        component: MenuAdminComponent,
        children: [
        {
            path: '',
            children: [
            { path: 'usuarios', component: UsuariosComponent},
            { path: 'grupos', component: GruposComponent},
            ]
        }
        ]
    }
    ];

En keystorage-routing.module.ts

    const routes: Routes = [
    { 
        path: 'keystorage',
        component: MenuKeyStorageComponent,
        children: [
        {
            path: '',
            children: [
            { path: 'services', component: ServicesComponent},
            { path: 'keys', component: KeysComponent},
            ]
        }
        ]
    }
    ];

En public-routing.module.ts

    const routes: Routes = [
    {
        path: '',
        component: MenuPublicComponent,
        children: [
        {
            path: '',
            children: [
            { path: 'register', component: RegisterComponent },
            { path: '', component: LandingpageComponent },
            ]
        }
        ]
    }
    ];

En app-routing.module.ts

    const routes: Routes = [
    { path: "**", component: NotFoundComponent }
    ];

## Conectamos módulos

En app.module.ts

    @NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AdminModule,
        KeystorageModule,
        PublicModule
    ],
    providers: [],
    bootstrap: [AppComponent]
    })
    export class AppModule { }


En app-routing.module.ts

    @NgModule({
    imports: [
        RouterModule.forRoot(routes),
        AdminRoutingModule,
        KeystorageRoutingModule,
        PublicRoutingModule
    ],
    exports: [RouterModule]
    })
    export class AppRoutingModule { }


## Plantillas de menús y navegación

En app.component.html

    <nav>
    <a routerLink="admin" routerActive="active">Administracion</a>
    <a routerLink="keystorage" routerActive="keystorage">KeyStorage</a>
    <a routerLink="" routerActive="active">Web</a>
    </nav>

    <router-outlet></router-outlet>

En menu-admin.component.html

    <nav>
    <a routerLink="usuarios" routerActive="active">Usuarios</a>
    <a routerLink="grupos" routerActive="active">Grupos</a>
    </nav>

    <router-outlet></router-outlet>

En menu-keystorage.component.html

    <nav>
    <a routerLink="usuarios" routerActive="active">Usuarios</a>
    <a routerLink="grupos" routerActive="active">Grupos</a>
    </nav>

    <router-outlet></router-outlet>

En menu-public.component.html 

    <nav>
    <a routerLink="" routerActive="active">Homepage</a>
    <a routerLink="register" routerActive="active">Registro</a>
    </nav>

    <router-outlet></router-outlet>


[Índice](index.md)