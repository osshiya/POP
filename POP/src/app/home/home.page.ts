import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { Storage } from '@ionic/storage';
import { DiscoverPage } from './discover/discover.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private router: Router,
    // private menu: MenuController,
    private dataService: DataService,
  ) { }

  currentsid: any;
  userinfos: any = [];

  ngOnInit() {
    // this.myData();
  }

  gotoChat() {
    this.router.navigate(['chat'])
    console.log("gotoChatclicked");
  }

  gotoAct() {
    this.router.navigate(['activity'])
    console.log("gotoActivityclicked");
  }


//   async myData(){
//     const storage = new Storage();
//     await storage.create();
//     this.currentsid = await storage.get('usersid');

//     this.retrieveUser();
//     // this.retrieveUserPortfolio(currentsid);
//   }

//   retrieveUser(){
//     // console.log("retrieve Discover");
//     this.dataService.getProfile().subscribe(response => {
//       if(response != null){  
//       //this.showToast('Logged in');
//         // console.log('link:' + 'https://student.amphibistudio.sg/10187403A/POP/db/posts.php?x=');
//         // console.log(response);
//         this.userinfos = response;
//         console.log(this.userinfos);
//       }else{
//         //this.showErrorToast('Wrong userid/ password');
//       }
//   })
// }

// async logout(){
//   console.log("logging out");

//   const storage = new Storage();
//   await storage.create();

//   await storage.set('usersid', '');
//   await storage.set('userpassword', '');

//   this.router.navigate(['/login']);
// }

}
