export class User {
    public email: string;
    public firstName: string;
    public lastName: string;
    public key: string;

    constructor(email: string, firstName: string, lastName: string, key: string) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.key = key;
    }

}
