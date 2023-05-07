import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loggedInUser?: firebase.default.User | null; 
  homeImage = document.getElementById("slides") as HTMLImageElement;
  // TODO: infinite slideshow (https://stackblitz.com/edit/infinite-slideshow?file=src%2Fapp%2Fapp.component.ts)
  slideShowImgSrc = ['IMG_0618', 'IMG_0988' , 'IMG_1033' , 'IMG_9033', 'IMG_20211024_194959', 'IMG_20211112_072348', 'IMG_20211130_072405' ,'IMG_20220107_075748', ];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isUserLoggedIn().subscribe(user => {
      this.loggedInUser = user;
      localStorage.setItem('user', JSON.stringify(this.loggedInUser));
    }, error => {
      console.error(error);
      localStorage.setItem('user', JSON.stringify('null'));
    })
  }


}
