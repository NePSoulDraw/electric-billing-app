import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from './pages/inicio/inicio.component';
import { DetallesComponent } from './pages/detalles/detalles.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'detalles/:id', component: DetallesComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/inicio' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
