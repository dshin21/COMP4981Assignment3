import React, {Component} from "react";
import socketIOClient from "socket.io-client";

class App extends Component {
    constructor() {
        super();
        this.state = {
            response: false,
            endpoint: "http://127.0.0.1:4001"
        };
    }

    componentDidMount() {
        const {endpoint} = this.state;
        // const socket = socketIOClient(endpoint);
        // socket.on("FromServer", data => this.setState({response: data},
        //   () => console.log(this.state.response)
        // ));
    }

    render() {
        const {response} = this.state;
        return (
          <div style={{textAlign: "center"}}>
              {response
                ? <p>
                    {response}
                </p>
                : <p>Loading...</p>}
          </div>
        );
    }
}

export default App;