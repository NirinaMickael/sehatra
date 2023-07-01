import { ChatServiceService } from './../../core/service/chat-service.service';
import { IMessage } from './../../core/models/IMessage';
import { FormBuilder, Validators } from '@angular/forms';
import { IConversation } from './../../../../core/models/converstaion';
import { IUser } from './../../core/models/user';
import { IResponse } from './../../../../core/models/IResponse';
import { FetchState } from './../../core/models/FetchState';
import {
  map,
  Observable,
  switchMap,
  BehaviorSubject,
  mergeMap,
  delay,
} from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { UserService } from '../../core/service/user.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
})
export class ConversationComponent implements OnInit, OnChanges {
  _id!: string;
  ownId!: string | null;
  @Input() userId: string = '';
  convId!: string;
  message!: IMessage[];
  otherImage!: string;
  writting!: IMessage;
  chatData !:any;
  reaction !: any;
  registerForm = this.builder.group({
    messages: ['', Validators.required],
  });
  allMessageState: FetchState = {
    isLoading: true,
    isFinish: false,
    isPedding: true,
  };
  otherUser!: string;
  constructor(
    private _route: ActivatedRoute,
    private _user: UserService,
    private builder: FormBuilder,
    private chatService: ChatServiceService
  ) {
    this._id = _route.firstChild?.snapshot.params['idMessage'];
    this.ownId = sessionStorage.getItem('id');
  }
  ngOnChanges(changes: SimpleChanges): void {}
  ngOnInit(): void {
    console.log(this.userId);
    this._user
      .getAllUser('/api/alluser')
      .pipe(
        map((res) => {
          return res.filter((data: any) => data._id != this.userId);
        }),
        map((data) => (data[0] == '' ? this._id : data[0]._id)),
        mergeMap((res) => {
          return this.getConversationId(this.ownId, res);
        }),
        map((conv: IResponse) => {
          console.log('');
          this.convId = (conv.data as IConversation[])[0]._id;
          this.chatService.joinRoom(this.convId);
          return this.convId;
        }),
        mergeMap((convId) => {
          return this._user.viewMessage('/message/' + convId);
        })
      )
      .subscribe((messages) => {
        this.allMessageState = {
          isLoading: false,
          isFinish: true,
          isPedding: false,
        };
        this.message = messages.data as unknown as IMessage[];
      });

    // this._user.idMessage$
    //   .pipe(
    //     map((data) => (data == '' ? this._id : data)),
    //     mergeMap((res) => {
    //       return this.getConversationId(this.ownId, res);
    //     }),
    //     map((conv: IResponse) => {
    //       console.log("")
    //       this.convId = (conv.data as IConversation[])[0]._id;
    //       this.chatService.joinRoom(this.convId);
    //       return this.convId;
    //     }),
    //     mergeMap((convId) => {
    //       return this._user.viewMessage('/message/' + convId);
    //     })
    //   )
    // .subscribe((messages) => {
    //   this.allMessageState = {
    //     isLoading: false,
    //     isFinish: true,
    //     isPedding: false,
    //   };
    //   this.message = messages.data as unknown as IMessage[];
    // });
    // // this._user.idMessage$
    // //   .pipe(
    // //     map((data) => (data == '' ? this._id : data)),
    // //     mergeMap((otherId) => this.getOtherUser(otherId)),
    // //     map((otherId: IResponse) => (otherId.data as IUser).image)
    // //   )
    //   .subscribe((data) => (this.otherImage = data as string));
    this.chatService.getMessage().subscribe((message: any) => {
      this.message.push(message.data);
    });
    this.chatService.getReaction().subscribe((message)=>{
      this.reaction = message;
      setTimeout(()=>{
        this.reaction = undefined;
      },3000)
    })
  }
  getConversationId(
    ownId: string | null,
    otherId: string | null
  ): Observable<IResponse> {
    if (ownId == '') return new BehaviorSubject<any>('');
    return this._user.getConversation('/conversation/' + ownId + '/' + otherId);
  }
  getOtherUser(otherId: string): Observable<any> {
    return this._user.dataUser('/api/user/' + otherId);
  }
  handleSubmit() {
    let messages = this.registerForm.value;
    if (messages !== '') {
      let formData: IMessage = { ...messages, senderId: this.ownId };
      this.message.push({ ...formData, createdAt: new Date() });
      this._user
        .SendMessage('/message/' + this.convId + '/send', formData)
        .subscribe((data) => {
          this.chatService.sendMessage(data);
          this.chatService.writting({ from: this.ownId, isWrite: false });
          this.registerForm.setValue({ messages: '' });
        });
    }
  }
  handleChange(event: Event) {
    let value = (event.target as HTMLInputElement).value;
    if (value !== '') {
      this.chatService.writting({ from: this.ownId, isWrite: true });
    } else {
      this.chatService.writting({ from: this.ownId, isWrite: false });
    }
  }
  handleReaction(id:number){
    this.chatService.sendReaction({id:id,conversationId:this.convId})
  }
}
