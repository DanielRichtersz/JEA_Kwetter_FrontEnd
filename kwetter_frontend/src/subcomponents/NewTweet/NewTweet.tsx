import * as React from 'react';

// Fabric UI
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

// Service
import CookiesService from '../../services/CookiesService';
import HttpRequestService from '../../services/HttpRequestService';

export interface INewTweetProps {
    newTweetAdded ?: (tweet: string) => void;
}

export interface INewTweetStates {
    newTweetMessage : string;
    errorMessage : string;
 }

export default class NewTweet extends React.Component<INewTweetProps, INewTweetStates> {

    public render(): React.ReactElement<INewTweetProps> {
        return (
            <div id="NewTweetContainer">
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
        this.state = { newTweetMessage : "", errorMessage : ""};
    }

    postTweet() {
        if (this.state.newTweetMessage == "") {
            this.setState({errorMessage : "To post a tweet, insert a message"})
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
        let jsonResult = JSON.parse(responseText);
        console.log("Parsed Json added tweet: ", jsonResult);

        if (requestSucceeded == true) {
            console.log("Request succeeded!")
            console.log("props newtweetadded mthode: ");
            console.log(this.props.newTweetAdded);

            if (this.props.newTweetAdded != undefined && 
                this.props.newTweetAdded != null) {

                this.props.newTweetAdded(jsonResult.message);
            }
        }
    }
}