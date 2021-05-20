import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Storage } from '@ionic/storage';
import * as $ from 'jquery';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {

  constructor(
    private router: Router,
    private dataService: DataService,
  ) { }

  ngOnInit() {
    var slides = document.querySelector('ion-slides');

    // Optional parameters to pass to the swiper instance.
    // See http://idangero.us/swiper/api/ for valid options.
    slides.options = {
      initialSlide: 0,
      speed: 400
    }
  }

  ionViewWillEnter(){
    $("#discover-gallery").html("");
    this.myData();
  }

  async myData(){
    const storage = new Storage();
    await storage.create();
    const currentsid = await storage.get('usersid');

    this.retrieveDiscover(currentsid);
  }


  retrieveDiscover(currentsid){
    console.log("retrieve Discover");
    console.log("start of posting: " + currentsid);

var obj, dbParam, xmlhttp, myObj, x, txt = "";

obj = { "limit":100};
dbParam = JSON.stringify(obj);
xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    myObj = JSON.parse(this.responseText);
    for (x in myObj) {
      var posts = {
      date: myObj[x].postdate,
      usersid: myObj[x].usersid,
      id: myObj[x].postid,
      url: myObj[x].posturl,
      desc: myObj[x].postdesc,
      }

       //change to div for ion-card-content for full scale img
    $("#discover-gallery").prepend(
      `
      <ion-item style=" --ion-card-background: #FFFFFF;">
      <ion-card style="width:100%">
      <ion-card-header>
      <ion-card-subtitle>
      <div class="small-user" style="width:100%; float:left;"><p>${posts.usersid}</p></div>
      </ion-card-subtitle>
      </ion-card-header>
      <ion-card-content id="post${posts.id}">
      <div class="full-img" style="width:100%;"><img src="${posts.url}" style="width:100%;"></div>
      <div class="small-msg" style="width:100%;" ><p>${posts.desc}</p></div>
      <div class="small-date" style="float:right;"><p>${posts.date}</p></div>
      </ion-card-content> 
      </ion-card>
        </ion-item>
        `
);
    // return;
  }
    console.log(myObj);
  }
};
xmlhttp.open("GET", "https://student.amphibistudio.sg/10187403A/POP/db/posts.php?x=" + dbParam, true);
xmlhttp.send();
}

}
