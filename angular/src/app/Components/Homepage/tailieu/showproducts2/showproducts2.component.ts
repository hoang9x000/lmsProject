import { Component, OnInit } from '@angular/core';
import { ProductsTheloaiService } from '../../../../services/products-theloai.service'
import { error } from 'util';
import { Products } from 'src/app/models/productsTheloai.class';
import { Nhomsach } from 'src/app/models/productsNhomsach.class'
import { from } from 'rxjs';
@Component({
  selector: 'app-showproducts2',
  templateUrl: './showproducts2.component.html',
  styleUrls: ['./showproducts2.component.css']
})
export class Showproducts2Component implements OnInit {

  public theloai : Products[] = [];
  public nhomsach: Nhomsach[] = [];
  public username : string = "";
  constructor(
    public productsTheloaiService: ProductsTheloaiService
  ) {

  }

  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.productsTheloaiService.getAllTheloai3().subscribe(data => {
      // console.log(data[0].Nhomsach[0]);
      this.username=data[0].Tentheloai;
      this.nhomsach = data[0].Nhomsach;
      // console.log(this.theloai[0].Nhomsach[0]);
    }, error => {
      console.log(error);
    }
    );
  }
}
