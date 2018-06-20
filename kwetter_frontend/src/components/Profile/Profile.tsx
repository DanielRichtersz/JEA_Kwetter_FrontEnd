import * as React from 'react';

// Components
import Timeline from "../Timeline/Timeline";

// Subcomponents
import NewTweet from "../../subcomponents/NewTweet/NewTweet";


export interface IProfileProps {

}

export interface IProfileStates {
    timeline : Array<string>;
}

export default class Profile extends React.Component<IProfileProps, IProfileStates> {

    public render(): React.ReactElement<IProfileProps> {
        return (
            <div className="ms-Grid-row">
                <div id="ProfileContainer" className="ms-Grid-col ms-sm6 ms-md6 ms-lg12">
                    <div id="profileDataDiv" className="ms-Grid-col ms-sm6 ms-md6 ms-lg12">
                        Profilepage
                    </div>
                    <div id="newTweetDiv" className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                        <NewTweet newTweetAdded={this.newTweetAdded.bind(this)}/>
                    </div>
                </div>
                <div id="TimelineContainer" className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                    <Timeline 
                    timeline={this.state.timeline} 
                    setTimeline={(timeline) => this.setTimeline(timeline)} />
                </div>
            </div>
        )
    }

    constructor(props: IProfileProps) {
        super(props);
        this.state = { timeline : new Array<string>() };
    }

    private newTweetAdded(tweet: string) : void {
        let newTweetArray = this.state.timeline;
        newTweetArray.push(tweet)
        this.setState({timeline : newTweetArray});
    }

    private setTimeline(newTimeline : Array<string>) : void {
        console.log("Settimeline newtimeline: ", newTimeline);
        this.setState({timeline: newTimeline});
    }


}