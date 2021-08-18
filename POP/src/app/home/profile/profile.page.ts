import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, userLoginData, userPostData } from '../../services/data.service';
import { Storage } from '@ionic/storage';
import * as $ from 'jquery';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { PostPage } from '../../modal/post/post.page';
import { PortfolioPage } from '../../modal/portfolio/portfolio.page';
import { EditprofilePage } from '../../modal/editprofile/editprofile.page';
import { FollowPage } from 'src/app/modal/follow/follow.page';

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
  userinfos: any = [];

  segment: string;

  ngOnInit() {
    var slides = document.querySelector('ion-slides');

    // Optional parameters to pass to the swiper instance.
    // See http://idangero.us/swiper/api/ for valid options.
    slides.options = {
      initialSlide: 0,
      speed: 400
    };
  
    this.myData();
  }

  ionViewWillEnter(){
    this.segment = "posts";
  }

  doRefresh(event) {
    console.log('Begin async operation');

    $("#fixed-profile").html("");
    $("#posts-gallery").html("");
    $("#portfolio-gallery").html("");    
    this.retrieveUser();
    this.retrieveUserPosts(this.currentsid);

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    // console.log(this.segment);
  }

  async presentFollowerModal() {
    const modal = await this.modalController.create({
      component: FollowPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'title': 'Follower',
        'currentsid': this.currentsid,
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
        'currentsid': this.currentsid,
      },
      presentingElement: await this.modalController.getTop() // Get the top-most ion-modal
    });
    return await modal.present();
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

  async presentProfileModal() {
    const modal = await this.modalController.create({
      component: EditprofilePage,
      cssClass: 'my-custom-class',
      componentProps: {
        'currentsid': this.currentsid,
      },
      presentingElement: await this.modalController.getTop() // Get the top-most ion-modal
    });

    modal.onDidDismiss().then((data) => {
      // if (data !== null) {
      //   let info = data.data;
      //   this.userinfos += info;
      //   console.log('userinfos :'+ this.userinfos);
      // }

      this.ionViewWillEnter();
    });
 
  return await modal.present();
}

  async myData(){
    const storage = new Storage();
    await storage.create();
    this.currentsid = await storage.get('usersid');

    this.retrieveUser();
    this.retrieveUserPosts(this.currentsid);
    // this.retrieveUserPortfolio(currentsid);
  }

  retrieveUser(){
    // console.log("retrieve Discover");
    this.dataService.getProfile().subscribe(response => {
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
}

}

