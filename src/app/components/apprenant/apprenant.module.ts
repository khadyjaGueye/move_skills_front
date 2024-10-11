import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApprenantRoutingModule } from './apprenant-routing.module';
import { RouterOutlet } from '@angular/router';
import { IonicModule } from '@ionic/angular';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterOutlet,
    ApprenantRoutingModule,
    IonicModule.forRoot(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ApprenantModule { }
