export interface User{
firstName:String
lastName:String
phoneNo:String
email:String
username:String
}
export interface Customer{
id:number;
fullName:String;
phoneNo:String;
pinCode:number;
state:String;
city:String;
houseNo:String;
areaName:String;
typeOfAddress:String;
}
export class customerDetails{
customer!:Customer;
user!:User
constructor(customer:Customer,user:User){
this.customer=customer;
this.user=user
}
}