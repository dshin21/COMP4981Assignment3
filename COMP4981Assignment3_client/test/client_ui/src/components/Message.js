import React, {Component} from "react";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import socketIOClient from "socket.io-client";

class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ipAddress:  this.props.ipAddress,
            portNumber: this.props.portNumber,
            isMyMsg:    this.props.isMyMsg,
            message:    false,
            endpoint:   "http://127.0.0.1:4001",
            clientID:   false //TODO: if the received msg == clientID, send isMyMsg=true
        };
    }

    componentDidMount() {
        this.getInitInfo();
    }

    getInitInfo = () => {
        const {endpoint} = this.state;
        const socket = socketIOClient(endpoint);
        socket.emit('sendInit', ' ');
        socket.on("updates", data => this.setState({message: data},
          () => {
              if (data.length === 4)
                  this.sendInfoUpForUpdate([data[2], data[0]]);
              if (data.length === 5)
                  this.sendInfoUpForUpdate([data[0],data[1]]);
              console.log(this.state.message);
          }
        ));
    };

    sendInfoUpForUpdate = (newID) => {
        this.props.updateUsers(newID);
    };

    render() {
        const {classes} = this.props;
        if (this.state.isMyMsg)
            return (
              <Grid container className={classes.root} spacing={16}>
                  <Grid item xs={6}>
                  </Grid>
                  <Grid item xs={6}>
                      <Paper className={classes.paper}>
                          {this.state.message}
                      </Paper>
                  </Grid>
              </Grid>
            );
        else
            return (
              <Grid container className={classes.root} spacing={16}>
                  <Grid item xs={6}>
                      <Paper className={classes.paper}>
                          {this.state.message}
                      </Paper>
                  </Grid>
                  <Grid item xs={6}>
                  </Grid>
              </Grid>
            );
    }
}

const styles = theme => ({
    root:    {
        flexGrow: 1,
        padding:  10
    },
    paper:   {
        height: 100,
        width:  '100%',
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
});

Message.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Message);
