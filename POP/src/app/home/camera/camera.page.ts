import { Component, OnInit } from '@angular/core';
import { Plugins, CameraResultType,CameraSource, CameraPhoto, CameraPlugin, CameraDirection } from '@capacitor/core';
import { Location } from "@angular/common";
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Storage } from '@ionic/storage';
import * as $ from 'jquery';
import { ToastController } from '@ionic/angular';
import { NgForm, FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActionSheetController } from '@ionic/angular';

const { Camera }= Plugins;

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {

  base64Image: string;
  captureProgress = 0;

    type: string;
    desc: string;

    pjtitle: string;
    pjdesc: string;
    pjteam: string;


    tags: any = [];

    segment: string;

  constructor(
    private dataService: DataService,
    private location: Location,
    public toastCtrl:ToastController,
    private router: Router,
    public actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {
    // this.takePicture();
    this.segment = 'post';
  }

  ionViewWillEnter(){
    this.takePicture();
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    // console.log(this.segment);
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

  form = new FormGroup({
    type: new FormControl(),
    desc: new FormControl(),

    pjtitle: new FormControl(),
    pjdesc: new FormControl(),
    pjteam: new FormControl()
  });
  //actionsheet pop out for actions

  //async captureImage(){}
  cancelOP(){
    this.location.back();
  }

    async takePicture() {
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
        this.cancelOP();
        throw new Error(e);
      });
    this.base64Image = image.dataUrl;
    console.log (this.base64Image);
    // this.postToDB(f);
    // console.log(this.image);
    // return  this.image = image.dataUrl;
    };
    
    async postToDB(posting, description){
      const storage = new Storage();
      await storage.create();
      const currentsid = await storage.get('usersid');

      // const result = form.value;
      // console.log('form: ' + form.value);

      let postPostData = {
        postdate: '',
        postid: '',
        posturl: '',
        posttype: this.segment,
        postdesc: this.desc,
        postname: this.base64Image,

        pjtitle: this.pjtitle,
        pjdesc: this.pjdesc,
        pjteam: this.pjteam,

        usersid: currentsid,
        likes: 0,
        comments: 0,
      }

      const data = postPostData;
      console.log('postPostData: ' + JSON.stringify(data));
      $("#pRes").html("online");

    //   this.dataService.getCheck(this.userid).subscribe(response => {
    //     if(response != null){  
    this.dataService.upload(data).subscribe(response => {
    if(response != null){
      this.showToast('Posted successfully');
      this.form.reset();
      this.router.navigate(['/home']);
    }else{
      this.showErrorToast('Posted Unsuccessfully');
      this.router.navigate(['/home']);
    }
  });
    };


};