import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Storage } from '@ionic/storage';
import * as $ from 'jquery';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { NgForm, FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  constructor(    
    private router: Router,
    private dataService: DataService,
    public toastCtrl: ToastController ,
    private modalController: ModalController,
    private menu: MenuController) { }



    gotoChat() {
      this.router.navigate(['chat'])
      console.log("gotoChatclicked");
    }
  
    gotoAct() {
      this.router.navigate(['activity'])
      console.log("gotoActivityclicked");
    }

    gotoInchat() {
      this.router.navigate(['inchat'])
      console.log("gotoInchatclicked");
    }
  
    gotoDiscover() {
      this.router.navigate(['home'])
      console.log("gotoDiscoverclicked");
    }
    
    openFirst() {
      this.menu.enable(true, 'first');
      this.menu.open('first');
    }

    async logout(){
      console.log("logging out");
    
      const storage = new Storage();
      await storage.create();
    
      await storage.set('usersid', '');
      await storage.set('userpassword', '');
    
      this.router.navigate(['/login']);
    }

  ngOnInit() {
  }

}
