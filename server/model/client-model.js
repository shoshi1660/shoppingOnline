const Joi = require("joi");

class ClientModel {

    constructor(client) {

        this.clientIdentity = client.clientIdentity;
        this.clientName = client.clientName;
        this.clientLastName = client.clientLastName;
        this.clientUserName = client.clientUserName;
        this.clientEmail = client.clientEmail;
        this.clientPassword = client.clientPassword;
        this.role=client.role;
        this.idCity = client.idCity;
        this.street = client.street;
    }

    static #validationSchema = Joi.object({
        clientIdentity: Joi.number().required().integer(),
        clientName: Joi.string().required().min(1).max(20),
        clientLastName: Joi.string().required().min(1).max(20),
        clientUserName: Joi.string().required().min(6).max(20),
        clientEmail: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        clientPassword: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")).required(),
        role:Joi.allow(),
        idCity: Joi.number().integer(),
        street: Joi.string().required().min(2).max(20),

    });

    

    validate() {
        const result = ClientModel.#validationSchema.validate(this, { abortEarly: false });
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

module.exports = ClientModel;