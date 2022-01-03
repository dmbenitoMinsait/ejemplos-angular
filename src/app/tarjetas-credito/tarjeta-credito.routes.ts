import { RouterModule, Routes } from "@angular/router";
import { TarjetaCreditoComponent } from "./tarjeta-credito/tarjeta-credito.component";

// Estás rutas son secundarias a las de la aplicación principal y solo funcionarán una vez te descargues el siguiente código
const TC_ROUTES: Routes = [
    { path: '', component: TarjetaCreditoComponent}
]
    // El router no detectaría las rutas hijas hasta que se vayan a usar por primera vez
export const TCRouting = RouterModule.forChild(TC_ROUTES)