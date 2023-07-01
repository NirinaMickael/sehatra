import { NgxSpinnerService } from 'ngx-spinner';
import { IUser } from './../core/models/user';
import { IResponse } from './../../../core/models/IResponse';
import { FetchState } from './../core/models/FetchState';
import { AfterContentInit, Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserService } from '../core/service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterContentInit {
  userId!: string ;
  idMessage!: string | null;
  conversation: any;
  isChatOpen: boolean = false;
  user: any;
  openLive : boolean = false;
  stateUser: FetchState = {
    isLoading: true,
    isPedding: true,
    isFinish: false,
  };
  constructor(
    private _user: UserService,
    private _route: ActivatedRoute,
    private route: Router,
    private SpinnerService : NgxSpinnerService
  ) {}
  ngOnInit(): void {
    this.idMessage = this._route.firstChild?.snapshot.params['idMessage'];
    this.userId = sessionStorage.getItem('id') as string;
    this.SpinnerService.show();
    this._user.dataUser('/api/user/' + this.userId).subscribe({
      next: (res) => {
        this.stateUser.isLoading = false;
        this.stateUser.isFinish = true;
        this.user = res;
        this._user.user$.next(res.data as IUser);
        this.SpinnerService.hide();
      },
      error: (err) => {
        err.subscribe((res: IResponse) => {
          alert(res.message);
          this.route.navigateByUrl('auth');
        });
      },
    });
  }
  ngAfterContentInit(): void {
    this.isChatOpen = this.idMessage !== null && this.idMessage ? true : false;
  }
  handleLive(e:boolean){
    this.openLive = e;
  }

}
