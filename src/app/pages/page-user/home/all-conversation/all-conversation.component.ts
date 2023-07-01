import { ChatServiceService } from './../../core/service/chat-service.service';
import { FetchState } from './../../core/models/FetchState';
import { delay, filter, map } from 'rxjs';

import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../core/service/user.service';
import { Router } from '@angular/router';
import { IWritting } from '../../core/models/IMessage';

@Component({
  selector: 'app-all-conversation',
  templateUrl: './all-conversation.component.html',
  styleUrls: ['./all-conversation.component.scss'],
})
export class AllConversationComponent implements OnInit {
  @Input() userId!: string | null;
  checkWritte : IWritting = {isWrite:false , from:""}; 
  allFriends!: any;
  allFriendState: FetchState = {
    isLoading: true,
    isFinish: false,
    isPedding: true,
  };
  index: number = 0;
  constructor(private _user: UserService, private _route: Router , private chatService : ChatServiceService) {}

  ngOnInit(): void {
      this._user
      .getAllUser('/api/alluser')
      .pipe(
        map((res) => {
          return res.filter((data: any) => data._id != this.userId);
        })
      )
      .subscribe((data) => {
        this.allFriendState.isLoading = false;
        this.allFriendState.isFinish = true;
        this.allFriends = data;
        this.handleClick(this.allFriends._id);
      });
      this.chatService.getWritting().
      subscribe(
        checkingWrite => {
          this.checkWritte = checkingWrite;
        }
      )
  }
  handleClick(_id: string) {
    this._route.navigate(['/pages/message/', _id]);
    this._user.idMessage$.next(_id);
  }
}
