import * as React from 'react';
import HttpRequestService from '../../services/HttpRequestService';

// Fabric UI
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

// Service
import CookiesService from "../../services/CookiesService";

// Cookies
import { Cookies } from 'react-cookie';

export interface ILoginProps {
    loggedIn() : void;
}

export interface ILoginStates {
    email : string;
    password : string;
    cookies: Cookies;
}

export default class Login extends React.Component<ILoginProps, ILoginStates> {

    private httpRequestService = new HttpRequestService();

    public render(): React.ReactElement<ILoginProps> {
        return (
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                    <TextField
                        label="Email"
                        value="test@mail.com"
                        onChanged={(value) => this.setState({email: value})}/>
                </div>
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                    <TextField
                        label="Password"
                        value="Password"
                        onChanged={(value) => this.setState({password: value})}/>
                </div>
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                    <DefaultButton
                        text="Login"
                        onClick={() => this.verifyLogin()} />
                </div>
            </div>
        )
    }

    constructor(props: ILoginProps) {
        super(props);
        this.state = {email : "test@mail.com", password : "Password", cookies: new Cookies()};
        this.httpRequestService = new HttpRequestService();
    }

    verifyLogin() {
        this.httpRequestService.verifyLogin(this.state.email, this.state.password, this.verifyLoginCallback.bind(this));
    }

    verifyLoginCallback(responseText: string, requestSucceeded: boolean, xmlHttp: object) {
        // Callback result > Parse from JSON
        let jsonResult = JSON.parse(responseText);

        // Set the correct cookies
        CookiesService.LogIn(jsonResult.token, jsonResult.user.id);

        // Pass to the parent component that the user is logged in
        this.props.loggedIn();
    }

}