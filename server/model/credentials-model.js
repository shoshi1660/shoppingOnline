const Joi = require("joi");

class CredentialsModel {

    constructor(credentials) {
        this.clientUserName = credentials.clientUserName;
        this.clientPassword = credentials.clientPassword;
    }

    static #validationSchema = Joi.object({
        clientUserName: Joi.string().required().min(6).max(20),
        clientPassword: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
    });

    // validate() {
    //     const result = CredentialsModel.#validationSchema.validate(this, { abortEarly: false });
    //     return result.error ? result.error.details.map(err => err.message) : null;
    // }

    validate() {
        const result = CredentialsModel.#validationSchema.validate(this, { abortEarly: false });
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

module.exports = CredentialsModel;