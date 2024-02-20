const Joi = require("joi");

class ItemCartModel {

    constructor(itemCart) {
        this.idItem = itemCart.idItem;
        this.idProduct = itemCart.idProduct;
        this.ProductQuantity = itemCart.ProductQuantity;
        this.generalPrice = itemCart.generalPrice;
        this.idCart = itemCart.idCart;
    }

    static #validationSchema = Joi.object({
        idItem: Joi.allow(),
        idProduct: Joi.number().required().integer(),
        ProductQuantity: Joi.number().required().integer(),
        generalPrice: Joi.number().required().integer(),
        idCart: Joi.number().required().integer(),
    });

    validate() {
        const result = ItemCartModel.#validationSchema.validate(this, { abortEarly: false });
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

module.exports = ItemCartModel;