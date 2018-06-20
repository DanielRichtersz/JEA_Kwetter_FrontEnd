import * as React from 'react';

// Components
import Login from './Login/Login';
import Profile from './Profile/Profile'

// Service
import CookiesService from '../services/CookiesService';

export interface IHomeProps {

}

export interface IHomeStates {
    loggedIn: boolean;
}

export default class Home extends React.Component<IHomeProps, IHomeStates> {

    public render(): React.ReactElement<IHomeProps> {
        return (
            <div className="ms-Grid">
                <div className="ms-Grid-row">
                    {!this.state.loggedIn ?
                        <Login loggedIn={this.loggedInCookie.bind(this)} /> :
                        <Profile />}
                </div>
            </div>
        )
    }

    constructor(props: IHomeProps) {
        super(props);
        this.state = { loggedIn: false };
    }

    private loggedInCookie(): void {
        this.setState({ loggedIn: CookiesService.LoggedInCheck() })
    }

}