import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { ListTopicsPage } from './list-topics.page';
import { ListTopicsPageRoutingModule } from './list-topics-routing.module';
import { MessageComponentModule } from '../message/message.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessageComponentModule,
    ListTopicsPageRoutingModule
  ],
  declarations: [ListTopicsPage]
})
export class ListTopicsPageModule {}
