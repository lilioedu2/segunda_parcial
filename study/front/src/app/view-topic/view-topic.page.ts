import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule, Platform, ToastController } from '@ionic/angular';
import axios from 'axios';
import { DataService, Message } from '../services/data.service';

@Component({
  selector: 'app-view-topic',
  templateUrl: './view-topic.page.html',
  styleUrls: ['./view-topic.page.scss'],
})
export class ViewTopicPage implements OnInit {
  public message!: Message;
  private data = inject(DataService);
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);
  topic : any = {};

  constructor(private toastController: ToastController) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    //this.message = this.data.getMessageById(parseInt(id, 10));
    let token =localStorage.getItem('token');
    let config = {
      headers : {
        "Authorization": token
      }
    }
    axios.get("http://localhost:4000/topics/" + id, config)
    .then( result => {
      if (result.data.success == true) {
        this.topic = result.data.topic;
      } else {
        console.log(result.data.error);
        this.presentToats (result.data.error);
      }
      
    }).catch(error => {
      console.log(error.message);
      this.presentToats (error.message);
    })
  }

  getBackButtonText() {
    const isIos = this.platform.is('ios')
    return isIos ? 'Jose Aguilera' : '';
  }


  async presentToats (message : string){
    const toast = await this.toastController.create({
      message:message,
      duration: 1500,
      position: 'top',
      });

    await toast.present();
  }
}
