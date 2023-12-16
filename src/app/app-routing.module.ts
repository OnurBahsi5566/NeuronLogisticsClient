import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';
import { LoginComponent } from './ui/components/login/login.component';
import { RegisterComponent } from './ui/components/register/register.component';
import { DashboardComponent } from './admin/layout/components/dashboard/dashboard.component';
import { authGuard } from './guards/common/auth.guard';

const routes: Routes = [
  {
    path: 'admin',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'cargo-containers',
        loadChildren: () =>
          import(
            './admin/components/definitions/cargo-containers/cargo-containers.module'
          ).then((module) => module.CargoContainersModule),
      },
      {
        path: 'vessels',
        loadChildren: () =>
          import('./admin/components/definitions/vessels/vessels.module').then(
            (module) => module.VesselsModule
          ),
      },
      {
        path: 'voyages',
        loadChildren: () =>
          import('./admin/components/definitions/voyages/voyages.module').then(
            (module) => module.VoyagesModule
          ),
      },
    ],
    canActivate: [authGuard],
  },
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
