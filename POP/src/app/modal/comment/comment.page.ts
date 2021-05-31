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

  ngOnInit() {
    this.retrieveDiscover(this.currentsid);
    this.retrievecomment(this.postid);
  }

  commentdatas: any = [];
  discoverposts: any = [];

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
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

  comment(postid, txtValue){
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
    const res = document.getElementById("comment-counter").textContent;
    $('span#comment-counter').text(JSON.parse(res) + 1);
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
