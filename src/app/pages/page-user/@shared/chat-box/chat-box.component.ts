import { IConversation } from './../../../../core/models/converstaion';
import { FetchState } from './../../core/models/FetchState';
import { map, mergeMap } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { IMessage } from '../../core/models/IMessage';
import { UserService } from '../../core/service/user.service';
import { IUser } from '../../core/models/user';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit {
  @Input() otherId !:string;
  @Input() ownId !: string;
  @Input() user !: IUser;
  messages!: IMessage[];
  ownImage !: string | undefined;
  messageState : FetchState = {
    isLoading : true,
    isFinish : false,
    isPedding : false
  }
  constructor(private _user : UserService) { }

  ngOnInit(): void {
    this._user.getConversation('/conversation/'+this.ownId+'/'+this.ownId).pipe(
      map( res  => (res.data as IConversation[])[0]._id),
      mergeMap(convId =>{
        return  this._user.viewMessage('/message/'+convId);
      })
    ).subscribe(
      message => {
        this.messageState.isLoading = false;
        this.messageState.isFinish = true;
        this.messages = (message.data as unknown as IMessage[])
      }
    )
    this._user.dataUser('/api/user/'+this.ownId).subscribe(
      data => {
        return this.ownImage = (data.data as IUser).image ;
      }
    )
  }

}
