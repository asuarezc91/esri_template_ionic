import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppURl } from '../config/app-urls.config';
 


const routes: Routes = [  
  { path: AppURl.AppRoot, redirectTo: AppURl.AppWidgetA, pathMatch: 'full' },
  { path: AppURl.AppWidgetA, loadChildren: () => import('../views/widgets/widgets.module').then(m => m.WidgetsModule) },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
