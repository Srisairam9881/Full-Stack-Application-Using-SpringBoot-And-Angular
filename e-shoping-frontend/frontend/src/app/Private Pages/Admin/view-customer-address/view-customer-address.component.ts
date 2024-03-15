import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminActionsService } from 'src/app/Services/Admin-Actions/admin-actions.service';

@Component({
selector: 'app-view-customer-address',
templateUrl: './view-customer-address.component.html',
styleUrls: ['./view-customer-address.component.css']
})
export class ViewCustomerAddressComponent implements OnInit {
customers: any[] = []; // Adjust the type according to your data structure
displayedColumns: string[] = ['username', 'email', 'fullName', 'phoneNo', 'pinCode', 'state', 'city', 'houseNo', 'areaName', 'typeOfAddress'];

constructor(private adminActions: AdminActionsService, public snackBar: MatSnackBar) { }

ngOnInit(): void {
this.loadUsers();
}

loadUsers() {
this.adminActions.getAllCustomerAddess().subscribe(
(data: any) => {
// Map the response data to match the structure of your customers array
this.customers = data.map((item: any) => ({
user: item.user,
fullName: item.customerDetailsList[0].fullName,
phoneNo: item.customerDetailsList[0].phoneNo,
pinCode: item.customerDetailsList[0].pinCode,
state: item.customerDetailsList[0].state,
city: item.customerDetailsList[0].city,
houseNo: item.customerDetailsList[0].houseNo,
areaName: item.customerDetailsList[0].areaName,
typeOfAddress: item.customerDetailsList[0].typeOfAddress
}));
},
(err) => {
this.snackBar.open('Error fetching user data', 'Close', {
duration: 3000
});
}
);
}

}
