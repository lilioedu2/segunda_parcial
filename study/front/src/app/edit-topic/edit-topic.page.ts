import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, Platform, ToastController } from '@ionic/angular';
import axios from 'axios';
import { DataService, Message } from '../services/data.service';

@Component({
  selector: 'app-edit-topic',
  templateUrl: './edit-topic.page.html',
  styleUrls: ['./edit-topic.page.scss'],
})
export class EditTopicPage implements OnInit {
  public message!: Message;
  private data = inject(DataService);
  private activatedRoute = inject(ActivatedRoute);
  private platform = inject(Platform);
  topic : any = {};

  constructor(private toastController: ToastController,
   private router: Router) {}

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

        if( result.data.topic != null){
          this.topic = result.data.topic;
        }else{
          this.topic = {};
        }
       
      } else {
        console.log(result.data.error);
      }
      
    }).catch(error => {
      console.log(error.message);
    })
  }

  getBackButtonText() {
    const isIos = this.platform.is('ios')
    return isIos ? 'Inbox' : '';
 }

  saveTopic(){
    console.log("topic", this.topic);
    var data = {
      id : this.topic.id,
      create_date: this.topic.create_date,
      name: this.topic.name,
      topic_id: this.topic.topiuc_id,
      order: this.topic.order,
      priority: this.topic.priority,
      color: this.topic.color,
      owner_user_id: this.topic.owner_user_id 
    }
    console.log(data);

    let token =localStorage.getItem('token');
    let config = {
      headers : {
        "Authorization": token
      }
    }
    axios.post("http://localhost:4000/topics/update" , data, config)
    .then(  async result => {
      if (result.data.success == true) {
        console.log(result.data);
        this.presentToats ("Topico Guardado!!!");
          this.router.navigate(["/list-topics"]);
      } else {
        this.presentToats (result.data.error );
        
      }
      
    }).catch( async error => {
      this.presentToats (error.message.data.error );
    })
  }

  async presentToats (message : string){
    const toast = await this.toastController.create({
      message:message,
      duration: 1500,
      position: 'bottom',
      });

    await toast.present();
  }
}
