import * as React from 'react';

// Fabric UI
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

// Services
import CookiesService from '../../services/CookiesService';
import HttpRequestService from '../../services/HttpRequestService';

export interface ITimelineProps {
    timeline: Array<string>;
    setTimeline: (timeline : Array<string>) => void;
}

export interface ITimelineStates {
    loadingMessage: string;
    messagesToLoadStartDate: string;
    messagesToLoadEndDate: string;

}

export default class Timeline extends React.Component<ITimelineProps, ITimelineStates> {

    public render(): React.ReactElement<ITimelineProps> {
        return (
            <div id="TimelineContainer" className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                    {this.state.loadingMessage}
                </div>
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                    {this.props.timeline}
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
        this.state = {
            loadingMessage: "Loading timeline",
            messagesToLoadStartDate: String(Date.now()),
            messagesToLoadEndDate: String(Date.now() - 7)
        };

        console.log("Timeline.messagesstartdate: " + this.state.messagesToLoadStartDate);
        console.log("Timeline.messagesenddate: " + this.state.messagesToLoadEndDate);

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

    private loadTimelineCallback(responseText: string, requestSucceeded: boolean, xmlHttp: object) {
        console.log("Loadtimeline callback");
        console.log("responseText: ", responseText);
        console.log("Requestsucceeded: ", requestSucceeded);
        console.log("xmlHttp: ", xmlHttp);
        this.setState({ loadingMessage: "Timeline loaded" });
        // Read out the received timeline

        let newTimeline = new Array<string>();
        newTimeline.push("Tweet 1", "Tweet 2", "Tweet 3");
        
        // Set timeline with loaded data
        this.props.setTimeline(newTimeline);
        console.log("loadTimelineCallback timeline is now: ", this.props.timeline);
    }

    public processNewTweets(tweets: Array<string>) {
        for (let newTweet of tweets) {
            let newTimeline: Array<string> = this.props.timeline;
            newTimeline.push(newTweet);
            this.props.setTimeline(newTimeline);
        }
        console.log("Timeline is now: ", this.props.timeline);
    }

}