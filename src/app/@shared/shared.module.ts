import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './pages/header/header.component';
import { LoadingComponent } from './pages/loading/loading.component';




@NgModule({
  declarations: [
    HeaderComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule
  ],exports : [
    LoadingComponent
  ]

})
export class SharedModule { }
