import { Component, Input, Output, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, userLoginData, userPostData } from '../../services/data.service';
import { Storage } from '@ionic/storage';
import { Location } from "@angular/common";
import * as $ from 'jquery';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { PostPage } from '../../modal/post/post.page';
import { PortfolioPage } from '../../modal/portfolio/portfolio.page';
import { FollowPage } from 'src/app/modal/follow/follow.page';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.page.html',
  styleUrls: ['./profiles.page.scss'],
})
export class ProfilesPage implements OnInit {
  // userData: any;
  // userIdentity: string;

  userinfos: any = [];
  userposts: any = [];
  followdata: any =[];

  str2: any;
  currentsid: any;

  segment: string;

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    public toastCtrl:ToastController,
    private modalController: ModalController,
  ) { }

  ngOnInit() {
    var slides = document.querySelector('ion-slides');

    // Optional parameters to pass to the swiper instance.
    // See http://idangero.us/swiper/api/ for valid options.
    slides.options = {
      initialSlide: 0,
      speed: 400
    };

    this.segment="posts";
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    // console.log(this.segment);
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

  async ionViewWillEnter(){
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
    
    const storage = new Storage();
    await storage.create();
    this.currentsid = await storage.get('usersid');
    
if (this.str2 == this.currentsid){
  this.router.navigate(['home/profile']);
}else{
    // this.myData(str2);
    this.retrieveUser(this.str2, this.currentsid);
    this.retrieveUserPosts(this.str2, this.currentsid);
    // this.retrieveUserPortfolio(str2);
}
  }

  // async myData(str2){
  //   const storage = new Storage();
  //   await storage.create();
  //   const currentsid = await storage.get('usersid');

  //   // if (str2 == currentsid){
  //   //   this.router.navigateByUrl('home/profile');
  //   // } 
  // }

  async presentFollowerModal() {
    const modal = await this.modalController.create({
      component: FollowPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'title': 'Follower',
        'currentsid': this.str2,
      },
      presentingElement: await this.modalController.getTop() // Get the top-most ion-modal
    });
    return await modal.present();
  }

  async presentFollowingModal() {
    const modal = await this.modalController.create({
      component: FollowPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'title': 'Following',
        'currentsid': this.str2,
      },
      presentingElement: await this.modalController.getTop() // Get the top-most ion-modal
    });
    return await modal.present();
  }

  async presentPostModal(postid, currentsid, discoverpost) {
    const modal = await this.modalController.create({
      component: PostPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'postid': postid,
        'currentsid': currentsid,
      },
      presentingElement: await this.modalController.getTop() // Get the top-most ion-modal
    });
    return await modal.present();
  }

    async presentPortfolioModal(postid, currentsid, discoverpost) {
      const modal = await this.modalController.create({
        component: PortfolioPage,
        cssClass: 'my-custom-class',
        componentProps: {
          'postid': postid,
          'currentsid': currentsid,
        },
        presentingElement: await this.modalController.getTop() // Get the top-most ion-modal
      });

    return await modal.present();
  }

//   retrieveUser(str2, currentsid){
//     console.log("retrieve users");
//     console.log("start of posting: " + str2);

// var obj, dbParam, xmlhttp, myObj, x, txt = "";

// obj = { "limit":100};
// dbParam = JSON.stringify(obj);
// xmlhttp = new XMLHttpRequest();

// xmlhttp.onreadystatechange = function() {
//   if (this.readyState == 4 && this.status == 200) {
//     myObj = JSON.parse(this.responseText);
//     for (x in myObj) {
//       if(myObj[x].usersid == str2){

//       var user = {
//       usersid: myObj[x].usersid,
//       useremail: myObj[x].useremail,
//       username: myObj[x].username,
//       userpassword: myObj[x].userpassword,
//       userfirstname: myObj[x].userfirstname,
//       userlastname: myObj[x].userlastname,
//       userschool: myObj[x].userschool,
//       userdiploma: myObj[x].userdiploma,
//       useryear: myObj[x].useryear,
//       useravatarurl: myObj[x].useravatarurl,
//       userbio: myObj[x].userbio,
//       schoolbadge: myObj[x].schoolbadge,
//       }

//     $("#fixed-profiles").html(
//       `
//       <div class="leftProfiles" style="width: 45%;">
//         <img src="${user.useravatarurl}" style="object-fit: cover; width: 80px; height: 80px; border-radius: 50%; margin: 10px auto 20px; display: block;">
//       </div>
//       <div class="rightProfiles" style="width: 55%; margin 0 20px; ">
//       <strong>${user.userfirstname} ${user.userlastname}</strong><img src="${user.schoolbadge}" style="width:30px; vertical-align:middle; margin-left:5px">
//         <p>@${user.username}</p>
//         <p>${user.userschool} | ${user.userdiploma} | Year ${user.useryear}</p>
//       </div>
//         `
// );
//     }
//     // return;
//   }
//     console.log(myObj);
//   }
// };
// xmlhttp.open("GET", "https://student.amphibistudio.sg/10187403A/POP/db/profile.php?x=" + dbParam, true);
// xmlhttp.send();
// }

retrieveUser(str2, currentsid){
  // console.log("retrieve Discover");
  this.dataService.getProfiles(str2, currentsid).subscribe(response => {
    if(response != null){  
    //this.showToast('Logged in');
      // console.log('link:' + 'https://student.amphibistudio.sg/10187403A/POP/db/posts.php?x=');
      // console.log(response);
      this.userinfos = response;
      console.log(this.userinfos);
    }else{
      //this.showErrorToast('Wrong userid/ password');
    }
})
}


retrieveUserPosts(str2, currentsid){
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

follow(userinfo, currentsid, str2){
  let followreq = {
    usersidhost: currentsid,
    usersidtarget: str2,
    following: 1,
  }

  const data = followreq;
  console.log('followreq: ' + JSON.stringify(data));

  this.dataService.followreq(data).subscribe(response => {
    if(response != null){

userinfo.following = 1;
// console.log(userinfo.following);
var followers = JSON.parse(userinfo.followers);
followers += 1; 
userinfo.followers = followers;

// this.showToast('Unliked Post');

}else{
this.showErrorToast('Error');
}
});

//   this.dataService.getCheck(this.userid).subscribe(response => {
//     if(response != null){  

// var postid = $(this).data('likeid');
// 		const thispost = $(this);

// console.log(discoverpost.postid);

  // $.ajax({
  // 	url: 'index.php',
  // 	type: 'post',
  // 	data: {
  // 		'liked': 1,
  // 		'postid': postid
  // 	},
  // 	success: function(response){
  // 		thispost.parent().find('span.likes_counter').text(response + " likes");
  // 		thispost.addClass('hide');
  // 		thispost.siblings().removeClass('hide');
  // 	}
  // });
}

unfollow(userinfo, currentsid, str2, followingData){
  let followreq = {
    usersidhost: currentsid,
    usersidtarget: str2,
    following: 0,
  }

  const data = followreq;
  console.log('followreq: ' + JSON.stringify(data));

  this.dataService.followreq(data).subscribe(response => {
    if(response != null){

userinfo.following = 0;
// console.log(userinfo.following);
var followers = JSON.parse(userinfo.followers);
followers -= 1; 
userinfo.followers = followers;

// this.showToast('Unliked Post');

}else{
this.showErrorToast('Error');
}
});
}

}