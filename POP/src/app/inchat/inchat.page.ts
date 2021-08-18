import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Location } from '@angular/common';


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
    public toastCtrl: ToastController ,
    private location: Location
    ) { }

  ngOnInit() {
  }

  back(){
    this.location.back();
  }

}
