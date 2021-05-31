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
    this.comment(this.postid);
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

  comment(postid){
    // let userData = {
    //   userid: "sss",
    // }

    // this.dataService.setData("user", userData);
    // this.router.navigateByUrl('home/profiles/user');
    // postid = JSON.parse(postid);
    // console.log(postid);
    // console.log($this);
    // GET Comments
    this.dataService.comments(postid).subscribe(response => {
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
}
