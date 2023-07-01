import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { IUser } from 'src/app/core/models/user';
import { AuthService} from 'src/app/core/service/auth.service';

const option = {
  responseType : 'text',
  observe : 'response'
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private _userApi : AuthService ,private _userForm : FormBuilder) { }

  ngOnInit(): void {
  }
  handleSubmit(event : Event){
    event.preventDefault();
    const data : IUser = this.registerForm.value ;
    this._userApi.addUser("/api/createuser",data,option).subscribe(data=>console.log(data));
  }
  registerForm = this._userForm?.group({
    username : ["",[Validators.required,Validators.minLength(3)]],
    email : ["",[Validators.email,Validators.required]],
    password : ["",Validators.required]
  })
}
