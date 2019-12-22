import { Component, OnInit,Input} from '@angular/core';
import { error } from 'util';
import { Nhomsach } from 'src/app/models/productsNhomsach.class'
import { from } from 'rxjs';

@Component({
  selector: 'app-showproducts',
  templateUrl: './showproducts.component.html',
  styleUrls: ['./showproducts.component.css']
})
export class ShowproductsComponent implements OnInit {
  @Input ('key') theloai1 :Nhomsach[] = [];
  @Input ('key1') Theloai1 :string = "";
  constructor() {}
  ngOnInit() {
  }
}
