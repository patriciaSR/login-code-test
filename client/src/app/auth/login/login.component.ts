import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserStoreService } from 'src/app/stores/user-store.service';
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
  errorText: string;

  constructor(
    private loginService: LoginService,
    private userStore: UserStoreService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  async login($event: Event): Promise<void> {
    $event.preventDefault();

    if (!this.form.valid) {
      this.form.markAllAsTouched();
      this.errorText = 'Invalid username or password';
      return;
    }

    try {
      const response = await this.loginService.getToken(this.form.value);

      this.userStore.saveUserData(response);
      this.router.navigate(['home']);
    } catch (error) {
      this.errorText = 'Invalid username or password';
    }
  }
}
