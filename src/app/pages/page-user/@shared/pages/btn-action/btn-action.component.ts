import { Component, Input, OnInit } from '@angular/core';
import { Button } from '../../../core/models/button';
import { UserService } from '../../../core/service/user.service';

@Component({
  selector: 'app-btn-action',
  templateUrl: './btn-action.component.html',
  styleUrls: ['./btn-action.component.scss'],
})
export class BtnActionComponent implements OnInit {
  @Input() btn!: Button[];
  @Input()  otherId !:string;
  @Input() ownId !:string;
  constructor(private _user : UserService) {}
  ngOnInit(): void {

  }
  handleClick(action: any) {
    action(this.otherId);
  }
}
