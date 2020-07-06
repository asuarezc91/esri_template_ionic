import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapComponent } from './map.component';

describe('EsriMapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  let app: any; // debugElement.componentInstance

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MapComponent]
    })
      .compileComponents();
    fixture = TestBed.createComponent(MapComponent);
    app = fixture.debugElement.componentInstance;
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('verify default values', () => {
    expect(app.basemap).toEqual(jasmine.any(String));
    expect(app.center).toEqual(jasmine.any(Array));
    expect(app.zoom).toEqual(jasmine.any(Number));
    expect(app.mapLoaded).toEqual(false);
  });

});
