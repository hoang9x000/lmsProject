import { Component, OnInit } from '@angular/core';
import { ProductsTheloaiService } from '../../../../services/products-theloai.service'
import { error } from 'util';
import { Products } from 'src/app/models/productsTheloai.class';
import { Nhomsach } from 'src/app/models/productsNhomsach.class'
import { from } from 'rxjs';

@Component({
  selector: 'app-showproducts',
  templateUrl: './showproducts.component.html',
  styleUrls: ['./showproducts.component.css']
})
export class ShowproductsComponent implements OnInit {

  public theloai : Products[] = [];
  public nhomsach: Nhomsach[] = [];
  public username : string = ""
  constructor(
    public productsTheloaiService: ProductsTheloaiService
  ) {

  }
  ngOnInit() {
    this.loadData();
    // this.loadDataTheloai();
  }

  loadData() {
    this.productsTheloaiService.getAllTheloai1().subscribe(data => {
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
