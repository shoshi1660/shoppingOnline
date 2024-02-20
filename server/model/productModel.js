const Joi = require("joi");

class ProductModel {

    constructor(product) {
        this.idProduct = product.idProduct;
        this.productName = product.productName;
        this.idCategory = product.idCategory;
        this.productPrice = product.productPrice;
        this.productImage = product.productImage;
    }

    static #validationSchema = Joi.object({
        idProduct: Joi.allow(),
        productName: Joi.string().required().min(1).max(40),
        idCategory: Joi.number().positive().integer().required(),
        productPrice: Joi.number().positive().integer().required(),
        productImage: Joi.string().required()
    });

    validate() {
        const result = ProductModel.#validationSchema.validate(this, { abortEarly: false });
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

module.exports = ProductModel;