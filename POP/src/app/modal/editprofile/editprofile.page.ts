import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Storage } from '@ionic/storage';
import * as $ from 'jquery';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {

  constructor(
    private router: Router,
    private dataService: DataService,
    public toastCtrl: ToastController ,
    private modalController: ModalController,
  ) { }

  @Input() currentsid: string;
  userinfos: any = [];

  ngOnInit() {
    this.retrieveUser(this.currentsid);
  }

  async showToast(data: any) {
    const toast = await this.toastCtrl.create({
      message: data,
      duration: 2000,
      position: 'top',
      color: 'success'
    });
    toast.present();
  }

  async showErrorToast(data: any) {
    const toast = await this.toastCtrl.create({
      message: data,
      duration: 2000,
      position: 'top',
      color: 'danger'
    });
    toast.present();
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss();
  }

  // retrieveUser(){
  //   // console.log("retrieve Discover");
  
  //   this.dataService.getProfile().subscribe(response => {
  //     if(response != null){  
  //     //this.showToast('Logged in');
  //       // console.log('link:' + 'https://student.amphibistudio.sg/10187403A/POP/db/posts.php?x=');
  //       // console.log(response);
  //       this.userinfo = response;
  //     }else{
  //       //this.showErrorToast('Wrong userid/ password');
  //     }
  // })
  // }

  retrieveUser(currentsid){
    // console.log("retrieve Discover");
  
    this.dataService.getProfile().subscribe(response => {
      if(response != null){  
        this.userinfos = response;
      }else{
        this.showErrorToast('Error');
      }
  })
  }

//     $("#fixed-profile").html(
//       `
//       <div class="leftProfile" style="width: 45%;">
//         <img src="${user.useravatarurl}"  style="object-fit: cover; width: 80px; height: 80px; border-radius: 50%; margin: 10px auto 20px; display: block;">
//       </div>
//       <div class="rightProfile" style="width: 55%; margin 0 20px; ">
//         <strong>${user.userfirstname} ${user.userlastname}</strong><img src="${user.schoolbadge}" style="width:30px; vertical-align:middle; margin-left:5px">
//         <p>@${user.username}</p>
//         <p>${user.userschool} | ${user.userdiploma} | Year ${user.useryear}</p>
//       </div>
//         `
// );


}
