
export default class User {
    private firstname : string;
    private lastname : string;
    private id : string;
    private email : string;
    
    public constructor(firstname: string, lastname: string, email: string, id: string) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.id = id;
    }

    public getFirstName() : string {
        return this.firstname;
    }

    public getLastName() : string {
        return this.lastname;
    }

    public getEmail() : string {
        return this.email;
    }

    public getID() : string {
        return this.id;
    }

}