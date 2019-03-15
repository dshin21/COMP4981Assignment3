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
            spacing:    '16',
            endpoint:   "http://127.0.0.1:4001"
        };

        const {endpoint} = this.state;
        const socket = socketIOClient(endpoint);
        socket.emit('FromClient', this.state.ipAddress + ' ' + this.state.portNumber);
    }

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
                  </Paper>
              </Grid>
              <Grid item xs={9}>
                  <Paper className={classes.paper}>
                      <Message ipAddress={this.state.ipAddress} portNumber={this.state.portNumber}/>
                  </Paper>
              </Grid>
          </Grid>
        );
    }
}

const styles = theme => ({
    root:    {
        flexGrow: 1,
        padding:  '10px'
    },
    paper:   {
        height: 800,
        width:  '90%'
    },
    heading: {
        textAlign: 'center'
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
});

Stage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Stage);
