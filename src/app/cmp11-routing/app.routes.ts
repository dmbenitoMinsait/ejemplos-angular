import { Routes, RouterModule } from '@angular/router'
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component'
import { Error404Component } from './error404/error404.component'
import { IsDataSavedGuard } from './guards/is-data-saved.guard'
import { IsLoggedinGuard } from './guards/is-loggedin.guard'
import { InfoUsuarioComponent } from './info-usuario/info-usuario.component'
import { InicioComponent } from './inicio/inicio.component'
import { NuevoUsuarioComponent } from './nuevo-usuario/nuevo-usuario.component'

const USUARIOS_ROUTES: Routes = [
    { path: ':id/info', component: InfoUsuarioComponent, 
        canActivate: [IsLoggedinGuard]},
    { path: ':id/editar', component: EditarUsuarioComponent, canDeactivate: [IsDataSavedGuard]}
]

const APP_ROUTES: Routes = [
    { path: '', redirectTo: 'usuarios', pathMatch: 'full'},
    { path: 'usuarios', component: InicioComponent, children: USUARIOS_ROUTES},
    { path: 'nuevo-usuario', component: NuevoUsuarioComponent},
    // { path: 'usuarios/:id', component: InfoUsuarioComponent},
    
    // Cuando entremos en la siguiente ruta queremos que se nos descargue el siguiente módulo
    { path: 'tarjeta-credito', 
        loadChildren: () => import ('../tarjetas-credito/tarjetas-credito.module')
            .then(m => m.TarjetasCreditoModule)},

    { path: '**', component: Error404Component}
]

export const RoutingModule = RouterModule.forRoot(APP_ROUTES)