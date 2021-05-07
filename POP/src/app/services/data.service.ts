import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface alluserImportData {
  userid: string;
  usersid: string;
  userpassword: string;

  useremail: string;
  userfirstname: string;
  userlastname: string;
  userbio: string;

  usercontactno: string;
}

export interface userLoginData {
  usersid: string;
  userpassword: string;
}

export interface userPortfolioData {
  userportfoliodesc: string;
  userportfoliolink: string;
  userportfoliodate: string;
  userportfolioid: string;
  usersid: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private data = [];

  private url = 'https://student.amphibistudio.sg/10187403A/POP/db/login.php';
  private loginUrl = 'https://student.amphibistudio.sg/10187403A/POP/db/login.php';
  private portfolioUrl = 'https://student.amphibistudio.sg/10187403A/POP/db/getPortfolio.php'

  constructor(
    private http: HttpClient
  ) { }

  get(usersid: string, userpassword:string){
    return this.http.get<[userLoginData]>(this.loginUrl + '?usersid=' + usersid + '&userpassword=' + userpassword);
  }

  getPortfolio(usersid: string){
    return this.http.get<[userPortfolioData]>(this.portfolioUrl + '?usersid=' + usersid);
  }


  // JSON API
  // setData(id, data){
  //   this.data[id] = data;
  // }

  // getData(id){
  //   return this.data[id];
  // }
}
