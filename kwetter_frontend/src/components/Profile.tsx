import * as React from 'react';

export interface IProfileProps {

}

export interface IProfileStates {
    
}

export default class Profile extends React.Component<IProfileProps, IProfileStates> {

    public render(): React.ReactElement<IProfileProps> {
        return (
            <div id="ProfileContainer">
                Profilepage
            </div>
        )
    }

    constructor(props: IProfileProps) {
        super(props);
        this.state = {};
    }

}