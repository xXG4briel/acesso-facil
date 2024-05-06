import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisitorsPageRoutingModule } from './visitors-routing.module';

import { VisitorsPage } from './visitors.page';
import { CardVisitsComponent } from './components/card-visits/card-visits.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisitorsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ VisitorsPage, CardVisitsComponent ],
  providers: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class VisitorsPageModule {}
