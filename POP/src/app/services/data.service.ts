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
  likes: number;
  comments: string;
  likedid: string;
  likedpostid: string;
  likedusersid: string; 
  liked: string;
}

export interface postPostData {
  postdesc: string;
  posturl: string;
  postdate: string; 
  posttype: string;
  postname: string;
  postid: string;
  usersid: string;
  likes: number;
  comments: string;
}

export interface likePostData {
  likedid: string;
  likedpostid: string;
  likedusersid: string; 
  liked: string;
}
export interface commentPostData {
  commentid: string;
  commentpostid: string;
  commentusersid: string; 
  commentfield: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private data = [];

  private url = 'https://student.amphibistudio.sg/10187403A/POP/db/login.php';
  private loginUrl = 'https://student.amphibistudio.sg/10187403A/POP/db/login.php';
  private postsUrl = 'https://student.amphibistudio.sg/10187403A/POP/db/posts.php';
  private profilepostsUrl = 'https://student.amphibistudio.sg/10187403A/POP/db/profile.php';
  private uploadUrl = 'https://student.amphibistudio.sg/10187403A/POP/db/uploader.php';
  private likesUrl = 'https://student.amphibistudio.sg/10187403A/POP/db/liking.php';
  private commentsUrl = 'https://student.amphibistudio.sg/10187403A/POP/db/commenting.php';

  constructor(
    private http: HttpClient
  ) { }

  getAll(){
    return this.http.get<[userPostData]>(this.postsUrl);
  }

  get(usersid: string, userpassword:string){
    return this.http.get<[userLoginData]>(this.loginUrl + '?usersid=' + usersid + '&userpassword=' + userpassword);
  }

  getPosts(usersid: string){
    return this.http.get<[userPostData]>(this.postsUrl + '?usersid=' + usersid);
  }

  getProfilePosts(usersid: string){
    return this.http.get<[userPostData]>(this.profilepostsUrl + '?usersid=' + usersid);
  }

  upload(services: postPostData){
    return this.http.post(this.uploadUrl, services);
  }
  
  getLikes(usersid: string){
    return this.http.get<[likePostData]>(this.likesUrl + '?usersid=' + usersid);
  }

  likes(services: likePostData){
    return this.http.post(this.likesUrl, services);
  }

  comments(services: commentPostData){
    return this.http.post(this.commentsUrl, services);
  }

  getComments(postid: string){
    return this.http.get<[commentPostData]>(this.commentsUrl + '?postid=' + postid)
  }


  // JSON API
  setData(id, data){
    this.data[id] = data;
  }

  getData(id){
    return this.data[id];
  }
}
