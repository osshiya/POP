import { Component, OnInit } from '@angular/core';
import { Plugins, CameraResultType,CameraSource, CameraPhoto, CameraPlugin, CameraDirection } from '@capacitor/core';
import { Location } from "@angular/common";
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Storage } from '@ionic/storage';
import * as $ from 'jquery';
import { ToastController } from '@ionic/angular';

const { Camera }= Plugins;

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {

  image: string;
  captureProgress = 0;

  constructor(
    private dataService: DataService,
    private location: Location,
    public toastCtrl:ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    // this.takePicture();
  }

  ionViewWillEnter(){
    this.takePicture();
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


  //async captureImage(){}

    async takePicture() {
      const image = await Camera.getPhoto({
        quality: 100,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Prompt,
        preserveAspectRatio: true,
        width: 500,
        height: 500,
        direction: CameraDirection.Rear,
        correctOrientation: true,
        saveToGallery: true,
        presentationStyle: 'fullscreen',
      }).catch((e) => {
        this.location.back();
        throw new Error(e);
      });
    this.image = image.dataUrl;
    this.postToDB();
    // console.log(this.image);
    // return  this.image = image.dataUrl;
    };
    
    async postToDB(){
      const storage = new Storage();
      await storage.create();
      const currentsid = await storage.get('usersid');

      console.log(this.image);

      let userPostData = {
        postsdesc: "",
        url: "",
        date: "", 
        type: "",
        name: this.image,
        id: "",
        usersid: currentsid,
      }

      const result = userPostData;
    //   this.dataService.getCheck(this.userid).subscribe(response => {
    //     if(response != null){  
    this.dataService.upload(result).subscribe(response => {
    if(response != null){  
      console.log(response);        
      this.showToast('Posted successfully');
      this.router.navigate(['/home']);
    }else{
      this.showErrorToast('Posted Unsuccessfully');
      this.router.navigate(['/home']);
    }
  });
    };


};