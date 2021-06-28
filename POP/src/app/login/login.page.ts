import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usersid: string;
  userpassword: string;

  constructor(
    public navCtrl: NavController,
    private router: Router,
    private dataService: DataService,
    public toastCtrl:ToastController,
  ) { }

  ngOnInit() {
    //auto login
    this.loginChecker();
  }

  async showToast(data: any) {
    const toast = await this.toastCtrl.create({
      message: data,
      duration: 2000,
      position: 'top',
      color: 'success'
    });
    toast.present();
  }

  async showErrorToast(data: any) {
    const toast = await this.toastCtrl.create({
      message: data,
      duration: 2000,
      position: 'top',
      color: 'danger'
    });
    toast.present();
  }

  form = new FormGroup({
    usersid: new FormControl('', [
      Validators.required, Validators.minLength(9)
    ]),
    userpassword: new FormControl('', [
      Validators.required, Validators.minLength(2)
    ]),
  });

  async loginChecker(){
    // this.dataService.setData('user', userData);
    const storage = new Storage();
    await storage.create();

    // await storage.set('usersid', userData.usersid);
    // await storage.set('userpassword', userData.userpassword);


    const currentsidCheck = await storage.get('usersid');
    const currentpwCheck = await storage.get('userpassword');


    if (currentsidCheck !== '' && currentpwCheck !== ''){
      console.log(currentsidCheck + 'to' + currentpwCheck)

      
      this.dataService.get(currentsidCheck, currentpwCheck).subscribe(response => {
        if(response != null){  
        //this.showToast('Logged in');
          console.log('link:' + 'https://student.amphibistudio.sg/10187403A/POP/db/login.php?usersid=' + currentsidCheck + '&userpassword=' + currentpwCheck);
          this.showToast('Welcome Back: ' + currentsidCheck);

          this.router.navigate(['/home']);
        }else{
          //this.showErrorToast('Wrong userid/ password');
          this.showErrorToast('Error');
          console.log("Error auto login");
        }
    })

    }else{
      console.log('== empty');
      return;
    }
    
  }

  async loginSuccess(){
    let userData = {
      usersid: this.usersid,
      userpassword: this.userpassword,
    }

    //Convert all letters to uppercase
    userData.usersid = this.usersid.toUpperCase();

    // this.dataService.setData('user', userData);
    const storage = new Storage();
    await storage.create();

    await storage.set('usersid', userData.usersid);
    await storage.set('userpassword', userData.userpassword);


    const currentsid = await storage.get('usersid');
    const currentpw = await storage.get('userpassword');

    // this.router.navigateByUrl('/home');
    this.router.navigate(['/home']);

    console.log('success placeholder: ');
    console.log('currentsid: ' + currentsid);
    console.log('currentpw: ' + currentpw);
  }

  connectToDB(){
    let userData = {
      usersid: this.usersid,
      userpassword: this.userpassword,
    }

    this.dataService.get(userData.usersid, userData.userpassword).subscribe(response => {
        if(response != null){  
        //this.showToast('Logged in');
          console.log('link:' + 'https://student.amphibistudio.sg/10187403A/POP/db/login.php?usersid=' + userData.usersid + '&userpassword=' + userData.userpassword);
          this.showToast('Login Successful');
          this.loginSuccess();
        }else{
          //this.showErrorToast('Wrong userid/ password');
          this.showErrorToast('Wrong SID/ Password');
          console.log("Wrong SID/ Password");
        }
    })
  }

}