import * as React from 'react';

// Cookies
import { Cookies } from 'react-cookie';

export interface IHttpRequestProps { }

export interface IHttpRequestStates {
    jsonReceived: String;
    cookies: Cookies;
}

export default class HttpRequest extends React.Component<IHttpRequestProps, IHttpRequestStates> {

    public render(): React.ReactElement<IHttpRequestProps> {
        return (
            <div id="HttpRequestContainer">
                HttpRequestContainer
            </div>
        )
    }

    constructor(props: IHttpRequestProps) {
        super(props);
        this.state = {
            jsonReceived: "No data",
            cookies: new Cookies()
        };
    }

    postTweetCallback(responseText: string, requestSucceeded: boolean, xmlHttp: object) {
        console.log("responseText: ", responseText);
        console.log("Requestsucceeded: ", requestSucceeded);
        console.log("xmlHttp: ", xmlHttp);
    }

    getRequest(url: string) {
        fetch(url).then(function(response) {
            return response.json();
        })
        .then(json => this.setJsonReceived(json));
    }

    public setJsonReceived(response: string) : void {
        this.setState({jsonReceived: response});
    }
}