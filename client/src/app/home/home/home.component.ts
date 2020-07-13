import { Component, OnInit } from '@angular/core';
import { TokenDTO } from 'src/app/models/token-dto.model';
import { UserStoreService } from 'src/app/stores/user-store.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userData: TokenDTO;

  constructor(private userStore: UserStoreService) { }

  ngOnInit(): void {
    this.userData =  this.userStore.getUserData();
  }

  logout():void {
    this.userStore.deleteUserData();
  }
}
