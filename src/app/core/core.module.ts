import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { MapComponent } from './components/map/map.component';

//Hay que tener en cuenta el declatarion y el exports

@NgModule({
  declarations: [MapComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
  ],
  exports: [
    MapComponent
  ]
})
export class CoreModule { }
