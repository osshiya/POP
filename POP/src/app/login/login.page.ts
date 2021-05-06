import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

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
    private dataService: DataService
  ) { }

  ngOnInit() {
  }

  form = new FormGroup({
    usersid: new FormControl('', [
      Validators.required, Validators.minLength(10)
    ]),
    userpassword: new FormControl('', [
      Validators.required, Validators.minLength(2)
    ]),
  });

  loginSuccess(){
    console.log('success placeholder');
  }

  connectToDB(){
    let userData = {
      usersid: this.usersid,
      userpassword: this.userpassword,
    }

    this.dataService.get(userData.usersid, userData.userpassword).subscribe(response => {
        if(response != null){  
        //this.showToast('Logged in');
          console.log('link:' + 'https://student.amphibistudio.sg/10187403A/POP/db/login.php?usersid=' + userData.usersid + '&userpassword=' + userData.userpassword)
          this.loginSuccess();
        }else{
          //this.showErrorToast('Wrong userid/ password');
          console.log("Wrong SID/ Password");
        }
    })
  }

}