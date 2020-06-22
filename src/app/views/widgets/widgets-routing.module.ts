import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppURl } from 'src/app/config/app-urls.config';
import { WidgetAPageComponent } from './pages/widget-a-page/widget-a-page.component';
import { WidgetBPageComponent } from './pages/widget-b-page/widget-b-page.component';

//Widget A is the father and Widget B is the son

const routes: Routes = [{ path: AppURl.AppWidgetA, redirectTo: AppURl.AppWidgetA, pathMatch: 'full' },
{
  path: AppURl.AppWidgetA, component: WidgetAPageComponent, children: [
    { path: AppURl.AppWidgetB, component: WidgetBPageComponent },
  ]
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WidgetsRoutingModule { }
