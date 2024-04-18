import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  declarations: [CompanysPage]
})
export class CompanysPageModule {}
