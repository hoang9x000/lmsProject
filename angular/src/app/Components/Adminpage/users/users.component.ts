import { Component, OnInit,OnDestroy } from '@angular/core';
import { UsersService } from './../../../services/users.service';
import { Subscription } from 'rxjs';
import { Users } from './../../../models/users.class';
import { Routes, RouterModule } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  public Subscription : Subscription;
  public users : Users[] = [];
  public user : Users = null;
  constructor(
    public usersService : UsersService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.Subscription = this.usersService.getAllUsers().subscribe((data: Users[]) => {
      //console.log(data);
       this.users = data;
      console.log(data)
    }, error => {
      //console.log(error);
      this.usersService.handleError(error);
    });
  }

  ngOnDestroy() {
    if(this.Subscription)
    {
      this.Subscription.unsubscribe();
    }
  }

  edituser(item : Users)
  {
      this.user = item;
  }

  deleteuser(Mathe : string)
  {
    console.log(Mathe);
    this.Subscription = this.usersService.deleteuser(Mathe).subscribe((data: Users) => {
      //console.log(data);
     // console.log(data.Mathe);
      this.updateDataAfterDelete(Mathe);
    });
  }

  updateDataAfterDelete(Mathe : string){
      for( var i = 0; i < this.users.length; i++)
      {
          if( this.users[i].Mathe == Mathe)
          {
              this.users.splice(i,1);
              break;
          }
      }
  }
}