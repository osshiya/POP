import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { DataService, userLoginData, userPortfolioData } from '../services/data.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.page.html',
  styleUrls: ['./portfolio.page.scss'],
})
export class PortfolioPage implements OnInit {
data: userPortfolioData[];

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.retrieveUser();
  }

  async retrieveUser(){
    console.log("retrieve user");
    const storage = new Storage();
    await storage.create();
    const currentsid = await storage.get('usersid');

    console.log("start of posting: " + currentsid);

var obj, dbParam, xmlhttp, myObj, x, txt = "";

obj = { "limit":100};
dbParam = JSON.stringify(obj);
xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    myObj = JSON.parse(this.responseText);
    for (x in myObj) {
      if(myObj[x].usersid == currentsid){

      var posts = {
      userportfoliodate: myObj[x].userportfoliodate,
      usersid: myObj[x].usersid,
      userportfolioid: myObj[x].userportfolioid,
      userportfoliolink: myObj[x].userportfoliolink,
      userportfoliodesc: myObj[x].userportfoliodesc,
      }
      //document.getElementById("gallery").innerHTML = myObj[x].userportfoliodesc;
        $("#gallery").prepend(
              `
              <ion-item>
              <ion-card style="width:100%">
              <ion-card-header>
              <ion-card-subtitle>
              <div class="side-date" style="width:70%; float:left;" ><h3>${posts.userportfoliodate}</h3></div>
              <div class="side-icons" style="width:30%; float:left; text-align:center;"><h3>${posts.usersid} ${posts.userportfolioid}</h3></div>
              </ion-card-subtitle>
              </ion-card-header>
              <ion-card-content id="each-title">
              <div class="side-title" style="width:70%; float:left;" ><h3>${posts.userportfoliolink}</h3></div>
              </ion-card-content>
              <ion-card-content id="each-msg">
              <div class="side-msg" style="width:70%;" ><h3>${posts.userportfoliodesc}</h3></div>
              </ion-card-content> 
              </ion-card>
                </ion-item>
                `
    );
    }
  }
    console.log(myObj);
  }
};
xmlhttp.open("GET", "https://student.amphibistudio.sg/10187403A/POP/db/getPortfolio.php?x=" + dbParam, true);
xmlhttp.send();
}

}

  //Subscribe
      // this.dataService.getPortfolio(currentsid).subscribe(response => {
      //   console.log(response);
          // if(response != null){  
          //   var res = response;
          //   this.data = response;

