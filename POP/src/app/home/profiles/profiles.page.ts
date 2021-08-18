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

  back(){
    this.location.back();
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    // console.log(this.segment);
  }


  doRefresh(event) {
    console.log('Begin async operation');

    $("#fixed-profile").html("");
    $("#posts-gallery").html("");
    $("#portfolio-gallery").html("");    
    this.retrieveUser(this.str2, this.currentsid);
    this.retrieveUserPosts(this.str2, this.currentsid);

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
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
userinfo.usersidhost = currentsid;

// this.showToast('Unliked Post');

}else{
this.showErrorToast('Error');
}
});

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
userinfo.usersidhost = '';

// this.showToast('Unliked Post');

}else{
this.showErrorToast('Error');
}
});
}

}