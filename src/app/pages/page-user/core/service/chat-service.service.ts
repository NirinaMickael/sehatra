import { IMessage, IWritting } from './../models/IMessage';
import { IResponse } from './../../../../core/models/IResponse';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map, Observable, BehaviorSubject, observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {
  isWritting = new BehaviorSubject<boolean>(false);
  constructor( private socket : Socket) { 

  }
  sendMessage(buffer  : IResponse){
    console.log("===>",buffer)
    this.socket.emit('sendMessage', buffer);
  }
  sendReaction(payload:any){
    this.socket.emit('reaction',payload)
  }
  getReaction(){
    return new Observable((observer)=>{
      this.socket.on('receivedReaction',(data:any)=>{
          observer.next(data);
      })
    })
  }
  getMessage() {
    return new Observable((observer)=>{
      this.socket.on('received',(data: unknown)=>{
        observer.next(data);
      })
    })
  }
  joinRoom(roomId : string){
    this.socket.emit('joinRoom',roomId)
  }
  writting(data : IWritting){
    this.socket.emit('entrainEcrire',data);
  }
  getWritting(){
    return new Observable<IWritting>((observer)=>{
      this.socket.on('writting',(data : IWritting)=>{
        observer.next(data);
      })
    })
  }
}
