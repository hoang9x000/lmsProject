import { Component, OnInit, OnDestroy } from '@angular/core';
//import { Users } from 'src/app/models/users.class';
import { UsersService } from './../../../../services/users.service';
import { Subscription } from 'rxjs';
import { Users } from './../../../../models/users.class';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Routes, RouterModule } from '@angular/router';
import { User } from 'src/app/models/user';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit, OnDestroy {

  public users : Users[]=[];
  public Subscription : Subscription;
  public SubscriptionParams : Subscription;
  public Mathe : string;
  public Password: string;
  public Hoten : string;
  public Gioitinh : boolean =true;
  public Ngaysinh : Date;
  public Diachi : string;
  public Ngaydangki : Date;
  public Ngayhethan : Date;
  public Role : string;
  public user : Users;

  constructor(
    public usersService : UsersService,
    public activatedRouteService : ActivatedRoute,
    public routerService : Router
  ) { }

  ngOnInit() {
    this.user = new Users();  
    this.loadData();
  }

  loadData()
  {
      this.SubscriptionParams = this.activatedRouteService.params.subscribe( (data : Params) =>  {
        //console.log(data)
        let Mathe = data['Mathe'];
        this.Subscription = this.usersService.getUser(Mathe).subscribe((user : Users) => {
            //console.log(user);
             this.user = user;
        });
      });
  }

  onedituser()
  {
      this.Subscription = this.usersService.updateuser(this.user).subscribe(( data : Users) => {
          //console.log(data);
          this.routerService.navigateByUrl('/users');
      });
  }

  ngOnDestroy() {
    if(this.Subscription)
    {
      this.Subscription.unsubscribe();
    }
    if(this.SubscriptionParams)
    {
      this.SubscriptionParams.unsubscribe();
    }
  }


}
