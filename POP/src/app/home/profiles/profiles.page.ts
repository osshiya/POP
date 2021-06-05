import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, userLoginData, userPostData } from '../../services/data.service';
import { Storage } from '@ionic/storage';
import { Location } from "@angular/common";
import * as $ from 'jquery';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.page.html',
  styleUrls: ['./profiles.page.scss'],
})
export class ProfilesPage implements OnInit {
  // userData: any;
  // userIdentity: string;

  userposts: any = [];
  str2: any;

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    public toastCtrl:ToastController,
  ) { }

  ngOnInit() {
    var slides = document.querySelector('ion-slides');

    // Optional parameters to pass to the swiper instance.
    // See http://idangero.us/swiper/api/ for valid options.
    slides.options = {
      initialSlide: 0,
      speed: 400
    };
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

  ionViewWillEnter(){
    $("#fixed-profiles").html("");
    $("#posts-profiles").html("");
    $("#portfolio-profiles").html("");    
    
    // if (this.route.snapshot.data['user']){
    //   this.userData = this.route.snapshot.data['user'];

    //   this.userIdentity= this.userData.userid;
    //   console.log("userIdentity: " + this.userIdentity);

    //   console.log(this.userIdentity);
    // }else{
    //   console.log("???");
    //   this.showErrorToast('Error');
    //   this.location.back();
    // }
    // console.log(this.router.url);
    var str = this.router.url;
    this.str2 = str.split("/").pop();
    console.log(this.str2);
    
    // this.myData(str2);
    this.retrieveUser(this.str2);
    this.retrieveUserPosts(this.str2);
    // this.retrieveUserPortfolio(str2);
  }

  // async myData(str2){
  //   const storage = new Storage();
  //   await storage.create();
  //   const currentsid = await storage.get('usersid');

  //   // if (str2 == currentsid){
  //   //   this.router.navigateByUrl('home/profile');
  //   // } 
  // }

  retrieveUser(str2){
    console.log("retrieve users");
    console.log("start of posting: " + str2);

var obj, dbParam, xmlhttp, myObj, x, txt = "";

obj = { "limit":100};
dbParam = JSON.stringify(obj);
xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    myObj = JSON.parse(this.responseText);
    for (x in myObj) {
      if(myObj[x].usersid == str2){

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

    $("#fixed-profiles").html(
      `
      <div class="leftProfiles" style="width: 45%;">
        <img src="${user.useravatarurl}" style="width: 70px; height: 70px; border-radius: 50%; margin: 10px auto 20px; display: block;">
      </div>
      <div class="rightProfiles" style="width: 55%; margin 0 20px; ">
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


retrieveUserPosts(str2){
  console.log("retrieve posts");
  console.log("start of posting: " + str2);

  // console.log("retrieve Discover");
  this.dataService.getPosts(str2).subscribe(response => {
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
}

// var obj, dbParam, xmlhttp, myObj, x, txt = "";

// obj = { "limit":100};
// dbParam = JSON.stringify(obj);
// xmlhttp = new XMLHttpRequest();

// xmlhttp.onreadystatechange = function() {
//   if (this.readyState == 4 && this.status == 200) {
//     myObj = JSON.parse(this.responseText);
//     for (x in myObj) {
//       if(myObj[x].usersid == str2 && myObj[x].posttype == 'post'){

//       var posts = {
//       date: myObj[x].postdate,
//       usersid: myObj[x].usersid,
//       id: myObj[x].postid,
//       url: myObj[x].posturl,
//       desc: myObj[x].postdesc,
//       }

//     $("#posts-profiles").prepend(
//       `
//       <div class="posts" style="width:100%; height:100%; float: left;">
//       <img src="${posts.url}" class="${posts.id}" style="width:100%;">
//       </div>
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
// }


// retrieveUserPortfolio(str2){
//     console.log("retrieve portfolio");
//     console.log("start of posting: " + str2);

// var obj, dbParam, xmlhttp, myObj, x, txt = "";

// obj = { "limit":100};
// dbParam = JSON.stringify(obj);
// xmlhttp = new XMLHttpRequest();

// xmlhttp.onreadystatechange = function() {
//   if (this.readyState == 4 && this.status == 200) {
//     myObj = JSON.parse(this.responseText);
//     for (x in myObj) {
//       if(myObj[x].usersid == str2 && myObj[x].posttype == 'portfolio'){

//       var posts = {
//       date: myObj[x].postdate,
//       usersid: myObj[x].usersid,
//       id: myObj[x].postid,
//       url: myObj[x].posturl,
//       desc: myObj[x].postdesc,
//       }
//       //document.getElementById("gallery").innerHTML = myObj[x].userportfoliodesc;
//         $("#portfolio-profiles").prepend(
//               `
//               <div class="posts" style="width:100%; height:100%; float: left;">
//               <img src="${posts.url}" class="${posts.id}" style="width:100%;">
//               </div>
//                 `
//     );
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