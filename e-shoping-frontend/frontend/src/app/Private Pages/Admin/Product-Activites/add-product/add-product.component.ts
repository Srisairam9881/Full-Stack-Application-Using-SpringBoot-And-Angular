import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminActionsService } from 'src/app/Services/Admin-Actions/admin-actions.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit{
  
selectedFile!: File;
products={
productName:'',
modelName:'',
modelNumber:'',
description:'',
price:'',
offeredPrice:'',
stockUnit:'',
productImage:'',
category:{
categoryName:'',
type:''
}
}
categories: any[] = []; // Array to store list of categories
onFileSelected(event:any): void {
this.selectedFile = event.target.files[0];
}
constructor(private router:Router,private adminActions: AdminActionsService,public snackBar:MatSnackBar,public dialogRef: MatDialogRef<AddProductComponent>) { }
ngOnInit(): void {
// Load categories when component initializes
this.loadCategories();
}
loadCategories(): void {
this.adminActions.getAllCategories().subscribe((data: any) => {
this.categories = data;
});
}
submitForm(){
const formData =new FormData(); 
formData.append('productName',this.products.productName);
formData.append('modelName',this.products.modelName);
formData.append('modelName',this.products.modelNumber);
formData.append('description',this.products.description);
formData.append('price',this.products.price);
formData.append('offeredPrice',this.products.offeredPrice);
formData.append('stockUnit',this.products.stockUnit);
formData.append('categoryName',this.products.category.categoryName);
formData.append('categoryType',this.products.category.type);
formData.append('image',this.selectedFile);
this.adminActions.addProduct(formData).subscribe((data:any)=>{
this.goToProductList();
this.dialogRef.close();
this.snackBar.open('product has been added successfully!!!.','close',{duration:3000});
window.location.reload();
},(err)=>{
this.snackBar.open('Something wrong in backend','close',{duration:3000});
})
}
goToProductList()
{
this.router.navigate(['/admin-dashboard/list-products/']);
}
}
