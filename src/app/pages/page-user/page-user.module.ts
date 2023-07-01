import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageUserRoutingModule } from './page-user-routing.module';
import { PageUserComponent } from './page-user.component';
import { HomeModule } from './home/home.module';


@NgModule({
  declarations: [
    PageUserComponent,
  ],
  imports: [
    CommonModule,
    PageUserRoutingModule,
    HomeModule
  ]
})
export class PageUserModule { }
