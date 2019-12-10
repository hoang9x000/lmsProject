import { Component, OnInit, OnDestroy } from '@angular/core';
import {ProductsService} from '../../../../services/products.service'
import { error } from 'util';
import { Products } from 'src/app/models/products.class';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  searchText;
  public producs :  Products[] =[];
  constructor(
    public productsService : ProductsService
  ) {

   }

  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.productsService.getAllProducts().subscribe(data =>{
      // console.log(data);
      this.producs = data;
    },error => {
      console.log(error);
    }
    );
  }

}
