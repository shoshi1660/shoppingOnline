export class ClientModel {
    constructor(
        public clientIdentity: number,
        public clientName: string,
        public clientLastName: string,
        public clientUserName: string,
        public clientEmail: string,
        public clientPassword: string,
        public role: number,
        public idCity: number,
        public street: string,

    ) { }

    static convertToFormData(newClient: ClientModel) {
        const fd = new FormData();
        fd.append("clientIdentity", newClient.clientIdentity.toString());
        fd.append("clientName", newClient.clientName);
        fd.append("clientLastName", newClient.clientLastName);
        fd.append("clientUserName", newClient.clientUserName);
        fd.append("clientEmail", newClient.clientEmail);
        fd.append("clientPassword", newClient.clientPassword);
        fd.append("idCity", newClient.idCity.toString());
        fd.append("street", newClient.street);
        return fd;
    }
}