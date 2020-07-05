import { Component, ElementRef, ViewChild } from '@angular/core';
import { loadModules } from 'esri-loader';
import { DataApiService } from 'src/app/services/data-api.service';
import { maximumNumberOfFeatures } from 'esri/views/3d/support/LayerPerformanceInfo';
import { TestBed } from '@angular/core/testing';
import { escapeRegExp } from '@angular/compiler/src/util';
import { hasUncaughtExceptionCaptureCallback } from 'process';
//ESRI
// mapView es la view en este caso!! 
import Map from "esri/Map"
import request from "esri/request"
import esriConfig from "esri/config"
import Field from  "esri/layers/support/Field"



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})

export class MapComponent {
  // Get a container link for map place
  @ViewChild('mapView', { static: true }) private readonly mapViewElement: ElementRef;
  // main map view
  private mapView;
  title = 'ArcGIS angular map';

  mapping: any;







  constructor(private dataApi: DataApiService) {

    loadModules(['esri/Map', 'esri/views/MapView', 'esri/layers/MapImageLayer', 'esri/request', "esri/config"])
      .then(([Map, MapView, MapImageLayer, request, config]: [__esri.MapConstructor, __esri.MapViewConstructor,
        __esri.MapImageLayerConstructor, __esri.request, __esri.config]) => {



        const mapProperties = {
          basemap: 'dark-gray'
        };
        // create map by default properties
        const map = new Map(mapProperties);
        // set default map view properties
        // container - element in html-template for locate map
        // zoom - default zoom parameter, value from 1 to 18
        const mapViewProperties = {
          container: this.mapViewElement.nativeElement,
          zoom: 3,
          map
        };
        // create map view by default properties
        this.mapView = new MapView(mapViewProperties);

  

        // Set service properties
        // url - this address to MapServer from ArcGIS Enterprise
        // sublayers - this are the settings for the inner layers of the service.
        // id = 1 it tell us that will be displayed only one layer with the identifier
        const oilSandLayerProperties = {
          url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/OilSandsProjectBoundaries/MapServer',
          sublayers: [{ id: 1 }]
        };
        // Create map image layer by properties
        const oilSandsLayer = new MapImageLayer(oilSandLayerProperties);
        // Adding a layer into map
        map.add(oilSandsLayer);
        

 

      });



  }


  ngOnInit() {
    this.dataApi.reservation$.subscribe(data => {
      console.log(data);
      // this.generateFeatureCollection(data);
    })

  }


  // man() {
  //   const test = new Map ();
  //   console.log(test); 
  // }










  //       generateFeatureCollection(fileName) {
  //       var name = fileName.split(".");
  //       // Chrome and IE add c:\fakepath to the value - we need to remove it
  //       // see this link for more info: http://davidwalsh.name/fakepath
  //       name = name[0].replace("c:\\fakepath\\", "");

  //       document.getElementById("upload-status").innerHTML =
  //         "<b>Loading </b>" + name;

  //       // define the input params for generate see the rest doc for details
  //       // https://developers.arcgis.com/rest/users-groups-and-items/generate.htm
  //       var params = {
  //         name: name,
  //         targetSR: this.mapView.spatialReference,
  //         maxRecordCount: 1000,
  //         enforceInputFileSizeLimit: true,
  //         enforceOutputJsonSizeLimit: true
  //       };


  //       // generalize features to 10 meters for better performance
  //       // params.generalize = true;
  //       // params.maxAllowableOffset = 10;
  //       // params.reducePrecision = true;
  //       // params.numberOfDigitsAfterDecimal = 0;

  //       var myContent = {
  //         filetype: "shapefile",
  //         publishParameters: JSON.stringify(params),
  //         f: "json"
  //       };

  //       let portalUrl = "https://www.arcgis.com";

  //       let options = {
  //         query: myContent,
  //         body: document.getElementById("uploadForm"),
  //         responseType: "json"
  //       }

  //       // use the REST generate operation to generate a feature collection from the zipped shapefile
  //       request(portalUrl + "/sharing/rest/content/features/generate", options)
  //         .then(function (response) {
  //           var layerName =
  //             response.data.featureCollection.layers[0].layerDefinition.name;
  //           document.getElementById("upload-status").innerHTML =
  //             "<b>Loaded: </b>" + layerName;
  //           addShapefileToMap(response.data.featureCollection);
  //         })
  //         .catch(errorHandler);
  //     }



  //     function errorHandler(error) {
  //       document.getElementById("upload-status").innerHTML =
  //         "<p style='color:red;max-width: 500px;'>" + error.message + "</p>";
  //     }

  //     function addShapefileToMap(featureCollection) {
  //       // add the shapefile to the map and zoom to the feature collection extent
  //       // if you want to persist the feature collection when you reload browser, you could store the
  //       // collection in local storage by serializing the layer using featureLayer.toJson()
  //       // see the 'Feature Collection in Local Storage' sample for an example of how to work with local storage
  //       var sourceGraphics = [];

  //       var layers = featureCollection.layers.map(function (layer) {
  //         var graphics = layer.featureSet.features.map(function (feature) {
  //           return Graphic.fromJSON(feature);
  //         });
  //         sourceGraphics = sourceGraphics.concat(graphics);
  //         var featureLayer = new FeatureLayer({
  //           objectIdField: "FID",
  //           source: graphics,
  //           fields: layer.layerDefinition.fields.map(function (field) {
  //             return Field.fromJSON(field);
  //           })
  //         });
  //         return featureLayer;
  //         // associate the feature with the popup on click to enable highlight and zoom to
  //       });
  //       map.addMany(layers);
  //       view.goTo(sourceGraphics).catch(function (error) {
  //         if (error.name != "AbortError") {
  //           console.error(error);
  //         }
  //       });

  //       document.getElementById("upload-status").innerHTML = "";
  //     }
  //   });

  // }








}




