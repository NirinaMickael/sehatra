import { AfterViewInit, Component, ElementRef, OnInit, ViewChild,Output } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, fromEvent, map, switchMap } from 'rxjs';
import { UserService } from '../../../core/service/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit,AfterViewInit {
  value : String = "";
  @ViewChild("textInput",{static:true}) input !: ElementRef;
  users : any;
  currentUrl !: string;
  constructor(private _user : UserService,private _route : Router) { }
  ngOnInit(): void {  
     this.currentUrl = this._route.url;
  }
  ngAfterViewInit(): void {
    fromEvent(this.input.nativeElement,'input').pipe(
      map(toAnyValue => toAnyValue as any),
      map(tovalue => tovalue.target?.value),
      filter(text=>text != ""),
      debounceTime(100),
      switchMap(params=>this._user.searchUser(params)),
      map(res=>res["data"])
    ).subscribe(res=>{
      this.users=res;
    });
  }
  onChange(event : any) : void {
    this.value = event.target?.value;
    if(this.value==="") this.users = [];
  }
  // handleNavigate(id : string){
  //   this._route.navigateByUrl('pages/profil')
  // }
  handleClick(id : string){
    sessionStorage.setItem('otherId',id);
  }
  handleUrl(username : string) : string {
    // ../profil/{{item.username}}
    return   this.currentUrl === '/pages/home' ? `../profil/${username}` : `profil/${username}` 
  }
}
