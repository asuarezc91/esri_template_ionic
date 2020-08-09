import { Injectable, EventEmitter } from '@angular/core';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';




@Injectable({
  providedIn: 'root'
})
export class DataApiService {


  //Observable 
  reservation$ = new EventEmitter <object>(); 
  
  buttonToMap$ = new EventEmitter <boolean> (); 


  constructor() { }



 
}
