import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Storage } from '@ionic/storage';
import * as $ from 'jquery';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.page.html',
  styleUrls: ['./portfolio.page.scss'],
})
export class PortfolioPage implements OnInit {

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
    this.retrieveDiscover(this.currentsid);
    this.retrievecomment(this.postid);
  }

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
    // let userData = {
    //   userid: "sss",
    // }

    // this.dataService.setData("user", userData);
    // this.router.navigateByUrl('home/profiles/user');
    // postid = JSON.parse(postid);
    // console.log(postid);
    // console.log($this);
    // GET Comments
    this.dataService.getComments(postid).subscribe(response => {
      if(response != null){
        this.commentdatas = response;
        console.log(postid + ':' + this.commentdatas);
      }else{
        // this.showErrorToast('Error');
        console.log('somethings wrong');
      }
    // });
  

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

this.likes = likeys;

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

  comment(postid, txtValue, discoverpost){
    let commentPostData = {
      commentid: '',
      commentpostid: postid,
      commentusersid: this.currentsid,
      commentfield: txtValue,
    }

    const data = commentPostData;
    console.log('commentPostData: ' + JSON.stringify(data));

  //   this.dataService.getCheck(this.userid).subscribe(response => {
  //     if(response != null){  
  this.dataService.comments(data).subscribe(response => {
  if(response != null){

    // const res = document.getElementById("comment-counter").textContent;
    // $('span#comment-counter').text(JSON.parse(res) + 1); 
    var newcomment = JSON.parse(discoverpost.comments);
    newcomment += 1; 
    discoverpost.comments = newcomment;

    this.comments = newcomment;
    // console.log(this.comments);

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
    // $('span.like-counter').text(response + " likes");
    // document.getElementById('like21');
    // $(".like21").addClass("hide");
    // $('.unlike').removeClass('hide');
  }

});
}

}
