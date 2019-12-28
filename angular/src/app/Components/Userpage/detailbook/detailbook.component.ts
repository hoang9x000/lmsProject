import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Nhomsach } from '../../../models/productsNhomsach.class';
import { ProductDetailBookService } from '../../../services/product-detail-book.service';
import { DattruocAll } from '../../../models/dattruocAll.class';
import { User } from '../../../models/user';
import { DattruocService } from '../../../services/dattruoc.service';
import { ModalService } from '../../../_modal';
import { UserService } from '../../../services/user.service';


import { BehaviorSubject, Observable, from } from 'rxjs';

@Component({
  selector: 'app-detailbook',
  templateUrl: './detailbook.component.html',
  styleUrls: ['./detailbook.component.css']
})
export class DetailbookComponent implements OnInit {
  // private userService : UserService;
  private currentUserSubject: BehaviorSubject<User>;
  public product: Nhomsach[] = [];
  public dattruoc: DattruocAll[] = [];
  public user: User[] = [];
  public sosachdamuon : number ;
  public ngayhethan : number;
  public _now : number;
  constructor(
    public activatedRoute: ActivatedRoute,
    public productDetailBookService: ProductDetailBookService,
    public dattruocService: DattruocService,
    private modalService: ModalService,
    private userService : UserService
  ) {

  }

  ngOnInit() {
    let id = (+this.activatedRoute.snapshot.params['id']);
    // console.log(id);
    this.productDetailBookService.getProductByID(id).subscribe(data => {
      console.log(data);
      this.product = data;
      // console.log(this.tensach);
    }, error => {
      console.log(error);
    }
    );
  }
  onAdddattruoc(product: Nhomsach) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    var mathe = this.currentUserSubject.value.Mathe.toString();
    console.log(mathe);
    this.userService.ShowProfile(mathe).subscribe(data1 => {
      console.log(data1.Sosachdamuon);
      // this.user = data;
      this.sosachdamuon = data1.Sosachdamuon;
      this.ngayhethan = new Date(data1.Ngayhethan).getTime();
      this._now = Date.now();
    });
    if(this.ngayhethan < this._now){
      alert("Thẻ đã hết hạn mượn sách! Vui lòng đến thư viện để gia hạn!");
    }
    else
    if(this.sosachdamuon == 7){
      alert("Bạn chị được mượn tối đa 7 sách!");
    }else
    if (product.Soluongcon == 0) {
      alert("Sách này đã hết !");
    } else
      for (var i = 0; i < product.Sach.length; i++) {
        if ((product.Sach[i].Damuon == false) && (product.Sach[i].Tinhtrangsach == true)) {
          this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
          var _mathe = this.currentUserSubject.value.Mathe.toString();
          // let _dattruoc = new DattruocAll(_mathe, product.Sach[i].Masach);
          this.dattruocService.Adddattruoc(_mathe, product.Sach[i].Masach).subscribe(data => {
            // console.log(data);
            alert("Đặt trước thành công !");
            this.ngOnInit();
          });
          break;
        };
      }
  }
}
