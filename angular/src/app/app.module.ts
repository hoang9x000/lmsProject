import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HomeComponent } from './Components/Homepage/home/home.component';
import { ThongtinComponent } from './Components/Homepage/thongtin/thongtin.component';
import { QuydinhComponent } from './Components/Homepage/quydinh/quydinh.component';
import { GioithieuComponent } from './Components/Homepage/gioithieu/gioithieu.component';
import { DangnhapComponent } from './Components/dangnhap/dangnhap.component';
import { TailieuComponent } from './Components/Homepage/tailieu/tailieu.component';
import { ChangepassComponent } from './Components/Userpage/profile/changepass/changepass.component';
import { ProfileComponent } from './Components/Userpage/profile/profile.component';
import { DetailbookComponent } from './Components/Userpage/detailbook/detailbook.component';
import { GiahanComponent } from './Components/Userpage/giahan/giahan.component';
import { DattruocComponent } from './Components/Userpage/dattruoc/dattruoc.component';
import { ProductComponent } from './Components/Homepage/home/product/product.component';
import { ShowproductsComponent } from './Components/Homepage/tailieu/showproducts/showproducts.component';
import { AdminComponent } from './Components/Adminpage/admin/admin.component';
import { SachComponent } from './Components/Adminpage/sach/sach.component';
import { ThemsachComponent } from './Components/Adminpage/sach/themsach/themsach.component';
import { MuontraComponent } from './Components/Adminpage/muontra/muontra.component';
import { ChomuonComponent } from './Components/Adminpage/muontra/chomuon/chomuon.component';
import { AdduserComponent } from './Components/Adminpage/users/adduser/adduser.component';
import { UsersComponent } from './Components/Adminpage/users/users.component';
import { SearchProductComponent } from './Components/Homepage/tailieu/search-product/search-product.component';

import { ProductsService } from './services/products.service';
import { Showproducts1Component } from './Components/Homepage/tailieu/showproducts1/showproducts1.component';
import { Showproducts2Component } from './Components/Homepage/tailieu/showproducts2/showproducts2.component';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { EdituserComponent } from './Components/Adminpage/users/edituser/edituser.component';
// import { fakeBackendProvider } from './_helpers';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    ThongtinComponent,
    QuydinhComponent,
    GioithieuComponent,
    DangnhapComponent,
    TailieuComponent,
    ChangepassComponent,
    UsersComponent,
    ProfileComponent,
    DetailbookComponent,
    GiahanComponent,
    DattruocComponent,
    ProductComponent,
    ShowproductsComponent,
    AdminComponent,
    SachComponent,
    ThemsachComponent,
    MuontraComponent,
    ChomuonComponent,
    AdduserComponent,
    SearchProductComponent,
    Showproducts1Component,
    Showproducts2Component,
    EdituserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Ng2SearchPipeModule,
    FormsModule,
    ReactiveFormsModule,

    // import HttpClientModule after BrowserModule.
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // fakeBackendProvider,
    ProductsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
