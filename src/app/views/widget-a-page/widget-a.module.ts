import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetAPageComponent } from './widget-a-page.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [WidgetAPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: WidgetAPageComponent
      }
    ])
  ]
})
export class WidgetAModule { }
