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
            ipAddress:   this.props.ipAddress,
            portNumber:  this.props.portNumber,
            message:     false,
            spacing:     '16',
            endpoint:    "http://127.0.0.1:4001",
            clients:     [],
            messages:    [],
            messageList: [],
            myID:        false
        };

        const {endpoint} = this.state;
        const socket = socketIOClient(endpoint);
        socket.emit('FromClient', this.state.ipAddress + ' ' + this.state.portNumber);
    }

    updateUsers = (newClientID) => {
        let temp = this.state.clients;
        let exists = false;

        for (let i = 0; i < temp.length; i++) {
            if (temp[i].id == newClientID[0].split(':')[1]) exists = true;
        }

        if (!exists) {
            let obj = {
                id: newClientID[0].split(':')[1],
                ip: newClientID[1].split(':')[1]
            };
            temp.push(obj);
            this.setState({clients: temp}, () => {
                if (this.state.myID === false)
                    this.setState({myId: this.state.clients[0].id}
                      // , () => console.log(this.state.myId)
                    );
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

    updateMessages = (id, msg) => {
        let temp = this.state.messages;
        console.log(this.state.messages);
        let obj = {
            id:  id.split(':')[1],
            msg: msg
        };

        temp.push(obj);

        this.setState({messages: temp});

        let tempMsgList = this.state.messageList;
        tempMsgList.push(<Message key={this.state.messages.length}
                                  updateMessages={this.updateMessages}
                                  updateUsers={this.updateUsers}
                                  isMyMsg={obj.id === this.state.myID}
                                  message={obj.msg}/>);
        this.setState({messageList: tempMsgList});
    };

    renderMessages = () => {
        return this.state.messageList.map((e) => {
            {
                return (e);
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
                                 myID={99}/>}
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
