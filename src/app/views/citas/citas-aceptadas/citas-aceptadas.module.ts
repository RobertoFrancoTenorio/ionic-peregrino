import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CitasAceptadasPageRoutingModule } from './citas-aceptadas-routing.module';

import { CitasAceptadasPage } from './citas-aceptadas.page';
import {MatExpansionModule} from '@angular/material/expansion';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CitasAceptadasPageRoutingModule,
    MatExpansionModule
  ],
  declarations: [CitasAceptadasPage]
})
export class CitasAceptadasPageModule {}
