import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllConversationComponent } from './all-conversation/all-conversation.component';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../@shared/shared.module';
import { ConversationComponent } from './conversation/conversation.component';
import { HeaderChatComponent } from './header-chat/header-chat.component';
import { OpenChatComponent } from './@feature/open-chat/open-chat.component';
import { MessageComponent } from './@feature/message/message.component';
@NgModule({
  declarations: [
    AllConversationComponent,
    ConversationComponent,
    HomeComponent,
    HeaderChatComponent,
    OpenChatComponent,
    MessageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    NgxSpinnerModule
   ]
})
export class HomeModule { }
