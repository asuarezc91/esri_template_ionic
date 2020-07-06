
import { DataApiService } from 'src/app/services/data-api.service';

import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  Query
} from "@angular/core";
import { loadModules } from "esri-loader";
import esri = __esri; // Esri TypeScript Types

import Map from "esri/Map";
// import * as Map from 'esri/Map'; 
import esriConfig from   "esri/config"
import Field from  "esri/layers/support/Field"
// import request from "esri/request"



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {

  @Output() mapLoadedEvent = new EventEmitter<boolean>();

  // The <div> where we will place the map
  @ViewChild("mapViewNode", { static: true }) private mapViewEl: ElementRef;

  private _zoom = 11;
  private _center: Array<number> = [-17.916829, 28.658880];
  // private _center: Array<number> = [-4, 40];
  private _basemap = "gray";
  private _loaded = false;
  private _view: esri.MapView = null;
  private _featureL: esri.FeatureLayer = null;


  get mapLoaded(): boolean {
    return this._loaded;
  }

  @Input()
  set zoom(zoom: number) {
    this._zoom = zoom;
  }

  get zoom(): number {
    return this._zoom;
  }

  @Input()
  set center(center: Array<number>) {
    this._center = center;
  }

  get center(): Array<number> {
    return this._center;
  }

  @Input()
  set basemap(basemap: string) {
    this._basemap = basemap;
  }

  get basemap(): string {
    return this._basemap;
  }

  constructor() {




  }

  async initializeMap() {
    try {
      const [EsriMap, EsriMapView, FeatureLayer, Point, SimpleMarkerSymbol, Polyline, SimpleRenderer, Renderer,request] = await loadModules([
        "esri/Map",
        "esri/views/MapView",
        "esri/layers/FeatureLayer",
        "esri/geometry/Point",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/geometry/Polyline",
        "esri/renderers/SimpleRenderer",
        "esri/renderers/Renderer",
        "esri/request"

      ]);
      const url: string = "https://services6.arcgis.com/30currU8oaQeVHvW/arcgis/rest/services/L%C3%ADneas_de_guagua/FeatureServer/0";
      this._featureL = new FeatureLayer(url);

// DEFINITIVO FUNCIONA DE LUJO 
        
      // var params = {
      //   name: name,
      //   targetSR: this._view.spatialReference,
      //   maxRecordCount: 1000,
      //   enforceInputFileSizeLimit: true,
      //   enforceOutputJsonSizeLimit: true
      // };


      //    var myContent = {
      //       filetype: "shapefile",
      //       publishParameters: JSON.stringify(params),
      //       f: "json"
      //     };
  
      //     let portalUrl = "https://www.arcgis.com";
  
      //     let options = {
      //       query: myContent,
      //       body: document.getElementById("uploadForm"),
      //       responseType: "json"
      //     }
  
      //     // use the REST generate operation to generate a feature collection from the zipped shapefile
      //     request(portalUrl + "/sharing/rest/content/features/generate", options)
      //       .then(function (response :any ) {
      //         var layerName =
      //           response.data.featureCollection.layers[0].layerDefinition.name;
      //         document.getElementById("upload-status").innerHTML =
      //           "<b>Loaded: </b>" + layerName;
      //         // addShapefileToMap(response.data.featureCollection);
      //       })
      //       // .catch(errorHandler);
  


      console.log(this._featureL);

      const mapProperties: esri.MapProperties = {
        basemap: this._basemap,
      };

      const map: esri.Map = new EsriMap(mapProperties);
      map.layers.add(this._featureL);
      const mapViewProperties: esri.MapViewProperties = {
        container: this.mapViewEl.nativeElement,
        center: this._center,
        zoom: this._zoom,
        map: map
      };
      this._view = new EsriMapView(mapViewProperties);
      await this._view.when();
      return this._view;
    } catch (error) {
      console.log("EsriLoader: ", error);
    }
  }

  filterMap(event: any) {
    const selectedLine = event.value.id;
    console.log(selectedLine); 
    this._featureL.definitionExpression = "Linea = '" + selectedLine + "'";
    // this._featureL.definitionExpression = "1=1";
  }


  ngOnInit() {



    this.initializeMap().then(mapView => {
      console.log("mapView ready: ", this._view.ready);
      this._loaded = this._view.ready;
      this.mapLoadedEvent.emit(true);
    });
  }

  ngOnDestroy() {
    if (this._view) {
      this._view.container = null;
    }
  }

  
}

