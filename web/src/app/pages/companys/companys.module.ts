import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanysPageRoutingModule } from './companys-routing.module';

import { CompanysPage } from './companys.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompanysPageRoutingModule
  ],
  providers: [],
  declarations: [CompanysPage]
})
export class CompanysPageModule {}
