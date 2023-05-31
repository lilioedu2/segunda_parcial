import { Component, inject, OnInit } from '@angular/core';
import { ActionSheetController, RefresherCustomEvent, ToastController } from '@ionic/angular';
import axios from 'axios';
import { MessageComponent } from '../message/message.component';

import { DataService, Message } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-topics',
  templateUrl: 'list-topics.page.html',
  styleUrls: ['list-topics.page.scss'],
})
export class ListTopicsPage implements OnInit{
  private data = inject(DataService);

  topics : any = [];
  result : string | undefined;

  constructor( private toastController: ToastController,
    private router: Router,
    private actionSheetCtrl: ActionSheetController) {
    
  }

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  getMessages(): Message[] {
    return this.data.getMessages();
  }
  
  ionViewWillEnter(): void {
    let token = localStorage.getItem('token');
    if (!token){
      this.router.navigate(["/login"]);
    }
    this.getTopics();
  }

  ngOnInit(): void {
    //this.getUsers();
  }

  getTopics () {
    let token =localStorage.getItem('token');
    let config = {
      headers : {
        "Authorization": token
      }
    }
    axios.get("http://localhost:4000/topics/list", config)
    .then( result => {
      //console.log(result);
      if (result.data.success == true) {
        this.topics = result.data.topicos;
      } else {
        console.log(result.data.error);
        this.presentToats (result.data.error );
      }
      
    }).catch(error => {
      console.log(error.message);
      this.presentToats (error.message);
    })
  }


  async presentToats (message : string){
    const toast = await this.toastController.create({
      message:message,
      duration: 1500,
      position: 'top',
      });

    await toast.present();
  }

  
  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Logout',
          role: 'destructive',
          data: {
            action: 'Logout',
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
    console.log(result.data.action);
    /* this.result = JSON.stringify(result, null, 2); */
    if(result.data.action == 'Logout'){
      this.logout();
    }
  }

  logout () {
    console.log("Logout apretado")
    let token =localStorage.getItem('token');
    let config = {
      headers : {
        "Authorization": token
      }
    }

    console.log(config);
    axios.post("http://localhost:4000/user/logout", "" , config)
    .then( async result => {
      console.log(result)
      if (result.data.success == true) {
        console.log("success del logout");
        localStorage.removeItem('token');
        this.presentToats ("Hasta Pronto!!!");
      } else {
        console.log(result.data.error);
        this.presentToats (result.data.error );
      }
      
    }).catch(error => {
      console.log(error.message);
      this.presentToats (error.message);
    })

    this.router.navigate(["/login"]);
  }

}
