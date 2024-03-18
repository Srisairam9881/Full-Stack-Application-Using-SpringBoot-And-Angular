export interface CartItem {
product: {
id: number;
productName: string;
modelName: string;
modelNumber: string;
description: string;
price: number;
offeredPrice: number;
stockUnit: number;
createdDate: Date;
updatedDate: Date;
productImage: string;
category: {
id: number;
categoryName: string;
type: string;
createdDate: Date;
updatedDate: Date;
};
};
imageUrl: string;
quantity: number;
}
