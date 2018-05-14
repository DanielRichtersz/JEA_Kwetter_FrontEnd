import * as React from 'react';

export interface ILoginProps {

}

export interface ILoginStates {
    
}

export default class Login extends React.Component<ILoginProps, ILoginStates> {

    public render(): React.ReactElement<ILoginProps> {
        return (
            <div id="LoginContainer">
                Login page
            </div>
        )
    }

    constructor(props: ILoginProps) {
        super(props);
        this.state = {};
    }

}