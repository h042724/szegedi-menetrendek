import { Location } from '@angular/common';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../../shared/models/User';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  
  loggedInUser?: firebase.default.User | null; 
  @Output() onLogout: EventEmitter<boolean> = new EventEmitter();
  user?: User;

  updateUserForm = new FormGroup({
    id: new FormControl(''),
    email: new FormControl(''),
    username: new FormControl(''),
    name: new FormGroup({
      firstname: new FormControl(''),
      lastname: new FormControl('')
    })
  });

  constructor(private location: Location, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    this.userService.getById(user.uid).subscribe(data => {
      this.user = data;
      this.updateUserForm.get('email')?.setValue(this.user?.email);
      this.updateUserForm.get('username')?.setValue(this.user?.username);
      this.updateUserForm.get('name.firstname')?.setValue(this.user?.name.firstname);
      this.updateUserForm.get('name.lastname')?.setValue(this.user?.name.lastname);
    });
  }

  onSubmit() {
    if(this.updateUserForm.valid) {
      const modifiedUser: User = {
        id: this.user?.id as string,
        email: this.updateUserForm.get('email')?.value,
        username: this.updateUserForm.get('username')?.value,
        name: {
          firstname: this.updateUserForm.get('name.firstname')?.value,
          lastname: this.updateUserForm.get('name.lastname')?.value
        }
      }
      this.userService.update(modifiedUser).then(_ => {
        this.router.navigateByUrl('/home');
      }).catch(error => {
        console.log(error);
      })
    }
  }

  goBack() {
    this.location.back();
  }

  /*deleteAccount() {
    this.userService.delete(this.user?.id as string).then(_ => {
      localStorage.clear();
      this.loggedInUser = null;
      this.onLogout.emit();
      this.router.navigateByUrl('/home');
    }).catch(error => {
      console.log(error);
    })
  }*/

}
