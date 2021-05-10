import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Plugins, CameraResultType,CameraSource, CameraPhoto, CameraPlugin, CameraDirection } from '@capacitor/core';
import { Router } from '@angular/router';
import { Location } from "@angular/common";

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
  ) { }

  ngOnInit() {
    // this.takePicture();
  }

  ionViewWillEnter(){
    this.takePicture();
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
        height: 600,
        direction: CameraDirection.Rear,
        correctOrientation: true,
        saveToGallery: true,
        presentationStyle: 'fullscreen',
      }).catch((e) => {
        this.location.back();
        throw new Error(e);
      });
    //this.image = image.dataUrl;
    console.log(image.webPath);
    return  this.image = image.webPath;
    };
    
  

};