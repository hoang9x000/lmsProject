import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Nhomsach } from '../../../models/productsNhomsach.class';
import { ProductsTheloaiService } from '../../../services/product-detail-book.service';
import { DattruocAll } from '../../../models/dattruocAll.class';
import { User } from '../../../models/user';
import { DattruocService } from '../../../services/dattruoc.service';
import { ModalService } from '../../../_modal';


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
  public mathe: string;
  public masach: string;
  public tensach: string = ""
  constructor(
    public activatedRoute: ActivatedRoute,
    public productDetailBookService: ProductsTheloaiService,
    public dattruocService :DattruocService,
    private modalService: ModalService
  ) {

  }

  ngOnInit() {
    let id = (+this.activatedRoute.snapshot.params['id']);
    // console.log(id);
    this.productDetailBookService.getProductByID(id).subscribe(data => {
      // console.log(this.product data[0]);
      this.product = data;
      // console.log(this.tensach);
    }, error => {
      console.log(error);
    }
    );
  }
  onAdddattruoc(product: Nhomsach) {
    // console.log(product);
    for (var i = 0; i < product.Sach.length; i++) {
      if ((product.Sach[i].Damuon == false) && (product.Sach[1].Tinhtrangsach == true)) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        var _mathe = this.currentUserSubject.value.Mathe.toString();
        // let _dattruoc = new DattruocAll(_mathe, product.Sach[i].Masach);
        this.dattruocService.Adddattruoc(_mathe,product.Sach[i].Masach).subscribe(data=>{
          // console.log(data);
          this.ngOnInit();
        });  
        break; 
      };
    }
  }
  openModal(id: string) {
    this.modalService.open(id);
}

closeModal(id: string) {
    this.modalService.close(id);
}
}
