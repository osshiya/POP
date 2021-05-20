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

  enterid: string;

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
      <ion-card style="width:100%; height:100vh;">
      <ion-card-header style="width:100%; height:30px ;margin: 10px 0;">
      <ion-card-subtitle>
        <div class="small-user" style="width:100%; float:left;"><a href="/home/profiles/${posts.usersid}">${posts.usersid}</a></div>
      </ion-card-subtitle>
      </ion-card-header>
      <ion-card-content id="post${posts.id}"style="width:100%; height:100vh;">
      
        <img src="${posts.url}" style="width:100%; height:300px ;margin: 30px 0;">

        <div class="bars" style="margin: 30px 0; width:100%; height: 20vh;">
        <ion-button onclick="open()">Open</ion-button>
        <div class="left-bar" style="width:75%; float: left"> 
          <p>${posts.desc}</p>
        </div>

      <div class="right-bar" style="display:flex; flex-direction: column; float:right;">
        <button ion-button icon-only onclick="liked()"><ion-icon name="heart-outline" style="font-size:50px;"></button>
        <ion-icon name="chatbox-outline" class="comment" style="font-size:50px;"></ion-icon>
      </div>
      </div>

        <p style="float:right; display:block; margin: 30px 0">${posts.date}</p>
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

  open(){
    // let userData = {
    //   userid: "sss",
    // }

    // this.dataService.setData("user", userData);
    // this.router.navigateByUrl('home/profiles/user');
    console.log("open");
  }

  liked(){
    // console.log(($this).getAttribute('fill'));
    console.log("liked");
  }
}
