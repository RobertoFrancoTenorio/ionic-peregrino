import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ConsultaPageRoutingModule } from './consulta-routing.module';

import { ConsultaPage } from './consulta.page';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ConsultaPageRoutingModule,
    MatInputModule
  ],
  declarations: [ConsultaPage]
})
export class ConsultaPageModule {}
