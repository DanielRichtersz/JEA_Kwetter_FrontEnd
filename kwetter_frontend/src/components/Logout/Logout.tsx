import * as React from 'react';

export interface ILogoutProps {}

export interface ILogoutStates {}

export default class Logout extends React.Component<ILogoutProps, ILogoutStates> {

    public render(): React.ReactElement<ILogoutProps> {
        return (
            <div id="logoutContainer">
                
            </div>
        )
    }

    constructor(props: ILogoutProps) {
        super(props);
        this.state = {};
    }

}