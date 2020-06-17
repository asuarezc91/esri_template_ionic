import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { MapComponent } from './components/map/map.component';
import { HeaderComponent } from './components/header/header.component';

//Hay que tener en cuenta el declatarion y el exports

@NgModule({
  declarations: [MapComponent,HeaderComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
  ],
  exports: [
    MapComponent,
    HeaderComponent
  ]
})
export class CoreModule { }
