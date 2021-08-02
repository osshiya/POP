import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Storage } from '@ionic/storage';
import * as $ from 'jquery';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { CommentPage } from '../../modal/comment/comment.page';
import { NgForm, FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
}
)

export class DiscoverPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;

  constructor(
    private router: Router,
    private dataService: DataService,
    public toastCtrl: ToastController ,
    private modalController: ModalController,
    private menu: MenuController,
  ) { }

  openFirst(){
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  gotoProfile(){
    this.router.navigate(['/home/profile']);
  }

  gotoChat(){
    this.router.navigate(['/chat']);
  }

  gotoAct(){
    this.router.navigate(['/activity']);
  }

  async logout(){
  console.log("logging out");

  const storage = new Storage();
  await storage.create();

  await storage.set('usersid', '');
  await storage.set('userpassword', '');

  this.router.navigate(['/login']);
}

  // public likeShow = false;
  // public unlikeShow = false;
  enterid: string;
  userposts: any = [];
  discoverposts: any = [];
  socialposts: any = [];

  currentsid: any;

  likesdata: any = [];
  commentdatas: any = [];

  isLiking:number=-1;

  dataReturned: any = [];

  ddata: number;
  rdata: number;

  segment: string;

  ngOnInit() {
    // var slides = document.querySelector('ion-slides');

    // Optional parameters to pass to the swiper instance.
    // See http://idangero.us/swiper/api/ for valid options.
    // slides.options = {
    //   initialSlide: 0,
    //   speed: 400
    // }

    this.myData();
    this.segment = 'discover';
  }

  ionViewWillEnter(){
    // $("#discover-gallery").html("");
  }

  scrollToTOP(){
    this.content.scrollToTop();
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    // console.log(this.segment);
  }

  async myData(){
    const storage = new Storage();
    await storage.create();
    this.currentsid = await storage.get('usersid');
    console.log("logged: " + this.currentsid);

    this.retrieveDiscover();
    this.retrieveSocial();
    this.retrieveUser();
    // this.retrieveLikes();
  }

  async showToast(data: any) {
    const toast = await this.toastCtrl.create({
      message: data,
      duration: 2000,
      position: 'top',
      color: 'success'
    });
    toast.present();
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

  // openFirst() {
  //   this.menu.enable(true, 'first');
  //   this.menu.open('first');
  // }

  async presentModal(postid, comments, likes, discoverpost) {
    const modal = await this.modalController.create({
      component: CommentPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'postid': postid,
        'currentsid': this.currentsid,
        'comments': comments,
        'likes': likes
      },
      presentingElement: await this.modalController.getTop() // Get the top-most ion-modal
    });

    // const { data } = await modal.onWillDismiss();
    // console.log(data);
    modal.onDidDismiss()
      .then((data) => {
        // const rdata = data['data'];
        this.ddata = data['data'];
        this.rdata = JSON.parse(data['role']);

        if (this.rdata === JSON.parse(discoverpost.likes) + 1){
          discoverpost.likes = this.rdata;  
          discoverpost.likedusersid = this.currentsid;
          console.log("liiked:" + discoverpost.likedusersid == this.currentsid);
        }else if (this.rdata === JSON.parse(discoverpost.likes) - 1){
          discoverpost.likedusersid = "";
          console.log("unliked:" + discoverpost.likedusersid !== this.currentsid);
        }
        discoverpost.comments = this.ddata;
        // console.log(data['role']);
    });
    // modal.onDidDismiss().then((dataReturned) => {
    //   if (dataReturned !== null) {
    //     this.dataReturned = dataReturned.data;
    //     //alert('Modal Sent Data :'+ dataReturned);

    //     console.log(JSON.stringify(this.dataReturned));
    //   }
    // });

    return await modal.present();
  }

  doRefresh(event) {
    console.log('Begin async operation');

    $("#discover-gallery").html("");
    $("#social-gallery").html("");   
    this.retrieveDiscover();
    this.retrieveSocial();
    this.retrieveUser();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

retrieveUser(){
  // console.log("retrieve Discover");

  this.dataService.getPostProfile().subscribe(response => {
    if(response != null){  
    //this.showToast('Logged in');
      // console.log('link:' + 'https://student.amphibistudio.sg/10187403A/POP/db/posts.php?x=');
      // console.log(response);
      this.userposts = response;
    }else{
      //this.showErrorToast('Wrong userid/ password');
    }
})
}

  retrieveDiscover(){
      // console.log("retrieve Discover");
  
      this.dataService.getPosts(this.currentsid).subscribe(response => {
        if(response != null){  
        //this.showToast('Logged in');
          // console.log('link:' + 'https://student.amphibistudio.sg/10187403A/POP/db/posts.php?x=');
          // console.log(response);
          this.discoverposts = response;
        }else{
          //this.showErrorToast('Wrong userid/ password');
        }
    })
  }

  retrieveSocial(){
    // console.log("retrieve Social");

    this.dataService.getfollowedPosts(this.currentsid).subscribe(response => {
      if(response != null){  
      //this.showToast('Logged in');
        // console.log('link:' + 'https://student.amphibistudio.sg/10187403A/POP/db/posts.php?x=');
        // console.log(response);
        this.socialposts = response;
      }else{
        //this.showErrorToast('Wrong userid/ password');
      }
  })
  }

  // retrieveLikes(){
  //   this.dataService.checkLikes(this.currentsid).subscribe(response => {
  //     if(response != null){  
  //     //this.showToast('Logged in');
  //       console.log('link:' + 'https://student.amphibistudio.sg/10187403A/POP/db/liking.php?x=');
  //       console.log("liked: " + JSON.stringify(response));
  //       this.likedposts = response;
  //       // $('.like21').addClass('hide');
  //       // $('.unlike21').removeClass('hide');
  //       // console.log("???");
  //       if(this.likedposts.liked == 1){
  //         console.log('true');
  //         this.isLiked = !this.isLiked;
  //       }
  //     }else{
  //       // this.likeShow = true;
  //       // this.unlikeShow = false;
  //       //this.showErrorToast('Wrong userid/ password');
  //     }
  // })
  // }

  like(postid, currentsid, discoverpost){

      let likePostData = {
        likedid: '',
        likedpostid: postid,
        likedusersid: currentsid,
        liked: '1',
      }

      const data = likePostData;
      console.log('likePostData: ' + JSON.stringify(data));

    //   this.dataService.getCheck(this.userid).subscribe(response => {
    //     if(response != null){  
    this.dataService.likes(data).subscribe(response => {
    if(response != null){

      discoverpost.likedusersid = currentsid;
      var likeys = JSON.parse(discoverpost.likes);
      likeys += 1; 
      discoverpost.likes = likeys;
      // const res = document.getElementById("like-counter").textContent;
      // $('span#like-counter').text(JSON.parse(res) + 1);
      this.showToast('Liked Post');
      // this.isLiking==-1 
      // i=this.isLiking;
      // $('span.like-counter').text(response + " likes");
      // document.getElementById('like21');
      // $(".like21").addClass("hide");
      // $('.unlike').removeClass('hide');
    }else{
      this.showErrorToast('Error');
    }
  });

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

  unlike(postid, currentsid, discoverpost){
    let likePostData = {
      likedid: '',
      likedpostid: postid,
      likedusersid: currentsid,
      liked: '0',
    }

    const data = likePostData;
    console.log('likePostData: ' + JSON.stringify(data));

  //   this.dataService.getCheck(this.userid).subscribe(response => {
  //     if(response != null){  
  this.dataService.likes(data).subscribe(response => {
  if(response != null){

    // const res = document.getElementById("like-counter").textContent;
    // $('span#like-counter').text(JSON.parse(res) - 1);
    discoverpost.likedusersid = "";
    var likeys = JSON.parse(discoverpost.likes);
    likeys -= 1; 
    discoverpost.likes = likeys;

    this.showToast('Unliked Post');
    // $('span.like-counter').text(response + " likes");
    // document.getElementById('like21');
    // $(".like21").addClass("hide");
    // $('.unlike').removeClass('hide');
  }else{
    this.showErrorToast('Error');
  }
});

}

}
