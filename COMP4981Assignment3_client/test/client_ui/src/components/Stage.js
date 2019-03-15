import React, {Component} from "react";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Message from './Message';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import socketIOClient from "socket.io-client";

class Stage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ipAddress:  this.props.ipAddress,
            portNumber: this.props.portNumber,
            message:    false,
            spacing:    '16',
            endpoint:   "http://127.0.0.1:4001",
            clients:    [],
            messages:   [],
            myID:       false
        };

        const socket = socketIOClient(this.state.endpoint);
        socket.emit('sendClientInfo', this.state.ipAddress + ' ' + this.state.portNumber);
    }

    componentDidMount() {
        this.getUpdates();
    }

    getUpdates = () => {
        const socket = socketIOClient(this.state.endpoint);
        socket.emit('sendUpdates', ' ');

        socket.on("receiveUpdates", data => this.setState({message: data},
          () => {
              if (data.length === 4) {
                  let parsedID = data[2].split(':')[1];
                  let parsedIP = data[0].split(':')[1];
                  let temp = {
                      id: parsedID,
                      ip: parsedIP
                  };
                  this.updateUsers(temp);
              }
              if (data.length === 5) {
                  let parsedID = data[0].split(':')[1];
                  let parsedIP = data[1].split(':')[1];
                  let temp = {
                      id:  parsedID,
                      ip:  parsedIP,
                      msg: data[2]
                  };
                  this.updateUsers(temp);
                  this.updateMessages(temp);
              }
          }
        ));
    };

    updateUsers = (newClientObj) => {
        let tempClients = this.state.clients;
        let exists = false;

        for (let i = 0; i < tempClients.length; i++) {
            if (tempClients[i].id === newClientObj.id)
                exists = true;
        }

        if (!exists) {
            let obj = {
                id: newClientObj.id,
                ip: newClientObj.ip
            };

            tempClients.push(obj);
            this.setState({clients: tempClients}, () => {
                if (this.state.myID === false)
                    this.setState({myId: this.state.clients[0].id});
            });
        }
    };

    renderClientList = () => {
        const {classes} = this.props;
        return this.state.clients.map((e, i) => {
            return (
              <Grid key={i} item xs={12}>
                  <Paper className={classes.userList}>
                      User {e.id}: {e.ip}
                  </Paper>
              </Grid>
            );
        });
    };

    updateMessages = (newMsgObj) => {
        let temp = this.state.messages;
        let obj = {
            id:  newMsgObj.id,
            msg: newMsgObj.msg
        };
        temp.push(obj);
        this.setState({messages: temp});
    };

    renderMessages = () => {
        if (this.state.messages.length !== 0)
            return this.state.messages.map((e, i) => {
                {
                    return (
                      <Message key={i}
                               updateMessages={this.updateMessages}
                               updateUsers={this.updateUsers}
                               isMyMsg={e.id === this.state.myID}
                               message={e.msg}/>
                    );
                }
            });
    };

    render() {
        const {classes} = this.props;

        return (
          <Grid container className={classes.root} spacing={16}>
              <Grid item xs={12}>
                  <Paper className={classes.heading}>
                      <h1>Daniel's Chat Service</h1>
                  </Paper>
              </Grid>
              <Grid item xs={3}>
                  <Paper className={classes.paper}>
                      <Grid container className={classes.root} spacing={16}>
                          {this.renderClientList()}
                      </Grid>
                  </Paper>
              </Grid>
              <Grid item xs={9}>
                  <Paper className={classes.paper}>
                      {this.state.messages.length !== 0 ? this.renderMessages() :
                        <Message updateMessages={this.updateMessages}
                                 updateUsers={this.updateUsers}
                                 message={`Welcome!`}/>}
                  </Paper>
              </Grid>
          </Grid>
        );
    }
}

const styles = theme => ({
    root:     {
        flexGrow: 1,
        padding:  '10px'
    },
    paper:    {
        height: 800,
        width:  '90%'
    },
    userList: {
        height: 50,
        width:  '90%'
    },
    heading:  {
        textAlign: 'center'
    },
    control:  {
        padding: theme.spacing.unit * 2,
    },
});

Stage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Stage);
