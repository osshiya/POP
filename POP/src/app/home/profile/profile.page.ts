import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, userLoginData, userPostData } from '../../services/data.service';
import { Storage } from '@ionic/storage';
import * as $ from 'jquery';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { PostPage } from '../../modal/post/post.page';
import { PortfolioPage } from '../../modal/portfolio/portfolio.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private modalController: ModalController,
  ) { }

  userposts: any = [];
  currentsid: any;

  ngOnInit() {
    var slides = document.querySelector('ion-slides');

    // Optional parameters to pass to the swiper instance.
    // See http://idangero.us/swiper/api/ for valid options.
    slides.options = {
      initialSlide: 0,
      speed: 400
    };
  
  }

  ionViewWillEnter(){
    $("#fixed-profile").html("");
    $("#posts-gallery").html("");
    $("#portfolio-gallery").html("");    
    
    this.myData();
  }

  async presentPostModal(postid, discoverpost) {
    const modal = await this.modalController.create({
      component: PostPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'postid': postid,
        'currentsid': this.currentsid,
      },
      presentingElement: await this.modalController.getTop() // Get the top-most ion-modal
    });
    return await modal.present();
  }

    async presentPortfolioModal(postid, discoverpost) {
      const modal = await this.modalController.create({
        component: PortfolioPage,
        cssClass: 'my-custom-class',
        componentProps: {
          'postid': postid,
          'currentsid': this.currentsid,
        },
        presentingElement: await this.modalController.getTop() // Get the top-most ion-modal
      });

    return await modal.present();
  }

  async myData(){
    const storage = new Storage();
    await storage.create();
    this.currentsid = await storage.get('usersid');

    this.retrieveUser(this.currentsid);
    this.retrieveUserPosts(this.currentsid);
    // this.retrieveUserPortfolio(currentsid);
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
      schoolbadge: myObj[x].schoolbadge
      }

    $("#fixed-profile").html(
      `
      <div class="leftProfile" style="width: 45%;">
        <img src="${user.useravatarurl}"  style="object-fit: cover; width: 80px; height: 80px; border-radius: 50%; margin: 10px auto 20px; display: block;">
      </div>
      <div class="rightProfile" style="width: 55%; margin 0 20px; ">
        <strong>${user.userfirstname} ${user.userlastname}</strong><img src="${user.schoolbadge}" style="width:30px; vertical-align:middle; margin-left:5px">
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
xmlhttp.open("GET", "https://student.amphibistudio.sg/10187403A/POP/db/profile.php?x=" + dbParam, true);
xmlhttp.send();
}


  retrieveUserPosts(currentsid){
      // console.log("retrieve Discover");
      this.dataService.getPosts(currentsid).subscribe(response => {
        if(response != null){  
        //this.showToast('Logged in');
          // console.log('link:' + 'https://student.amphibistudio.sg/10187403A/POP/db/posts.php?x=');
          // console.log(response);
          this.userposts = response;
          console.log(this.userposts);
        }else{
          //this.showErrorToast('Wrong userid/ password');
        }
    })
//     console.log("retrieve posts");
//     console.log("start of posting: " + currentsid);

// var obj, dbParam, xmlhttp, myObj, x, txt = "";

// obj = { "limit":100};
// dbParam = JSON.stringify(obj);
// xmlhttp = new XMLHttpRequest();

// xmlhttp.onreadystatechange = function() {
//   if (this.readyState == 4 && this.status == 200) {
//     myObj = JSON.parse(this.responseText);
//     for (x in myObj) {
//       if(myObj[x].usersid == currentsid && myObj[x].posttype == 'post'){

//       var posts = {
//       date: myObj[x].postdate,
//       usersid: myObj[x].usersid,
//       id: myObj[x].postid,
//       url: myObj[x].posturl,
//       desc: myObj[x].postdesc,
//       }

//     $("#posts-gallery").prepend(
//       `
      // <div id="posts-gallery" class="wrapper">
      // <div class="posts" style="width:100%; height:100%; float: left;">
      //   <img src="${posts.url}" class="${posts.id}" style="width: 100%;">
      // </div>
      // </div>
//         `
// );
//     }
//     // return;
//   }
//     console.log(myObj);
//   }
// };
// xmlhttp.open("GET", "https://student.amphibistudio.sg/10187403A/POP/db/profileposts.php?x=" + dbParam, true);
// xmlhttp.send();
}


// retrieveUserPortfolio(currentsid){
//     console.log("retrieve portfolio");
//     console.log("start of posting: " + currentsid);

// var obj, dbParam, xmlhttp, myObj, x, txt = "";

// obj = { "limit":100};
// dbParam = JSON.stringify(obj);
// xmlhttp = new XMLHttpRequest();

// xmlhttp.onreadystatechange = function() {
//   if (this.readyState == 4 && this.status == 200) {
//     myObj = JSON.parse(this.responseText);
//     for (x in myObj) {
//       if(myObj[x].usersid == currentsid && myObj[x].posttype == 'portfolio'){

//       var posts = {
//       date: myObj[x].postdate,
//       usersid: myObj[x].usersid,
//       id: myObj[x].postid,
//       url: myObj[x].posturl,
//       desc: myObj[x].postdesc,
//       }
//       //document.getElementById("gallery").innerHTML = myObj[x].userportfoliodesc;

//     }
//     // return;
//   }
//     console.log(myObj);
//   }
// };
// xmlhttp.open("GET", "https://student.amphibistudio.sg/10187403A/POP/db/profileposts.php?x=" + dbParam, true);
// xmlhttp.send();
// }

}
  //Subscribe
      // this.dataService.getPortfolio(currentsid).subscribe(response => {
      //   console.log(response);
          // if(response != null){  
          //   var res = response;
          //   this.data = response;

