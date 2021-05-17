import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { DataService, userLoginData, userPostData } from '../../services/data.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
data: userPostData[];

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit() {
    var slides = document.querySelector('ion-slides');

    // Optional parameters to pass to the swiper instance.
    // See http://idangero.us/swiper/api/ for valid options.
    slides.options = {
      initialSlide: 1,
      speed: 400
    }

    this.retrieveUser();
  }

  async retrieveUser(){
    console.log("retrieve user");
    const storage = new Storage();
    await storage.create();
    const currentsid = await storage.get('usersid');

    console.log("start of posting: " + currentsid);

var obj, dbParam, xmlhttp, myObj, x, txt = "";

obj = { "limit":100};
dbParam = JSON.stringify(obj);
xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    myObj = JSON.parse(this.responseText);
    for (x in myObj) {
      if(myObj[x].usersid == currentsid){

      var posts = {
      date: myObj[x].date,
      usersid: myObj[x].usersid,
      id: myObj[x].id,
      url: myObj[x].url,
      desc: myObj[x].postsdesc,
      }
      //document.getElementById("gallery").innerHTML = myObj[x].userportfoliodesc;
        $("#portfolio-gallery").prepend(
              `
              <img src="${posts.url}" class="${posts.id}" style="width:33%; float: left;">
                `
    );

    $("#posts-gallery").prepend(
      `
      <ion-item>
      <ion-card style="width:100%">
      <ion-card-header>
      <ion-card-subtitle>
      <div class="side-date" style="width:70%; float:left;" ><h3>${posts.date}</h3></div>
      <div class="side-icons" style="width:30%; float:left; text-align:center;"><h3>${posts.usersid} ${posts.id}</h3></div>
      </ion-card-subtitle>
      </ion-card-header>
      <ion-card-content id="each-title">
      <div class="side-title" style="width:70%; float:left;" ><h3><img src="${posts.url}"></h3></div>
      </ion-card-content>
      <ion-card-content id="each-msg">
      <div class="side-msg" style="width:70%;" ><h3>${posts.desc}</h3></div>
      </ion-card-content> 
      </ion-card>
        </ion-item>
        `
);


    }
    // return;
  }
    console.log(myObj);
  }
};
xmlhttp.open("GET", "https://student.amphibistudio.sg/10187403A/POP/db/posts.php?x=" + dbParam, true);
xmlhttp.send();
}

}

  //Subscribe
      // this.dataService.getPortfolio(currentsid).subscribe(response => {
      //   console.log(response);
          // if(response != null){  
          //   var res = response;
          //   this.data = response;

