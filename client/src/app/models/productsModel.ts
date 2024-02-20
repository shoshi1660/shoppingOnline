export class ProductModel {
    constructor(
        public idProduct: number,
        public productName: string,
        public idCategory: number,
        public productPrice: number,
        public productImage: string) { }

    static convertToFormData(product: ProductModel) {
        const fd = new FormData();
        fd.append("productName", product.productName);
        fd.append("idCategory", product.idCategory.toString());
        fd.append("productPrice", product.productPrice.toString());
        fd.append("productImage", product.productImage.toString());
        return fd;
    }
}