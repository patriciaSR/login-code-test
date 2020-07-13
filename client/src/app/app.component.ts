import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserStoreService } from 'src/app/stores/user-store.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'Login-codeTest-Karumi';

  constructor(
    private userStore: UserStoreService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.userStore.getUserDataSuscription().subscribe(
      (response) => {
        if (!response) {
          this.router.navigate(['login']);
        }
      },
    )
  }
}
