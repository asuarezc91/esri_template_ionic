import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'protractor';
import { Router, Data } from '@angular/router';
import { DataApiService } from 'src/app/services/data-api.service';

@Component({
  selector: 'app-widget-a-page',
  templateUrl: './widget-a-page.component.html',
  styleUrls: ['./widget-a-page.component.scss'],
})
export class WidgetAPageComponent implements OnInit {




  constructor(private dataApi: DataApiService) { }


  ngOnInit() { }

  saverange(event) {

    let fileName = event.target.value.toLowerCase();

    if (fileName.indexOf(".zip") !== -1) {
      const a = "a";
      const b = document.getElementById("uploadForm");
      console.log(b); 
      //is file a zip - if not notify user
      // generateFeatureCollection(fileName);
      let arraySend = [fileName, a]; 

      this.dataApi.reservation$.emit(arraySend);

    } else {
      alert("this file isn´t .zip format")
    }


  }

  onClick(){
 
    this.dataApi.buttonToMap$.emit(true); 

  }



}






