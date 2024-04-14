import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';
import { VisitorsService } from 'src/app/services/visitors.service';
import { CompanysService } from 'src/app/services/companys.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  declarations: [RegisterPage],
  providers: [
    CompanysService, VisitorsService
  ]
})
export class RegisterPageModule {}
