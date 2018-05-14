import * as React from 'react';

export interface IHttpRequestProps { }

export interface IHttpRequestStates {
    jsonReceived: String;
}

export default class HttpRequest extends React.Component<IHttpRequestProps, IHttpRequestStates> {

    public render(): React.ReactElement<IHttpRequestProps> {
        return (
            <div id="HttpRequestContainer">
                <button
                    onClick={() => this.getRequest("localhost:8080/1-1.0-SNAPSHOT/api/users/test")}>
                    Send request <br/>
                </button> <br/>
                {this.state.jsonReceived}
            </div>
        )
    }

    constructor(props: IHttpRequestProps) {
        super(props);
        this.state = {
            jsonReceived: "No data"
        };
    }

    getRequest(url: string) : void {
        fetch(url).then(function(response) {
            return response.json();
        })
        .then(json => this.setJsonReceived(json));
    }

    public setJsonReceived(response: string) : void {
        this.setState({jsonReceived: response});
    }
}