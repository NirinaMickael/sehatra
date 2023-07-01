import { Component, Input, OnInit } from '@angular/core';
import { UserService } from './core/service/user.service';

@Component({
  selector: 'app-page-user',
  templateUrl: './page-user.component.html',
  styleUrls: ['./page-user.component.scss']
})
export class PageUserComponent implements OnInit {
  constructor(private _user : UserService) { }
  ngOnInit(): void {
    sessionStorage.removeItem('otherId');
  }
}
