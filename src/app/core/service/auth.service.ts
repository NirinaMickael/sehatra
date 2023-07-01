import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$ = new Subject<any>();
  url = environment.api;
  constructor( private _http : HttpClient) { }

  addUser(api : string , data : IUser , option : Object) : Observable<IUser> {
    return this._http.post<IUser>(this.url+api,data,option);
  }
  loginUser (api: string , data : IUser , option={}) :Observable<any>{
    return this._http.post<any>(this.url+api,data,option);
  }
  getUser(api: string , option={}) :Observable<any>{
    return this._http.post<any>(this.url+api,option);
  }
  user() : Subject<any>{
    return this.user$;
  }
  
}
