import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { NgForm, FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Plugins, CameraResultType,CameraSource, CameraPhoto, CameraPlugin, CameraDirection } from '@capacitor/core';
import { Location } from "@angular/common";

const { Camera }= Plugins;

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {

  username: string;
  usergender: string;
  useremail: string;
  userpassword: string;
  userdob: string;
  usercontactno: number;
  userlink: string;
  userbio: string;

  base64Image: string;
  captureProgress = 0;

  segment: string;

  constructor(
    private router: Router,
    private dataService: DataService,
    public toastCtrl: ToastController ,
    private modalController: ModalController,
    private location: Location,
  ) { }

  @Input() currentsid: string;
  userinfos: any = [];

  ngOnInit() {
    this.segment = 'info';
    this.retrieveUser();
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    // console.log(this.segment);
  }
  // formpic = new FormGroup({
  //   useravatarurl: new FormControl(),
  // })

  form = new FormGroup({
    // useravatarurl: new FormControl(),
    username: new FormControl(),
    usergender: new FormControl(),
    useremail: new FormControl(),
    userpassword: new FormControl(),
    userdob: new FormControl(),
    usercontactno: new FormControl(),
    userlink: new FormControl(),
    userbio: new FormControl(),

    userskill1: new FormControl(),
    userskill2: new FormControl(),
    userskill3: new FormControl(),
    userskill4: new FormControl()
  });

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

  dismiss(userinfo) {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss(userinfo);
  }

  retrieveUser(){
    // console.log("retrieve Discover");
  
    this.dataService.getProfile().subscribe(response => {
      if(response != null){  
        this.userinfos = response;
      }else{
        this.showErrorToast('Error');
      }
  })
  }

async putToDB(){

  const data = this.form.value;
  console.log('sending userPostData: ' + JSON.stringify(data));
  console.log(this.base64Image);

//     if(response != null){  
this.dataService.updateuser(data, this.currentsid).subscribe(response => {
if(response != null){
  this.showToast('Posted successfully');
  this.dismiss(this.form.value);
}else{
  this.showErrorToast('Posted Unsuccessfully');
}
});
};

async updateImage() {
  const image = await Camera.getPhoto({
    quality: 100,
    allowEditing: true,
    resultType: CameraResultType.DataUrl,
    source: CameraSource.Prompt,
    preserveAspectRatio: true,
    width: 150,
    height: 150,
    direction: CameraDirection.Rear,
    correctOrientation: true,
    saveToGallery: true,
    presentationStyle: 'fullscreen',
  }).catch((e) => {
    throw new Error(e);
  });
this.base64Image = image.dataUrl;
console.log (this.base64Image);

let data = {
  useravatarurl: this.base64Image
}

this.dataService.updateuserpic(data, this.currentsid).subscribe(response => {
if(response != null){
  this.showToast('Changed Profile Photo successfully');
  // this.dismiss(this.form.value);
}else{
  this.showErrorToast('Changed Profile Photo Unsuccessfully');
}
});
};


}
