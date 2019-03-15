import React, {Component} from "react";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMyMsg: this.props.isMyMsg,
            message: this.props.message
        };
    }

    render() {
        const {classes} = this.props;
        if (this.state.isMyMsg)
            return (
              <Grid container className={classes.root} spacing={12}>
                  <Grid item xs={6}>
                  </Grid>
                  <Grid item xs={6}>
                      <Paper className={classes.paper}>
                          {this.state.message[0]}
                      </Paper>
                  </Grid>
              </Grid>
            );
        else
            return (
              <Grid container className={classes.root} spacing={12}>
                  <Grid item xs={6}>
                      <Paper className={classes.paper}>
                          {this.state.message[0]}
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
