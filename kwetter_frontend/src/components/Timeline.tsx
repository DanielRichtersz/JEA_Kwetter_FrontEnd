import * as React from 'react';

export interface ITimelineProps {

}

export interface ITimelineStates {
    
}

export default class Timeline extends React.Component<ITimelineProps, ITimelineStates> {

    public render(): React.ReactElement<ITimelineProps> {
        return (
            <div id="TimelineContainer">
                Timeline
            </div>
        )
    }

    constructor(props: ITimelineProps) {
        super(props);
        this.state = {};
    }

}