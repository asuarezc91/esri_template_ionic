import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppURl } from 'src/app/config/app-urls.config';
import { WidgetBPageComponent } from './widget-b-page.component';


const routes: Routes = [
  { path: AppURl.AppWidgetBRoot, component: WidgetBPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WigetBRoutingModule { }


 