import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'visitors',
    loadChildren: () => import('./pages/visitors/visitors.module').then( m => m.VisitorsPageModule)
  },
  {
    path: 'visitors/:id',
    loadChildren: () => import('./pages/visitors/visitors.module').then( m => m.VisitorsPageModule)
  },
  {
    path: 'visitors/approval/:id',
    loadChildren: () => import('./pages/visitors-approval/visitors-approval.module').then( m => m.VisitorsApprovalPageModule)
  },
  {
    path: 'companys',
    loadChildren: () => import('./pages/companys/companys.module').then( m => m.CompanysPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
