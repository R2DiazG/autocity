import { ServiciosService } from './../../services/servicios.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { ShopService } from './../../services/shop.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.css']
})
export class ShopDetailComponent implements OnInit {
  model: any = {};
  servicios: any;
  // reviews: any;

  constructor(private shopService: ShopService, private router: Router, private route: ActivatedRoute, private toastr: ToastrService, private servicioService: ServiciosService) { }

  ngOnInit(): void {
    this.bringShop();
    this.showServices();
    // this.showShopReviews();
  }

  bringShop() {
    this.shopService.getSelectedShop(this.route.snapshot.paramMap.get('id')).subscribe(response => {
      this.model = response;
      console.log(response);
    }, error => {
      console.log(error);
      this.toastr.error('An error occurred');
    })
  }

  showServices() {
    this.servicioService.bringServices(this.route.snapshot.paramMap.get('id')).subscribe(response => {
      this.servicios = response;
      console.log(response);
    }, error => {
      console.log(error);
    })
  }

  // showShopReviews() {
  //   this.shopService.getReviews(this.route.snapshot.paramMap.get('id')).subscribe(response => {
  //     this.reviews = response;
  //     console.log(response);
  //   }, error => {
  //     console.log(error);
  //   })
  // }

  borrar(id: string) {
    this.shopService.deleteShop(id).subscribe(response => {
      this.toastr.success('Shop deleted successfully');
      console.log(response);
      this.router.navigateByUrl('/Shops');
    }, error => {
      console.log(error);
      this.toastr.error('An error occurred');
    })
  }

  agregar() {

  }

}
