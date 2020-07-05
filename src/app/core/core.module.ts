import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { MapComponent } from './components/map/map.component';
import { DataApiService } from '../services/data-api.service';


//Hay que tener en cuenta el declatarion y el exports

@NgModule({
  declarations: [MapComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
  ],
  exports: [
    MapComponent,
  ],
  // providers: [DataApiService]
})
export class CoreModule { }



