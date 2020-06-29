import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetBPageComponent } from './widget-b-page.component';



@NgModule({
  declarations: [WidgetBPageComponent],
  imports: [
    CommonModule
  ]
})
export class WidgetBModule { }





// @NgModule({
//   declarations: [
//     ListFoodComponent,
//     FoodMenuPageComponent
//   ],
//   imports: [
//     CommonModule,
//     FoodMenuRoutingModule,
//     HttpClientModule
//   ],
//   providers: [DataApiService,HttpClientModule],
//   exports: [
//     ListFoodComponent
//   ]
// })

// export class FoodMenuModule { }


