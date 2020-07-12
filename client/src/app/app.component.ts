import { Component, OnInit } from '@angular/core';
import { UserData } from 'src/app/models/token-dto.model';
import { UserStoreService } from 'src/app/stores/user-store.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'Login-codeTest-Karumi';
  userLogin: boolean;
  userData: UserData;

  constructor(private userStore: UserStoreService){}

  ngOnInit(): void {
    this.userLogin = this.userStore.isLogin();

    if (this.userLogin) {
      this.userData =  this.userStore.getUserData().user;
    }
  }
}
