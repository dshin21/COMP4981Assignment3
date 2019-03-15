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
            clients:    []
        };

        const {endpoint} = this.state;
        const socket = socketIOClient(endpoint);
        socket.emit('FromClient', this.state.ipAddress + ' ' + this.state.portNumber);
    }

    componentDidMount() {
        const {endpoint} = this.state;
        const socket = socketIOClient(endpoint);
        socket.on("updates", data => this.setState({message: data},
          () => {
              console.log(this.state.message);
              this.updateUsers(data[1]);
          }
        ));
    }

    updateUsers = (newClientID) => {
        let temp = this.state.clients;
        let exists = false;

        for (let i = 0; i < temp.length; i++) {
            if (temp[i] == newClientID) exists = true;
        }

        if (!exists) {
            temp.push(newClientID);
            this.setState({clients: temp}, () => console.log(this.state.clients));
        }
    };

    renderClientList = () => {
        const {classes} = this.props;
        return this.state.clients.map((e, i) => {
            return (
              <Grid key={i} item xs={12}>
                  <Paper className={classes.userList}>
                      {e}
                  </Paper>
              </Grid>
            );
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
                      <Message updateUsers={this.updateUsers} ipAddress={this.state.ipAddress}
                               portNumber={this.state.portNumber}/>
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
