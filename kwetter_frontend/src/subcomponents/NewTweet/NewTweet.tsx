import * as React from 'react';

// Fabric UI
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

// Service
import CookiesService from '../../services/CookiesService';
import HttpRequestService from '../../services/HttpRequestService';

// Entities
import Tweet from '../../entities/Tweet';
import User from '../../entities/User';
import Like from '../../entities/Like';

export interface INewTweetProps {
    newTweetAdded?: (tweet: Tweet) => void;
}

export interface INewTweetStates {
    newTweetMessage: string;
    errorMessage: string;
}

export default class NewTweet extends React.Component<INewTweetProps, INewTweetStates> {

    public render(): React.ReactElement<INewTweetProps> {
        return (
            <div id="NewTweetContainer" className="ms-Grid-row">
                <TextField
                    label="Post a new tweet:"
                    errorMessage={this.state.errorMessage}
                    onChanged={(value) => this.setState({ newTweetMessage: value, errorMessage: "" })} />
                <DefaultButton
                    text="Post tweet"
                    onClick={() => this.postTweet()} />
            </div>
        )
    }

    constructor(props: INewTweetProps) {
        super(props);
        this.state = { newTweetMessage: "", errorMessage: "" };
    }

    postTweet() {
        if (this.state.newTweetMessage == "") {
            this.setState({ errorMessage: "To post a tweet, insert a message" })
        }
        else {
            let httpRequestService = new HttpRequestService();
            let tokenAndUserId = CookiesService.GetTokenAndUserId();
            httpRequestService.postTweet(
                this.state.newTweetMessage,
                String(tokenAndUserId.get("userid")),
                String(tokenAndUserId.get("token")),
                this.postTweetCallback.bind(this));
        }
    }

    postTweetCallback(responseText: string, requestSucceeded: boolean, xmlHttp: object) {
        console.log("responseText: ", responseText);
        console.log("Requestsucceeded: ", requestSucceeded);
        console.log("xmlHttp: ", xmlHttp);

        // Callback result > Parse from JSON
        let tweet = JSON.parse(responseText);
        let newTweet: Tweet;
        console.log("Parsed Json added tweet: ", tweet);

        if (requestSucceeded == true) {
            try {
                let owner: User = new User(
                    tweet.owner.firstName,
                    tweet.owner.lastName,
                    tweet.owner.email.email,
                    tweet.owner.id);

                // Since the tweet is new, no likes exist but an empty array will be added
                let likes: Array<Like> = new Array<Like>();

                // Parse date
                let dateCreated: Date = new Date(tweet.dateCreatedUTC);
                newTweet = new Tweet(
                    tweet.id,
                    dateCreated,
                    owner,
                    likes,
                    tweet.message);
                console.log("Tweet created: ", newTweet);
                return newTweet;
            }
            catch (e) {
                throw new Error("Could not parse new tweet");
            }
        }
        else {
            throw new Error("Failed to submit new tweet, please try again");
        }
    }
}