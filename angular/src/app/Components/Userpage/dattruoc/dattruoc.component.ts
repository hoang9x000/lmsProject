import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { Products } from 'src/app/models/products.class'
@Component({
  selector: 'app-dattruoc',
  templateUrl: './dattruoc.component.html',
  styleUrls: ['./dattruoc.component.css']
})
export class DattruocComponent implements OnInit {
  public products: Products[] = [];
  constructor(
    public productsService: ProductsService
  ) {

  }

  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.productsService.getAllProducts().subscribe(data => {
      
    this.products = data;
    console.log(this.products);
    }, error => {
      console.log(error);
    }
    );
  }

}
