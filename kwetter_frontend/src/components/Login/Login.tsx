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
    loggedIn(): void;
}

export interface ILoginStates {
    email: string;
    password: string;
    errorMessage: string;
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
                        defaultValue="test@mail.com"
                        onChanged={(value) => this.setState({ email: value, errorMessage: "" })} />
                </div>
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                    <TextField
                        label="Password"
                        defaultValue="Password"
                        errorMessage={this.state.errorMessage}
                        onChanged={(value) => this.setState({ password: value, errorMessage: "" })} />
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
        this.state = { 
            email: "test@mail.com",
            password: "Password", 
            cookies: new Cookies(),
            errorMessage: ""
             };
        this.httpRequestService = new HttpRequestService();
    }

    verifyLogin() {
        this.httpRequestService.verifyLogin(this.state.email, this.state.password, this.verifyLoginCallback.bind(this));
    }

    verifyLoginCallback(responseText: string, requestSucceeded: boolean, xmlHttp: XMLHttpRequest) {
        let jsonResult;
        console.log("responseText: ", responseText);
        console.log("RequestSucceeded: ", requestSucceeded);
        console.log("xmlHttp: ", xmlHttp);

        // Callback result > Parse from JSON
        if (requestSucceeded == true && responseText != "") {
            jsonResult = JSON.parse(responseText);
            console.log("Parsed jsonresult: ", jsonResult);
            // Set the correct cookies
            CookiesService.LogIn(jsonResult.token, jsonResult.user.id);

            // Pass to the parent component that the user is logged in
            this.props.loggedIn();
        }
        else {
            jsonResult = xmlHttp.status;
            if (xmlHttp.status == 404) {
                this.setState({ errorMessage: "Login failed: Incorrect credentials. Please check your username and password and try again"});
            }
            else {
                this.setState({errorMessage: "Login failed"});
            }
        }

    }

}