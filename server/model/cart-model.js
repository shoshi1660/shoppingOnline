const Joi = require("joi");

class CartModel {

    constructor(newCart) {
        this.idCart = newCart.idCart;
        this.clientIdentity = newCart.clientIdentity;
        this.cartCreationDate = newCart.cartCreationDate;
    }

    static #validationSchema = Joi.object({
        idCart: Joi.allow(),
        clientIdentity: Joi.number().required().integer(),
        cartCreationDate: Joi.string().required(),

    });

    validate() {
        const result = CartModel.#validationSchema.validate(this, { abortEarly: false });
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

module.exports = CartModel;