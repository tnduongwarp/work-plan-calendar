import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemocomponentComponent } from './democomponent/democomponent.component';

const routes: Routes = [
  { path: 'hello', component: DemocomponentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
