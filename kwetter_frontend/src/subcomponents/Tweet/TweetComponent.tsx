import * as React from 'react';
import Tweet from '../../entities/Tweet';
import './Tweet.css';

export interface ITweetProps {
    tweet: Tweet;
}

export interface ITweetStates { }

export default class TweetComponent extends React.Component<ITweetProps, ITweetStates> {

    public render(): React.ReactElement<ITweetProps> {

        return (
            <div className="ms-Grid-row tweetContainer">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 tweetTitleDiv">
                    <b>
                        {this.props.tweet.getOwner().getFirstName() + " " + this.props.tweet.getOwner().getLastName()}
                    </b>
                </div>
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 tweetContentDiv">
                    {this.props.tweet.getMessage()} 
                </div>
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 tweetLikesDiv">
                    
                    {"Tweeted on: " 
                    + this.props.tweet.getDateCreated().getHours() + ":" 
                    + this.props.tweet.getDateCreated().getMinutes() + ":" 
                    + this.props.tweet.getDateCreated().getSeconds() + " "
                    + this.props.tweet.getDateCreated().getDate() + "-" 
                    + this.props.tweet.getDateCreated().getMonth() + "-" 
                    + this.props.tweet.getDateCreated().getFullYear()} <br/>
                    {this.props.tweet.getLikes().length + " likes"}
                </div>
            </div>
        )
    }

    constructor(props: ITweetProps) {
        super(props);
        this.state = {};
    }

}