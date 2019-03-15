import React, {Component} from "react";
import Stage from './components/Stage';
import socketIOClient from "socket.io-client";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: false,
            endpoint: "http://127.0.0.1:4001",
            clientID: false //TODO: if the received msg == clientID, send isMyMsg=true
        };
    }

    componentDidMount() {
        const {endpoint} = this.state;
        const socket = socketIOClient(endpoint);
        socket.on("FromServer", data => this.setState({response: data},
          () => console.log(this.state.response)
        ));
    }

    render() {
        return (
          <Stage message={this.state.response}/>
        );
    }
}

export default App;
