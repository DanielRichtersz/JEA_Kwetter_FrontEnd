import * as React from 'react';

export interface IClassnameProps {}

export interface IClassnameStates {}

export default class Classname extends React.Component<IClassnameProps, IClassnameStates> {

    public render(): React.ReactElement<IClassnameProps> {
        return (
            <div id="classnameContainer">
                
            </div>
        )
    }

    constructor(props: IClassnameProps) {
        super(props);
        this.state = {};
    }

}