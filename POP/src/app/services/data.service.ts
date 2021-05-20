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

export interface userPostData {
  postdesc: string;
  posturl: string;
  postdate: string; 
  posttype: string;
  postname: string;
  postid: string;
  usersid: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private data = [];

  private url = 'https://student.amphibistudio.sg/10187403A/POP/db/login.php';
  private loginUrl = 'https://student.amphibistudio.sg/10187403A/POP/db/login.php';
  private postsUrl = 'https://student.amphibistudio.sg/10187403A/POP/db/posts.php';
  private uploadUrl = 'https://student.amphibistudio.sg/10187403A/POP/db/uploader.php';

  constructor(
    private http: HttpClient
  ) { }

  get(usersid: string, userpassword:string){
    return this.http.get<[userLoginData]>(this.loginUrl + '?usersid=' + usersid + '&userpassword=' + userpassword);
  }

  getPosts(usersid: string){
    return this.http.get<[userPostData]>(this.postsUrl + '?usersid=' + usersid);
  }

  upload(services: userPostData){
    return this.http.post(this.uploadUrl, services);
  }


  // JSON API
  // setData(id, data){
  //   this.data[id] = data;
  // }

  // getData(id){
  //   return this.data[id];
  // }
}
