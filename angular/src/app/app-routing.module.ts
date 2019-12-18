import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './Components/Homepage/home/home.component';
import { ThongtinComponent } from './Components/Homepage/thongtin/thongtin.component';
import { QuydinhComponent } from './Components/Homepage/quydinh/quydinh.component';
import { GioithieuComponent } from './Components/Homepage/gioithieu/gioithieu.component';
import { DangnhapComponent } from './Components/dangnhap/dangnhap.component';
import { TailieuComponent } from './Components/Homepage/tailieu/tailieu.component';
import { ProfileComponent } from './Components/Userpage/profile/profile.component';
import { DetailbookComponent } from './Components/Userpage/detailbook/detailbook.component';
import { DattruocComponent } from './Components/Userpage/dattruoc/dattruoc.component';
import { GiahanComponent } from './Components/Userpage/giahan/giahan.component';
import { ChangepassComponent } from './Components/Userpage/profile/changepass/changepass.component';

import { AdminComponent } from './Components/Adminpage/admin/admin.component';
import { SachComponent } from './Components/Adminpage/sach/sach.component';
import { UsersComponent } from './Components/Adminpage/users/users.component';
import { MuontraComponent } from './Components/Adminpage/muontra/muontra.component'
import { AuthGuard } from './_guards';
import { Role } from './models/role';
import { AdduserComponent } from './Components/Adminpage/users/adduser/adduser.component';
import { EdituserComponent } from './Components/Adminpage/users/edituser/edituser.component';
import { ThemsachComponent } from './Components/Adminpage/sach/themsach/themsach.component';
import { EditsachComponent } from './Components/Adminpage/sach/editsach/editsach.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'thongtin', component: ThongtinComponent },
  { path: 'quydinh', component: QuydinhComponent },
  { path: 'gioithieu', component: GioithieuComponent },
  { path: 'dangnhap', component: DangnhapComponent },
  { path: 'tailieu', component: TailieuComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'detailbook/:id', component: DetailbookComponent },
  { path: 'dattruoc', component: DattruocComponent },
  { path: 'giahan', component: GiahanComponent },
  { path: 'changepass', component: ChangepassComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] }, },
  { path: 'sach', component: SachComponent },
  { path: 'users', component: UsersComponent, },
  { path: 'users/adduser', component: AdduserComponent },
  { path: 'sach/addsach', component: ThemsachComponent },
  {path: 'sach/:Manhomsach' , component: EditsachComponent},
   {path: 'users/:Mathe' , component: EdituserComponent},
  { path: 'muontra', component: MuontraComponent },
  { path: 'sach', component: SachComponent },
  // { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
