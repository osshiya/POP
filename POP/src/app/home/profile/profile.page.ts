import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService, userLoginData, userPostData } from '../../services/data.service';
import { Storage } from '@ionic/storage';
import * as $ from 'jquery';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
data: userPostData[];

  constructor(
    private dataService: DataService,
    private router: Router,
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
    $("#fixed-profile").html("");
    $("#posts-gallery").html("");
    $("#portfolio-gallery").html("");    
    
    this.myData();
  }

  async myData(){
    const storage = new Storage();
    await storage.create();
    const currentsid = await storage.get('usersid');

    this.retrieveUser(currentsid);
    this.retrieveUserPosts(currentsid);
    this.retrieveUserPortfolio(currentsid);
  }

  retrieveUser(currentsid){
    console.log("retrieve users");
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

      var user = {
      usersid: myObj[x].usersid,
      useremail: myObj[x].useremail,
      username: myObj[x].username,
      userpassword: myObj[x].userpassword,
      userfirstname: myObj[x].userfirstname,
      userlastname: myObj[x].userlastname,
      userschool: myObj[x].userschool,
      userdiploma: myObj[x].userdiploma,
      useryear: myObj[x].useryear,
      useravatarurl: myObj[x].useravatarurl,
      userbio: myObj[x].userbio,
      }

    $("#fixed-profile").html(
      `
      <div class="leftProfile" style="width: 30%;">
        <img src="${user.useravatarurl}" style="width: 70px; height: 70px; border-radius: 50%; margin: 10px auto 20px; display: block;">
      </div>
      <div class="rightProfile" style="width: 70%;">
        <strong>${user.userfirstname} ${user.userlastname}</strong>
        <p>@${user.username}</p>
        <p>${user.userschool} | ${user.userdiploma} | Year ${user.useryear}</p>
      </div>
        `
);
    }
    // return;
  }
    console.log(myObj);
  }
};
xmlhttp.open("GET", "https://student.amphibistudio.sg/10187403A/POP/db/login.php?x=" + dbParam, true);
xmlhttp.send();
}


  retrieveUserPosts(currentsid){
    console.log("retrieve posts");
    console.log("start of posting: " + currentsid);

var obj, dbParam, xmlhttp, myObj, x, txt = "";

obj = { "limit":100};
dbParam = JSON.stringify(obj);
xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    myObj = JSON.parse(this.responseText);
    for (x in myObj) {
      if(myObj[x].usersid == currentsid && myObj[x].type == 'post'){

      var posts = {
      date: myObj[x].date,
      usersid: myObj[x].usersid,
      id: myObj[x].id,
      url: myObj[x].url,
      desc: myObj[x].postsdesc,
      }

    $("#posts-gallery").prepend(
      `
      <img src="${posts.url}" class="${posts.id}" style="width:33%; float: left;">
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


retrieveUserPortfolio(currentsid){
    console.log("retrieve portfolio");
    console.log("start of posting: " + currentsid);

var obj, dbParam, xmlhttp, myObj, x, txt = "";

obj = { "limit":100};
dbParam = JSON.stringify(obj);
xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    myObj = JSON.parse(this.responseText);
    for (x in myObj) {
      if(myObj[x].usersid == currentsid && myObj[x].type == 'portfolio'){

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

