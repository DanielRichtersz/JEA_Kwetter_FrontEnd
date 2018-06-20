import User from './User';
import Like from './Like';

export default class Tweet {

    private id: string;
    private dateCreated: Date;
    private owner: User;
    private likes: Array<Like>;
    private message: string;

    constructor(id: string, dateCreated: Date, owner: User, likes: Array<Like>, message: string) {
        this.id = id;
        this.dateCreated = dateCreated;
        this.owner = owner;
        this.likes = likes;
        this.message = message;
    }

    public getId() : string {
        return this.id;
    }

    public getDateCreated() : Date {
        return this.dateCreated;
    }

    public getOwner() : User {
        return this.owner;
    }

    public getMessage() : string {
        return this.message;
    }

    public getLikes() : Array<Like> {
        return this.likes;
    }
}