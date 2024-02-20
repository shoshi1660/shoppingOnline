export class LoginModel {
    token: string;
    constructor(
        public clientUserName: string,
        public clientPassword: string,
    ) { }

    static convertToFormData(user: LoginModel) {
        const fd = new FormData();
        fd.append("clientUserName", user.clientUserName);
        fd.append("clientPassword", user.clientPassword);
        return fd;
    }
}