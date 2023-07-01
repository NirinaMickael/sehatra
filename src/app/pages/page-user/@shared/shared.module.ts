import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './pages/header/header.component';
import { SearchComponent } from './pages/search/search.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BtnActionComponent } from './pages/btn-action/btn-action.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { LoadingComponent } from './pages/loading/loading.component';
import { VirtuelComponent } from './virtuel/virtuel.component';




@NgModule({
  declarations: [
    HeaderComponent,
    SearchComponent,
    BtnActionComponent,
    ChatBoxComponent,
    LoadingComponent,
    VirtuelComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports : [
    HeaderComponent,
    SearchComponent,
    BtnActionComponent,
    ChatBoxComponent,
    LoadingComponent,
    VirtuelComponent
  ]
})
export class SharedModule { }
