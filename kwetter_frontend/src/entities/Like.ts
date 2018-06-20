
export default class Like {

    private id: string;
    private userId: string;
    private tweetId: string;
    private dateLiked: Date;

    constructor(userId: string, tweetId: string, dateLiked: Date, id: string) {
        this.userId = userId;
        this.tweetId = tweetId;
        this.dateLiked = dateLiked;
        this.id = id;
    }

    public getUserID() : string {
        return this.userId;
    }

    public getTweetID() : string {
        return this.tweetId;
    }

    public getDateLiked() : Date { 
        return this.dateLiked;
    }

    public getID() : string {
        return this.id;
    }

}