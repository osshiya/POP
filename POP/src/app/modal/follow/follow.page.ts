import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.page.html',
  styleUrls: ['./follow.page.scss'],
})
export class FollowPage implements OnInit {

  constructor(
    private dataService: DataService,
    private modalController: ModalController,
  ) { }

  @Input() title: string;
  @Input() currentsid: string;

  userinfos: any [];
  followedinfos: any [];

  ngOnInit() {
    this.retrieveUser();
    this.retrieveFollow();
  }

  retrieveUser(){
    // console.log("retrieve Discover");
    this.dataService.getProfile().subscribe(response => {
      if(response != null){  
      //this.showToast('Logged in');
        // console.log('link:' + 'https://student.amphibistudio.sg/10187403A/POP/db/posts.php?x=');
        // console.log(response);
        this.userinfos = response;
        // console.log(this.userinfos);
      }else{
        //this.showErrorToast('Wrong userid/ password');
      }
  })
}


retrieveFollow(){
  // console.log("retrieve Social");

  this.dataService.getFollow().subscribe(response => {
    if(response != null){  
    //this.showToast('Logged in');
      // console.log('link:' + 'https://student.amphibistudio.sg/10187403A/POP/db/posts.php?x=');
      // console.log(response);
      this.followedinfos = response;
      console.log(this.followedinfos);
    }else{
      //this.showErrorToast('Wrong userid/ password');
    }
})
}

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss();
  }
}
