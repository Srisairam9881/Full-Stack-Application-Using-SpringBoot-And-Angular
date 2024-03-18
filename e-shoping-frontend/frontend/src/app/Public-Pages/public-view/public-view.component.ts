import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminActionsService } from 'src/app/Services/Admin-Actions/admin-actions.service';

@Component({
selector: 'app-public-view',
templateUrl: './public-view.component.html',
styleUrls: ['./public-view.component.css']
})
export class PublicViewComponent implements OnInit{
products:any[]=[];
constructor(private productService: AdminActionsService,public snackbar:MatSnackBar,public router:Router) { }
ngOnInit(): void {
this.loadProducts();
}
loadProducts(): void {
this.productService.getAllProducts().subscribe((data:any)=>{
this.products=data;
console.log(data);
},(err)=>{
this.snackbar.open('something went wrong in server.Please try again later sometime','close',{duration:3000});
})
}
viewProductDetails(modelName:string){
this.router.navigate(['/product', modelName]);
}
}
