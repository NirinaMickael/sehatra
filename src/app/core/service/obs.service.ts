import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, observable, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObsService {
  frappe$ = new BehaviorSubject<any>("");
  constructor( private _httpClient : HttpClient) { 
    
  }
  GetUser( user : string): Observable<any> {
    return this._httpClient.get(`http://localhost:3000/api/${user}`)
  }
}


