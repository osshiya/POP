import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Storage } from '@ionic/storage';
import * as $ from 'jquery';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.page.html',
  styleUrls: ['./comment.page.scss'],
})
export class CommentPage implements OnInit {

  constructor(
    private router: Router,
    private dataService: DataService,
    public toastCtrl: ToastController ,
    private modalController: ModalController,
  ) { }

  @Input() postid: string;
  @Input() currentsid: string;
  @Input() comments: string;
  @Input() likes: string;


  ngOnInit() {
    this.retrieveUser();
    this.retrieveDiscover(this.currentsid);
    this.retrievecomment(this.postid);
  }

  userposts: any = [];
  commentdatas: any = [];
  discoverposts: any = [];

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
  
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss(this.comments, this.likes);
    console.log(this.comments, this. likes);
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

  retrieveDiscover(currentsid){
    // console.log("retrieve Discover");

    this.dataService.getPosts(currentsid).subscribe(response => {
      if(response != null){  
      //this.showToast('Logged in');
        // console.log('link:' + 'https://student.amphibistudio.sg/10187403A/POP/db/posts.php?x=');
        // console.log(response);
        this.discoverposts = response;
        console.log(this.discoverposts);
      }else{
        //this.showErrorToast('Wrong userid/ password');
      }
  })
}

retrievecomment(postid){
    this.dataService.getComments(postid).subscribe(response => {
      if(response != null){
        this.commentdatas = response;
        console.log(postid + ':' + this.commentdatas);
      }else{
        // this.showErrorToast('Error');
        console.log('somethings wrong');
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

  this.likes = likeys;
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

this.likes = likeys;

this.showToast('Unliked Post');
}else{
this.showErrorToast('Error');
}
});
}

  comment(postid, txtValue, discoverpost){
    let commentPostData = {
      commentid: '',
      commentpostid: postid,
      commentusersid: this.currentsid,
      commentfield: txtValue,
    }

    const data = commentPostData;
    console.log('commentPostData: ' + JSON.stringify(data));

  this.dataService.comments(data).subscribe(response => {
  if(response != null){

    var newcomment = JSON.parse(discoverpost.comments);
    newcomment += 1; 
    discoverpost.comments = newcomment;

    this.comments = newcomment;

    $('#comments-section').prepend(
      `    
      <ion-item>
      <ion-label>
        <strong>${commentPostData.commentusersid}</strong>
        <p>${commentPostData.commentfield}</p>
      </ion-label>
    </ion-item>
    `
    )
  }

});
}

}
