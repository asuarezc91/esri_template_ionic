import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AppURl } from '../config/app-urls.config';



const routes: Routes = [
  { path: AppURl.App, redirectTo: AppURl.AppWidgetA, pathMatch: 'full' },
  { path: AppURl.AppWidgetA, loadChildren: () => import('../views/widget-a-page/widget-a.module').then(m => m.WidgetAModule) },
  { path: AppURl.AppWidgetB, loadChildren: () => import('../views/widget-b-page/wiget-b.module').then(m => m.WigetBModule) },
]




//Importante cambiar las líneas para pre-cargar la página del widget A


// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class CoreRoutingModule { }

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
