import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Nhomsach} from './../../models/productsNhomsach.class'
import {ProductsTheloaiService} from './../../services/product-detail-book.service'
@Component({
  selector: 'app-detailbook',
  templateUrl: './detailbook.component.html',
  styleUrls: ['./detailbook.component.css']
})
export class DetailbookComponent implements OnInit {
  public product : Nhomsach[] = [];
  public tensach : string = ""
  constructor(
    public activatedRoute : ActivatedRoute,
    public productDetailBookService : ProductsTheloaiService 
  ) { }

  ngOnInit() {
    let id = (+this.activatedRoute.snapshot.params['id']);
    console.log(id);
    this.productDetailBookService.getProductByID(id).subscribe(data => {
      console.log(data[0]);
      this.product = data;
      // console.log(this.tensach);
    }, error => {
      console.log(error);
    }
    );
      
  }
}
