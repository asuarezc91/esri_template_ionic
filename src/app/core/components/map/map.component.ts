
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

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {

  @Output() mapLoadedEvent = new EventEmitter<boolean>();
  @ViewChild("mapViewNode", { static: true }) private mapViewEl: ElementRef;

  private _zoom = 11;
  private _center: Array<number> = [-17.916829, 28.658880];
  private _basemap = "dark-gray";
  private _loaded = false;
  private _view: esri.MapView = null;
  private _featureL: esri.FeatureLayer = null;
  private _req: any;
  private _map: esri.Map = null;


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

  constructor(private dataApi: DataApiService) {

  }

  async initializeMap() {
    try {
      const [EsriMap, EsriMapView, FeatureLayer, Point, SimpleMarkerSymbol, Polyline, SimpleRenderer, Renderer, request] = await loadModules([
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
      // console.log(this._featureL);

      const mapProperties: esri.MapProperties = {
        basemap: this._basemap,
      };

      this._map = new EsriMap(mapProperties);
      // map.layers.add(this._featureL);
      const mapViewProperties: esri.MapViewProperties = {
        container: this.mapViewEl.nativeElement,
        center: this._center,
        zoom: this._zoom,
        map: this._map,
      };
      this._view = new EsriMapView(mapViewProperties);
      await this._view.when();
      return this._view;
    } catch (error) {
      console.log("EsriLoader: ", error);
    }
  }

  ngOnInit() {
    this.initializeMap().then(mapView => {
      console.log("mapView ready: ", this._view.ready);
      this._loaded = this._view.ready;
      this.mapLoadedEvent.emit(true);
    });
    this.dataApi.reservation$.subscribe(fileName => {
      console.log(fileName);
      const test = this._view;
      const testMap = this._map;
      this.newLayer(fileName, test, testMap);
    })
  }


  async newLayer(fileName, test, testMap) {
    try {
      const [EsriMap, EsriMapView, FeatureLayer, Point, SimpleMarkerSymbol, Polyline, SimpleRenderer, Renderer, request, Graphic, Field] = await loadModules([
        "esri/Map",
        "esri/views/MapView",
        "esri/layers/FeatureLayer",
        "esri/geometry/Point",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/geometry/Polyline",
        "esri/renderers/SimpleRenderer",
        "esri/renderers/Renderer",
        "esri/request",
        "esri/Graphic",
        "esri/layers/support/Field",
      ]);
      const fileName2 = fileName[0];
      console.log(fileName2);
      var name = fileName2.split(".");
      // Chrome and IE add c:\fakepath to the value - we need to remove it
      // see this link for more info: http://davidwalsh.name/fakepath
      name = name[0].replace("c:\\fakepath\\", "");
      // document.getElementById("upload-status").innerHTML =
      //   "<b>Loading </b>" + name;

      // define the input params for generate see the rest doc for details
      // https://developers.arcgis.com/rest/users-groups-and-items/generate.htm
      var params = {
        name: name,
        targetSR: test.spatialReference,
        maxRecordCount: 1000,
        enforceInputFileSizeLimit: true,
        enforceOutputJsonSizeLimit: true
      };

      // generalize features to 10 meters for better performance
      // params.generalize = true;
      // params.maxAllowableOffset = 10;
      // params.reducePrecision = true;
      // params.numberOfDigitsAfterDecimal = 0;

      var myContent = {
        filetype: "shapefile",
        publishParameters: JSON.stringify(params),
        f: "json"
      };
      var portalUrl = "https://www.arcgis.com";

      const ese = document.getElementById("uploadForm");
      console.log(ese);
      // use the REST generate operation to generate a feature collection from the zipped shapefile
      request(portalUrl + "/sharing/rest/content/features/generate", {
        query: myContent,
        body: document.getElementById("uploadForm"),
        responseType: "json"
      })
        .then(function (response) {
          var layerName =
          response.data.featureCollection.layers[0].layerDefinition.name;
          console.log(layerName);
          // document.getElementById("upload-status").innerHTML =
          //   "<b>Loaded: </b>" + layerName;
          // addShapefileToMap(response.data.featureCollection);

          // addShapefileToMap.call(response.data.featureCollection)

          var sourceGraphics = [];
          var layers = response.data.featureCollection.layers.map(function (layer) {
            var graphics = layer.featureSet.features.map(function (feature) {
              return Graphic.fromJSON(feature);
            });
            sourceGraphics = sourceGraphics.concat(graphics);
            var featureLayer = new FeatureLayer({
              objectIdField: "FID",
              source: graphics,
              fields: layer.layerDefinition.fields.map(function (field) {
                return Field.fromJSON(field);
              })
            });
            return featureLayer;
            // associate the feature with the popup on click to enable highlight and zoom to
          });

          testMap.addMany(layers);
          test.goTo(sourceGraphics).catch(function (error) {
            if (error.name != "AbortError") {
              console.error(error);
            }
          });
          // document.getElementById("upload-status").innerHTML = "";
        })
        .catch(errorHandler);


      function errorHandler(error) {
        console.log(error.message);
        // document.getElementById("upload-status").innerHTML =
        //   "<p style='color:red;max-width: 500px;'>" + error.message + "</p>";
      }
    } catch (error) {
      console.log("EsriLoader: ", error);
    }
  }
  ngOnDestroy() {
    if (this._view) {
      this._view.container = null;
    }
  }
}
