import * as React from 'react';

import Login from './Login/Login';
import HttpRequest from './HttpRequest';

export interface IHomeProps {

}

export interface IHomeStates {
    showRequestButton: boolean;
}

export default class Home extends React.Component<IHomeProps, IHomeStates> {

    public render(): React.ReactElement<IHomeProps> {
        return (
            <div className="ms-Grid">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                        HomeContainerdiv
                        <button onClick={() => { this.setState({ showRequestButton: !this.state.showRequestButton }) }}>
                            Show request
                        </button>
                    </div>
                </div>
                <div className="ms-Grid-row">
                    {this.state.showRequestButton == false ? <Login /> : <HttpRequest />}
                </div>
            </div>
        )
    }

    constructor(props: IHomeProps) {
        super(props);
        this.state = { showRequestButton: false };
    }

}