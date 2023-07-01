import { Component, Input, OnInit } from '@angular/core';
import { IMessage } from '../../../core/models/IMessage';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input() owner !: boolean;
  @Input() Message !: IMessage;
  @Input() image !:string;
  constructor() { }

  ngOnInit(): void {
    // console.log(this.owner);
  }

}
