import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css']
})
export class SignInComponent implements OnInit {
  isRegisterd = true;
  formModel = {
   UserName: '',
   Password: ''
  };
    constructor(private service: UserService, private router: Router) { }
    ngOnInit() {
    }
    onSubmit(form: NgForm) {
     this.service.login(form.value).subscribe (
       (res: any) => {
         if (res != null) {
          localStorage.setItem('userId', res);
          this.router.navigateByUrl('/main');
         } else {
          this.isRegisterd = false;
         }
       }
     );
    }
  }
