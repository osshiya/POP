import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Location } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  constructor(    
    public toastCtrl: ToastController ,
    private location: Location,
    private router: Router
    ) { }


  ngOnInit() {
  }

  gotoInchat() {
    this.router.navigate(['inchat'])
    console.log("gotoInchatclicked");
  }

  back(){
    this.location.back();
  }

}
