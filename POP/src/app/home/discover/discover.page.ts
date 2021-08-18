import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Storage } from '@ionic/storage';
import * as $ from 'jquery';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { CommentPage } from '../../modal/comment/comment.page';

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
      this.showToast('Liked Post');
    }else{
      this.showErrorToast('Error');
    }
  });
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

  this.dataService.likes(data).subscribe(response => {
  if(response != null){

    discoverpost.likedusersid = "";
    var likeys = JSON.parse(discoverpost.likes);
    likeys -= 1; 
    discoverpost.likes = likeys;

    this.showToast('Unliked Post');
  }else{
    this.showErrorToast('Error');
  }
});

}

}
