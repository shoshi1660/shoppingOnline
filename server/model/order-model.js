const Joi = require("joi");

class OrderModel {

    constructor(newOrder) {
        this.idOrder = newOrder.idOrder;
        this.clientIdentity = newOrder.clientIdentity;
        this.idCart = newOrder.idCart;
        this.finalPrice = newOrder.finalPrice;
        this.idCity = newOrder.idCity;
        this.street = newOrder.street;
        this.shipingDate = newOrder.shipingDate;
        this.orderDate = newOrder.orderDate;
        this.fourLastDigits = newOrder.fourLastDigits;
    }

    static #validationSchema = Joi.object({
        idOrder: Joi.allow(),
        clientIdentity: Joi.number().required().integer(),
        idCart: Joi.number().required(),
        finalPrice: Joi.number().required(),
        idCity: Joi.number().required(),
        street: Joi.string().required(),
        shipingDate: Joi.string().required(),
        orderDate: Joi.string().required(),
        fourLastDigits: Joi.string().required().min(4).max(4),
    });

    validate() {
        const result = OrderModel.#validationSchema.validate(this, { abortEarly: false });
        if (result.error) {
            const errObj = {};
            for (const err of result.error.details) {
                errObj[err.context.key] = err.message;
            }
            return errObj
        }
        return null;
    }
}

module.exports = OrderModel;