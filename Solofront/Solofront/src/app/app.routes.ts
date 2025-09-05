import { Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { UsuariosComponent } from './administracion/usuarios/usuarios.component';
import { RolesComponent } from './administracion/roles/roles.component';
import { AccesosComponent } from './administracion/accesos/accesos.component';
import { NuevoClienteComponent } from './cliente/nuevo-cliente/nuevo-cliente.component';

export const routes: Routes = [
    {
        path: '',
        component: ClienteComponent,
        pathMatch: "full"
    },
    {
        path: 'nuevo-cliente',
        component: NuevoClienteComponent,
        pathMatch: "full"
    },
    {
        path: 'editar-cliente/:parametro',
        component: NuevoClienteComponent,
        pathMatch: "full"
    },
    {
        path: 'admin',
        children:[
            {
                path:'admin',
                component: UsuariosComponent
            },
            {
                path:'roles',
                component: RolesComponent
            },
            {
                path:'accesos',
                component: AccesosComponent
            }
        ]
    }
];
