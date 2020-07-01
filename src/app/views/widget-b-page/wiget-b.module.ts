import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WigetBRoutingModule } from './wiget-b-routing.module';
import { WidgetBPageComponent } from './widget-b-page.component';


@NgModule({
  declarations: [WidgetBPageComponent],
  imports: [
    CommonModule,
    WigetBRoutingModule
  ],
  exports: [
    WidgetBPageComponent
  ]
})
export class WigetBModule { }
