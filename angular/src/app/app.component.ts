import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './services/authentication.service';
import { User } from './models/user';
import { Role } from './models/Role';
import { ModalService } from '../app/_modal';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular';
  currentUser: User;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private modalService: ModalService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    // console.log(this.currentUser.Role)
  }
  get isAdmin() {
    return this.currentUser && this.currentUser.Role === Role.Admin;
  }
  openModal(id: string) {
    this.modalService.open(id);
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
