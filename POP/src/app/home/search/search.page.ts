import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Storage } from '@ionic/storage';
import { ModalController } from '@ionic/angular';
import { PostPage } from '../../modal/post/post.page';
import { PortfolioPage } from '../../modal/portfolio/portfolio.page';
import { NgForm, FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  userinfos: any [];
  rankingposts: any [];
  discoverposts: any [];

  rowOnes: any [];
  rowTwos: any [];
  rowThrees: any [];
  rowFours: any [];
  rowFives: any [];

  currentsid: string;

  overlayHidden: boolean = false;
  
  constructor(
    private dataService: DataService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.myData();
    // this.retrieveRanks();

  }

  async myData(){
    const storage = new Storage();
    await storage.create();
    this.currentsid = await storage.get('usersid');
    console.log("logged: " + this.currentsid);
    
    this.retrievePosts();
  }

  // form = new FormGroup({
  //   search: new FormControl(),
  // });

//   retrieveRanks(){
//     // console.log("retrieve Discover");

//     this.dataService.getPostRanks(this.currentsid).subscribe(response => {
//       if(response != null){  
//       //this.showToast('Logged in');
//         // console.log('link:' + 'https://student.amphibistudio.sg/10187403A/POP/db/posts.php?x=');
//         // console.log(response);
//         this.rankingposts = response;
//       }else{
//         //this.showErrorToast('Wrong userid/ password');
//       }
//   })
// }
overlay(evt){
      this.overlayHidden = true;
}

unoverlay(evt){
  const searchTerm = evt.srcElement.value;
  evt.srcElement.value = "";
  this.userinfos = [];
    this.overlayHidden = false;
}

retrieveUser(evt){
  const searchTerm = evt.srcElement.value;

  if (!searchTerm || searchTerm == '') {
    this.userinfos = [];
    return;
  }
  // console.log("retrieve Discover");
  this.dataService.getsearchProfile(searchTerm).subscribe(response => {
    if(response != null){  
      this.overlayHidden = true;
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

retrievePosts(){
  // console.log("retrieve Discover");

  this.dataService.getPostRanks(this.currentsid).subscribe(response => {
    if(response != null){  
    //this.showToast('Logged in');
      // console.log('link:' + 'https://student.amphibistudio.sg/10187403A/POP/db/posts.php?x=');
      // console.log(response);
      this.rankingposts = response;

      this.rowOnes = [this.rankingposts[0], this.rankingposts[1]];
      this.rowTwos = [this.rankingposts[2], this.rankingposts[3]];
      this.rowThrees = [this.rankingposts[4], this.rankingposts[5]];
      this.rowFours = [this.rankingposts[6], this.rankingposts[7]];
      this.rowFives = [this.rankingposts[8], this.rankingposts[9]];
    }else{
      //this.showErrorToast('Wrong userid/ password');
    }
})
}

async presentPostModal(posttype, postid, discoverpost) {
  if (posttype == 'post'){
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
}else if(posttype == "portfolio"){
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
}

// async filterList(evt) {
//   const searchTerm = evt.srcElement.value;

//   if (!searchTerm) {
//     return;
//   }

//   console.log(this.userinfos);
//   this.userinfos = this.userinfos.filter(currentinfo => {
//     if (currentinfo.name && searchTerm) {
//       return (currentinfo.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || currentinfo.type.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
//     }
//   });
// }

}
