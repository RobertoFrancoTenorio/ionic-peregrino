import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CitasAceptadasPageRoutingModule } from './citas-aceptadas-routing.module';

import { CitasAceptadasPage } from './citas-aceptadas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CitasAceptadasPageRoutingModule
  ],
  declarations: [CitasAceptadasPage]
})
export class CitasAceptadasPageModule {}
