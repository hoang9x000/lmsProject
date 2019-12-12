import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Nhomsach } from '../../../models/productsNhomsach.class';
import { ProductsTheloaiService } from '../../../services/product-detail-book.service';
import { Dattruoc } from '../../../models/dattruoc.class';
@Component({
  selector: 'app-detailbook',
  templateUrl: './detailbook.component.html',
  styleUrls: ['./detailbook.component.css']
})
export class DetailbookComponent implements OnInit {
  public product: Nhomsach[] = [];
  public dattruoc: Dattruoc[] = [];
  public mathe: string;
  public masach: string;
  public manhomsach: string;
  public tensach: string = ""
  constructor(
    public activatedRoute: ActivatedRoute,
    public productDetailBookService: ProductsTheloaiService
  ) { }

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
  onAdddattruoc() {
    let id = (+this.activatedRoute.snapshot.params['id']);
    this.productDetailBookService.getProductByID(id).subscribe(data => {
      console.log(data);
      for (var i = 0; i < data[0].Sach.length; i++) {
        if (data[0].Sach[i].Damuon == false) {
          this.masach = data[0].Sach[i].Masach;
          this.manhomsach = data[0].Manhomsach;
          console.log(this.masach,this.manhomsach);
          return(this.masach,this.manhomsach);
        }
      }
      // console.log(this.masach = data[0].Sach[0].Masach);
      // this.dattruoc[0].Masach = data[0].Sach[0].Masach;
      // console.log(this.tensach);
    }, error => {
      console.log(error);
    }
    );

  }
}
