import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OcultarDigitosPipe } from './ocultar-digitos.pipe';
import { TarjetaCreditoComponent } from './tarjeta-credito/tarjeta-credito.component';
import { TCRouting } from './tarjeta-credito.routes';



@NgModule({
  declarations: [
    OcultarDigitosPipe,
    TarjetaCreditoComponent
  ],
  imports: [
    CommonModule,
    TCRouting
  ],
  // Para exportar fuera de este módulo el componente de tarjeta
  exports: [
    TarjetaCreditoComponent,
    OcultarDigitosPipe
  ]
})
export class TarjetasCreditoModule { }
