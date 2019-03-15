import React, {Component} from "react";
import Stage from './components/Stage';
import Landing from './components/Landing';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ipAddress:      false,
            portNumber:     false,
            didReceiveInfo: false
        };
    }

    setServerInfo = (ip, port) => {
        this.setState({
            ipAddress:      ip,
            portNumber:     port,
            didReceiveInfo: true
        });
    };

    render() {
        if (this.state.didReceiveInfo)
            return (<Stage ipAddress={this.state.ipAddress} portNumber={this.state.portNumber}/>);
        else
            return (< Landing setServerInfo={this.setServerInfo}/>);
    }
}

export default App;
