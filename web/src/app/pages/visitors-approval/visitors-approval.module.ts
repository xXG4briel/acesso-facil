import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisitorsApprovalPageRoutingModule } from './visitors-approval-routing.module';

import { VisitorsApprovalPage } from './visitors-approval.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisitorsApprovalPageRoutingModule
  ],
  declarations: [VisitorsApprovalPage]
})
export class VisitorsApprovalPageModule {}
