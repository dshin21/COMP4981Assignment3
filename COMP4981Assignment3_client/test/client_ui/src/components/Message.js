import React, {Component} from "react";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import deepOrange from '@material-ui/core/colors/deepOrange';
import deepPurple from '@material-ui/core/colors/deepPurple';

class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMyMsg:  this.props.isMyMsg,
            message:  this.props.message,
            clientID: this.props.clientID,
            colors:   ['orangeAvatar', 'purpleAvatar', 'avatar']
        };
    }

    render() {
        const {classes} = this.props;
        if (this.state.isMyMsg)
            return (
              <Grid container className={classes.root} spacing={16}>
                  <Grid item xs={12}>
                      <Paper className={classes.paper}>
                          <Grid container className={classes.root} spacing={16}>
                              <Grid item xs={10}>
                                  <div style={{
                                      textAlign: 'right',
                                      margin:    20,
                                  }}>
                                      {this.state.message}
                                  </div>
                              </Grid>
                              <Grid item xs={2}>
                                  <Avatar
                                    className={this.state.clientID > 2 ? classes.avatar : classes[this.state.colors[this.state.clientID]]}>
                                      {this.state.clientID}
                                  </Avatar>
                              </Grid>
                          </Grid>
                      </Paper>
                  </Grid>
              </Grid>
            );
        else
            return (
              <Grid container className={classes.root} spacing={16}>
                  <Grid item xs={12}>
                      <Paper className={classes.paper}>
                          <Grid container className={classes.root} spacing={16}>
                              <Grid item xs={2}>
                                  {this.props.isSystem ? '' :
                                    <Avatar
                                      className={this.state.clientID > 2 ? classes.avatar : classes[this.state.colors[this.state.clientID]]}>
                                        {this.state.clientID}
                                    </Avatar>
                                  }
                              </Grid>
                              <Grid item xs={10}>
                                  <div style={{
                                      textAlign: 'left',
                                      margin:    20,
                                  }}>
                                      {this.state.message}
                                  </div>
                              </Grid>
                          </Grid>
                      </Paper>
                  </Grid>
              </Grid>
            );
    }
}

const styles = theme => ({
    root:         {
        flexGrow: 1,
    },
    paper:        {
        height:  'fit-content',
        width:   '100%',
        padding: 10
    },
    control:      {
        padding: theme.spacing.unit * 2,
    },
    avatar:       {
        margin: 10,
    },
    orangeAvatar: {
        margin:          10,
        color:           '#fff',
        backgroundColor: deepOrange[500],
    },
    purpleAvatar: {
        margin:          10,
        color:           '#fff',
        backgroundColor: deepPurple[500],
    },
});

Message.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Message);
