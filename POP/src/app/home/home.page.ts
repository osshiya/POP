import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { DataService } from '../services/data.service';
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

}
