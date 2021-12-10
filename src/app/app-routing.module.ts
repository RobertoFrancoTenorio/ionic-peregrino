import { NgModule, Component } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./views/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'citas',
    loadChildren: () => import('./views/citas/citas-asignadas/citas.module').then( m => m.CitasPageModule)
  },
  {
    path: 'citas-aceptadas',
    loadChildren: () => import('./views/citas/citas-aceptadas/citas-aceptadas.module').then( m => m.CitasAceptadasPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, }
      )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
