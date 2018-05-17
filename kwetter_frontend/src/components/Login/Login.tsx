import * as React from 'react';
import { HttpRequestService } from '../../services/HttpRequestService';

// Fabric UI
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

export interface ILoginProps {

}

export interface ILoginStates {
    email : string;
    password : string;
}

export default class Login extends React.Component<ILoginProps, ILoginStates> {

    private httpRequestService = new HttpRequestService();

    public render(): React.ReactElement<ILoginProps> {
        return (
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                    <TextField
                        label="Email" 
                        onChanged={(value) => this.setState({email: value})}/>
                </div>
                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
                    <TextField
                        label="Password"
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
        this.state = {email : "", password : ""};
        this.httpRequestService = new HttpRequestService();
    }

    verifyLogin() {
        this.httpRequestService.verifyLogin(this.state.email, this.state.password, this.verifyLoginCallback);
    }

    verifyLoginCallback(responseText: string, requestSucceeded: boolean, xmlHttp: string) {
        console.log("responseText: ", responseText);
        console.log("Requestsucceeded: ", requestSucceeded);
        console.log("xmlHttp: ", xmlHttp);
    }

}