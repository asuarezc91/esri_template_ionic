
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
  private _baseman = "dark-man";

  private _loaded = false;
  private _view: esri.MapView = null;
  // private _featureL: esri.FeatureLayer = null;
  // private _req: any;
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


      // const url: string = "https://services6.arcgis.com/30currU8oaQeVHvW/arcgis/rest/services/L%C3%ADneas_de_guagua/FeatureServer/0";
      // this._featureL = new FeatureLayer(url);


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
      const mainView = this._view;
      const mainMap = this._map;
      this.newLayer(fileName, mainView, mainMap);
    })


    this.dataApi.buttonToMap$.subscribe(man => {
      console.log(man);
      this.tesFunc();
    })

  }

  async newLayer(fileName, mainView, mainMap) {
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
      let name = fileName2.split(".");
      name = name[0].replace("c:\\fakepath\\", "");
      let params = {
        name: name,
        targetSR: mainView.spatialReference,
        maxRecordCount: 1000,
        enforceInputFileSizeLimit: true,
        enforceOutputJsonSizeLimit: true
      };

      let myContent = {
        filetype: "shapefile",
        publishParameters: JSON.stringify(params),
        f: "json"
      };
      let portalUrl = "https://www.arcgis.com";
      // use the REST generate operation to generate a feature collection from the zipped shapefile
      request(portalUrl + "/sharing/rest/content/features/generate", {
        query: myContent,
        body: document.getElementById("uploadForm"),
        responseType: "json"
      })
        .then(async function (response) {
          // var layerName =
          //   response.data.featureCollection.layers[0].layerDefinition.name;
          // console.log(layerName);
          alert("loaded");

          let sourceGraphics = [];
          let layers = await response.data.featureCollection.layers.map(function (layer) {
            //Check if the layer is a point layer
            if (layer.featureSet.geometryType === "esriGeometryPoint") {
              let graphics = layer.featureSet.features.map(function (feature) {
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
              // console.log(featureLayer);
              const source = featureLayer.source.sourceJSON;
              // console.log(sourceGraphics);
              return featureLayer;
            } else {
              alert("This layer isn't a Point layer")
            }
            // associate the feature with the popup on click to enable highlight and zoom to
          });
          //Only two layers in the Map, to do this I have to create a let with a cont, if cont <= 2 , add if not, "you only can load two layers"
          const numberLayers = await mainMap.layers.items;
          // console.log(numberLayers);

          // console.log(mainMap.layers.items);
          if (numberLayers.length <= 1) {
            alert("good")

            //Aquí hay una asincronía bestial, recuperamos la primera capa con un [0] , pero necesitamos acceder a la segunda
            // console.log(numberLayers[0])

          } else { alert("bad, a lot of layers") };

          // if (numberLayers.length <= 1) {
          //   debugger;
          //   console.log(numberLayers.shift());
          //   const tested = numberLayers.shift();
          //   if ( tested != undefined) {
          //     alert("draw!");
          //     let layerTwo = layers[1];
          //     layerTwo.renderer = {
          //       type: "simple", 
          //       symbol: {
          //         type: "simple-marker", 
          //         size: 6,
          //         color: "black",
          //         outline: { 
          //           width: 0.5,
          //           color: "white"
          //         }
          //       }
          //     };
          //   }


          if (numberLayers.length === 1) {
            alert("the second color");
            layers[0].renderer = {
              type: 'simple',
              label: "",
              description: "",
              symbol: {
                type: "picture-marker",
                url: 'https://static.arcgis.com/images/Symbols/Firefly/FireflyC5.png',
                width: '24px',
                height: '24px'
              }
            }
          } else {
            layers[0].renderer = {
              type: 'simple',
              label: "",
              description: "",
              symbol: {
                type: "picture-marker",
                url: 'https://static.arcgis.com/images/Symbols/Firefly/FireflyC1.png',
                width: '24px',
                height: '24px'
              }
            }
          }


          console.log(layers);



          mainMap.addMany(layers);
          mainView.goTo(sourceGraphics).catch(function (error) {
            if (error.name != "AbortError") {
              console.error(error);
            }
          });
        })
        .catch(errorHandler);
      function errorHandler(error) {
        console.log(error.message);
      }
    } catch (error) {
      console.log("EsriLoader: ", error);
    }

    //works very well !! 
    console.log(this._baseman);

  }


  async tesFunc() {
    alert("man");

    console.log(this._basemap);
    console.log(this._baseman);



  }



  ngOnDestroy() {
    if (this._view) {
      this._view.container = null;
    }
  }
}
