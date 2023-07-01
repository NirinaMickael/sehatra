import { IMessage } from './../models/IMessage';
import { IResponse } from './../../../../core/models/IResponse';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { AuthService } from 'src/app/core/service/auth.service';
import { environment } from 'src/environments/environment';
import { IUser } from '../models/user';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  getOtherUser(otherId: string): any {
    throw new Error('Method not implemented.');
  }
  user$ = new BehaviorSubject<any>('');
  convesation$ = new BehaviorSubject<boolean>(false);
  frappe$ = new BehaviorSubject<any>('');
  idMessage$ = new BehaviorSubject<string>("");
  url = environment.api;
  constructor(private _httpClient: HttpClient, private _user: AuthService) {}
  searchUser(user: string): Observable<any> {
    return this._httpClient.get(environment.api+'/api/'+user);
  }
  dataUser(api : string,option={}): Observable<IResponse> {
    return this._user.getUser(api,option);
  }
  AddFriend(id : string){
    console.log("user is added")  
  }
  getConversation(api: string): Observable<IResponse> {
    return this._httpClient.get<IResponse>(this.url+api);
  }
  viewMessage(api: string , option = {}): Observable<IResponse> {
    return this._httpClient.get<IResponse>(this.url+api,option);
  }
  SendMessage(api : string , data : IMessage) : Observable<IResponse>{
    return this._httpClient.post<IResponse>(this.url+api,data)
  }
  getAllUser(api: string): Observable<any> {
    return this._httpClient.get(this.url+api);
  }
  getImage(api: string, option = {}): Observable<any> {
    return this._httpClient.get(this.url+api, option).pipe(
      map( (data: any) => this._arrayBufferToBase64(data))
    )
  }
  uploadImage (file : File ,api : string , option = {}) {
    let formParams = new FormData();

    formParams.append('image',file);

    return this._httpClient.put(this.url+api,formParams,option);
  }
  _arrayBufferToBase64( buffer : any) : string {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
       binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
  }
}

