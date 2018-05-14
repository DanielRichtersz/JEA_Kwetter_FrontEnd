import * as React from 'react';
import Login from './Login';
import HttpRequest from './HttpRequest';

export interface IHomeProps {

}

export interface IHomeStates {
    showRequestButton: boolean;
}

export default class Home extends React.Component<IHomeProps, IHomeStates> {

    public render(): React.ReactElement<IHomeProps> {
        return (
            <div id="HomeContainer">
                <div>
                    HomeContainerdiv
                    <button onClick={()=> {this.setState({showRequestButton: true})}}>Show request</button>
                </div>
                {this.state.showRequestButton == false ? <Login/> : <HttpRequest/>}
            </div>
        )
    }

    constructor(props: IHomeProps) {
        super(props);
        this.state = {showRequestButton:false};
    }

}