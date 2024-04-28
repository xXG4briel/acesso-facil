import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanysPage } from './companys.page';

const routes: Routes = [
  {
    path: '',
    component: CompanysPage
  },
  // {
  //   path: 'modal-visit-info',
  //   loadChildren: () => import('./modal-visit-info/modal-visit-info.module').then( m => m.ModalVisitInfoPageModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanysPageRoutingModule {}
