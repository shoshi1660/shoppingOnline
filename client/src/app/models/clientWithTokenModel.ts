export class ClientWithTokenModel {
    constructor(
        public clientIdentity: number,
        public clientName: string,
        public clientLastName: string,
        public clientUserName: string,
        public clientEmail: string,
        public token: string,
        public role: string,
        public idCity: number,
        public street: string,
        public idClient: number,
    ) { }

    static convertToFormData(newClient: ClientWithTokenModel) {
        const fd = new FormData();
        fd.append("clientIdentity", newClient.clientIdentity.toString());
        fd.append("clientName", newClient.clientName);
        fd.append("clientLastName", newClient.clientLastName);
        fd.append("clientUserName", newClient.clientUserName);
        fd.append("clientEmail", newClient.clientEmail);
        fd.append("clientPassword", newClient.token);
        fd.append("role", newClient.role);
        fd.append("idCity", newClient.idCity.toString());
        fd.append("street", newClient.street);
        fd.append("idClient", newClient.idClient.toString());
        return fd;
    }
    
    }