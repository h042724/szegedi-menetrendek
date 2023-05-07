import { Component, Input, OnInit } from '@angular/core';
import { VehiclesService } from '../../shared/services/vehicles.service';
import { AuthService } from '../../shared/services/auth.service';
import { BookmarksService } from '../../shared/services/bookmarks.service';

import { Vehicle } from '../../shared/models/Vehicle';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {

  @Input() vehicleObject?: Array<Vehicle>;
  loggedInUser?: firebase.default.User | null; 

  constructor(private authService: AuthService, private vehiclesService: VehiclesService, private bookmarksService: BookmarksService) { }

  ngOnInit(): void {
    this.authService.isUserLoggedIn().subscribe(user => {
      this.loggedInUser = user;
      localStorage.setItem('user', JSON.stringify(this.loggedInUser));
    }, error => {
      console.error(error);
      localStorage.setItem('user', JSON.stringify('null'));
    })
    this.vehiclesService.getAllBuses().subscribe((data: Array<Vehicle>) => {
      this.vehicleObject = data;
    })
  }

  bookmark(lineId: string) {
    const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    this.bookmarksService.addBookmark(lineId, user.uid).then(_ => {
      
    }).catch(error => {
      console.log(error);
    })
  }
}
