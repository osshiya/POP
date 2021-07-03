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
  comments: number;
  likedid: string;
  likedpostid: string;
  likedusersid: string; 
  liked: string;
}

export interface userData {
  usersid: string;
  useremail: string;
  username: string; 
  userpassword: string;
  userfirstname: string;
  userlastname: string;
  userschool: string;
  userdiploma: number;
  useryear: number;
  useravatarurl: string;
  userbio: string;
  school: string; 
  schoolbadge: string;

  userdob: string;
  usercontactno: string;
  usergender: string;
  userlink: string;
}

export interface customUserData{
  useremail: string;
  usercontactno: number;
  username: string;
  userpassword: string;
  useravatarurl: string;
  userdob: string;
  userbio: string;
  usergender: string;
  userlink: string;
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
  comments: number;
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

export interface useravatarurl {
  useravatarurl: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private data = [];

  private url = 'https://student.amphibistudio.sg/10187403A/POP/db/login.php';
  private loginUrl = 'https://student.amphibistudio.sg/10187403A/POP/db/login.php';
  private postsUrl = 'https://student.amphibistudio.sg/10187403A/POP/db/posts.php';
  // private profilepostsUrl = 'https://student.amphibistudio.sg/10187403A/POP/db/profile.php';
  private uploadUrl = 'https://student.amphibistudio.sg/10187403A/POP/db/uploader.php';
  private likesUrl = 'https://student.amphibistudio.sg/10187403A/POP/db/liking.php';
  private commentsUrl = 'https://student.amphibistudio.sg/10187403A/POP/db/commenting.php';
  private profileUrl = 'https://student.amphibistudio.sg/10187403A/POP/db/profile.php';
  private updateprofileUrl = 'https://student.amphibistudio.sg/10187403A/POP/db/updateuser.php';
  private updateprofilepicUrl = 'https://student.amphibistudio.sg/10187403A/POP/db/updateuserpic.php';

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

  getPostProfile(){
    return this.http.get<[userPostData]>(this.profileUrl);
  }

  getProfile(){
    return this.http.get<[userData]>(this.profileUrl);
  }

  getUniqueProfile(usersid){
    return this.http.get<[userData]>(this.profileUrl + '?usersid=' + usersid);
  }

  // getProfile(usersid: string){
  //   return this.http.get<[userPostData]>(this.profileUrl + '?usersid=' + usersid);
  // }

  // getProfilePosts(usersid: string){
  //   return this.http.get<[userPostData]>(this.profilepostsUrl + '?usersid=' + usersid);
  // }

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

  updateuser(services: customUserData, usersid: string){
    return this.http.put(this.updateprofileUrl + '?usersid=' + usersid, services);
  }

  updateuserpic(services: useravatarurl, usersid: string){
    return this.http.put(this.updateprofilepicUrl + '?usersid=' + usersid, services);
  }


  // JSON API
  setData(id, data){
    this.data[id] = data;
  }

  getData(id){
    return this.data[id];
  }
}
