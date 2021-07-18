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
  selector: 'app-inchat',
  templateUrl: './inchat.page.html',
  styleUrls: ['./inchat.page.scss'],
})
export class InchatPage implements OnInit {

  messages = [
    {
      user:'Joe Kwang',
      msg: 'hey whats up, you voted for the me as the best lecturer yet'
    },
    {
      user:'You',
      msg: 'Sorry Joe... I have already voted for Mr Melvin as the best lecturer in Ngee Ann Poly BRO',
    }
  ];

  currentUser = 'You'


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
