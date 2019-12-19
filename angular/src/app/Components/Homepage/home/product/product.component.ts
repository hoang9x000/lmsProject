import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../../../../services/products.service'
import { error } from 'util';
import { Products } from 'src/app/models/products.class';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  searchText;
  items = [];
  public products: Products[] = [];
  pageOfItems: Array<Products>;
  constructor(
    public productsService: ProductsService
  ) {

  }

  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.productsService.getAllProducts().subscribe(data => {
      this.items = data.map((x, i) => ({ Nhomsach: data[i] }));
      console.log(this.items);
      //this.products = data;
    }, error => {
      console.log(error);
    }
    );
  }
  onChangePage(pageOfItems: Array<Products>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
    //console.log(this.pageOfItems);
  }

}
