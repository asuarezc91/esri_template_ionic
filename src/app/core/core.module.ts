import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { MapComponent } from './components/map/map.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

//Hay que tener en cuenta el declatarion y el exports

@NgModule({
  declarations: [MapComponent,HeaderComponent,SidebarComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
  ],
  exports: [
    MapComponent,
    HeaderComponent,
    SidebarComponent
  ]
})
export class CoreModule { }
