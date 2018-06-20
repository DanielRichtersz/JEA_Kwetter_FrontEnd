import * as React from 'react';

// Fabric UI
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

// Services
import CookiesService from '../../services/CookiesService';
import HttpRequestService from '../../services/HttpRequestService';

// Subcomponents
import TweetComponent from '../../subcomponents/Tweet/TweetComponent';

// Entities
import Tweet from '../../entities/Tweet';
import Like from '../../entities/Like';
import User from '../../entities/User';

export interface ITimelineProps {
    timeline: Array<Tweet>;
    setTimeline: (timeline: Array<Tweet>) => boolean;
}

export interface ITimelineStates {
    loadingMessage: string;
    messagesToLoadStartDate: string;
    messagesToLoadEndDate: string;

}

export default class Timeline extends React.Component<ITimelineProps, ITimelineStates> {

    public render(): React.ReactElement<ITimelineProps> {
        const elements: JSX.Element[] = [];
        if (this.props.timeline.length > 0) {
            this.props.timeline.forEach((item, index) => {
                elements.push(
                    <TweetComponent
                        tweet={item}
                        key={index}
                    />
                );
            });
        }

        return (
            <div id="TimelineContainer" className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                    {this.state.loadingMessage}
                </div>
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                    {elements}
                </div>
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                    <DefaultButton
                        text="Reload timeline"
                        onClick={() => this.loadTimeline(
                            this.state.messagesToLoadStartDate,
                            this.state.messagesToLoadEndDate)} />
                </div>
            </div>
        )
    }

    constructor(props: ITimelineProps) {
        super(props);
        let messagesToLoadStartDate = new Date();
        messagesToLoadStartDate.setDate(messagesToLoadStartDate.getDate() - 7);

        this.state = {
            loadingMessage: "Loading timeline",
            messagesToLoadStartDate: String(messagesToLoadStartDate.valueOf()),
            messagesToLoadEndDate: String(Date.now())
        };

        this.loadTimeline(this.state.messagesToLoadStartDate, this.state.messagesToLoadEndDate);
    }

    private loadTimeline(startdate: string, enddate: string): void {
        // Instantiate HttpRequestService
        let httpRequestService = new HttpRequestService();

        // Get current token and userid
        let tokenAndUserId = CookiesService.GetTokenAndUserId();

        // Load timeline for the currentuser, loading all tweets between startdate and enddate
        httpRequestService.loadTimeline(
            startdate,
            enddate,
            String(tokenAndUserId.get("userid")),
            String(tokenAndUserId.get("token")),
            this.loadTimelineCallback.bind(this)
        );
    }

    private loadTimelineCallback(responseText: string,
        requestSucceeded: boolean,
        xmlHttp: object) {
        console.log("Loadtimeline callback");
        console.log("responseText: ", responseText);
        console.log("Requestsucceeded: ", requestSucceeded);
        console.log("xmlHttp: ", xmlHttp);

        let timeline: Array<Tweet> = new Array<Tweet>();

        try {
            // The received timeline (List of tweets)
            // Parse the timeline
            let receivedTimeline = JSON.parse(responseText);
            // For each tweet, create a Tweet entity
            for (let tweet of receivedTimeline) {

                // Parse owner
                let owner: User = new User(
                    tweet.owner.firstName,
                    tweet.owner.lastName,
                    tweet.owner.email.email,
                    tweet.owner.id);

                // Parse likes
                let likes: Array<Like> = new Array<Like>();
                for (let like of tweet.likes) {
                    let dateLiked: Date = new Date(like.dateLiked);
                    let newLike: Like = new Like(like.userId, like.tweetId, dateLiked, like.id);
                    likes.push(newLike);
                }

                // Parse dateCreated
                let dateCreated: Date = new Date(tweet.dateCreatedUTC);

                // Create tweet
                let newTweet: Tweet = new Tweet(
                    tweet.id,
                    dateCreated,
                    owner,
                    likes,
                    tweet.message);
                console.log("Tweet created: ", newTweet);
                timeline.push(newTweet);
            }
            // Set timeline with loaded data
            if (this.props.setTimeline(timeline)) {
                this.setState({ loadingMessage: "Timeline loaded" });
            }
        }
        catch (e) {
            console.log(e);
            this.setState({ loadingMessage: "Could not load timeline" });
        }
    }
}