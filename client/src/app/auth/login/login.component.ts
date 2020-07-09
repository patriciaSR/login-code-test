import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TokenDTO } from '../../models/token-dto.model';
import { LoginService } from '../login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  userToken: TokenDTO;
  subcription: Subscription;
  errorText: string;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  login($event: Event) {
    $event.preventDefault();

    if (!this.form.valid) {
      this.form.markAllAsTouched();
      this.errorText = 'invalid username or password';
      return
    }

    this.subcription = this.loginService.getToken(this.form.value).subscribe(
      (response) => {
        this.userToken = response;

        this.router.navigate(['home']);
      },
      (error) => {
        this.errorText = 'invalid username or password';
        console.log(error);
      });
  }
}
