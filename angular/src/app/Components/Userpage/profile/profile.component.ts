import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Phieumuon } from 'src/app/models/phieumuon/phieumuon.class';
import { ModalService } from '../../../_modal';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import custom validator to validate that password and confirm password fields match
import { MustMatch } from './../../../_helpers/checkPassword';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  private currentUserSubject: BehaviorSubject<User>;

  public user: User[] = [];
  constructor(
    public userService: UserService,
    private modalService: ModalService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.loadData();

    this.registerForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    },
    );
  }
  loadData() {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    var _mathe = this.currentUserSubject.value.Mathe.toString();
    // console.log(_mathe);
    this.userService.ShowProfile(_mathe).subscribe(data => {
      console.log(data);
      this.user = data;

    }, error => {
      console.log(error);
    });
  }
  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }
  onSubmit(user:User) {
      this.submitted = true;
      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return ;
      }
      user.Password = this.registerForm.controls.password.value;
      console.log(user)
      this.userService.ChangePassword(user).subscribe(data => {
        console.log(data);
        // this.user = data;

      }, error => {
        console.log(error);
      });
      // display form values on success
      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }

  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }
}
