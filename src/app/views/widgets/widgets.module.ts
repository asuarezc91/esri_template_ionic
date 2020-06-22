import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WidgetsRoutingModule } from './widgets-routing.module';
import { WidgetBPageComponent } from './pages/widget-b-page/widget-b-page.component';
import { WidgetAPageComponent } from './pages/widget-a-page/widget-a-page.component';


@NgModule({
  declarations: [WidgetAPageComponent,WidgetBPageComponent],
  imports: [
    CommonModule,
    WidgetsRoutingModule
  ]
})
export class WidgetsModule { }
