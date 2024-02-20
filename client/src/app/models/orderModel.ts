export class OrderModel {
    constructor(
        public idOrder: number,
        public clientIdentity: number,
        public idCart: number,
        public finalPrice: number,
        public idCity: number,
        public street: string,
        public shipingDate: Date,
        public orderDate: Date,
        public fourLastDigits: string,
    ) { }

    static convertToFormData(newOrder: OrderModel) {
        const fd = new FormData();
        fd.append("idOrder", newOrder.idOrder.toString());
        fd.append("clientIdentity", newOrder.clientIdentity.toString());
        fd.append("idCart", newOrder.idCart.toString());
        fd.append("finalPrice", newOrder.finalPrice.toString());
        fd.append("idCity", newOrder.idCity.toString());
        fd.append("street", newOrder.street);
        fd.append("shipingDate", newOrder.shipingDate.toString());
        fd.append("orderDate", newOrder.orderDate.toString());
        fd.append("fourLastDigits", newOrder.fourLastDigits);
        return fd;
    }
}