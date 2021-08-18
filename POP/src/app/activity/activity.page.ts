import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Location } from '@angular/common';



@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss'],
})
export class ActivityPage implements OnInit {

  constructor(    
    public toastCtrl: ToastController ,
    private location: Location
    ) { }

  ngOnInit() {
  }

  back(){
    this.location.back();
  }

}
