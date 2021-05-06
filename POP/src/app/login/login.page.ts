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

  sid: string;
  password: string;

  constructor(
    public navCtrl: NavController,
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit() {
  }

  form = new FormGroup({
    sid: new FormControl('', [
      Validators.required, Validators.minLength(10)
    ]),
    password: new FormControl('', [
      Validators.required, Validators.minLength(30)
    ]),
  });

  loginSuccess(){

  }

  connectToDB(){
    let userData = {
      sid: this.sid,
      password: this.password,
    }

    this.dataService.get(userData.sid, userData.password).subscribe(response => {
        if(response != null){  
        //this.showToast('Logged in');
          console.log('link:' + 'https://student.amphibistudio.sg/10196284K/SpaceSluggers_DDWA_Assg2_Codes/db/am2.php?userid=' + userData.sid + '&userpassword=' + userData.password)
          this.loginSuccess();
        }else{
          //this.showErrorToast('Wrong userid/ password');
        }
    })
  }

}
}
