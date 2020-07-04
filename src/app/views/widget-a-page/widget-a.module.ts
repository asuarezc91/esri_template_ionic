import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetAPageComponent } from './widget-a-page.component';
import { RouterModule } from '@angular/router';
import { DataApiService } from 'src/app/services/data-api.service';


//Because is the "home" page  ----> "RouterModule.forChild(["   in imports


@NgModule({
  declarations: [WidgetAPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: WidgetAPageComponent
      }
    ]),

  ],
  // providers: [DataApiService],
})
export class WidgetAModule { }
