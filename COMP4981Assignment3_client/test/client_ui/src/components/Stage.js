import React, {Component} from "react";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

class Stage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spacing: '16'
        };
    }

    render() {
        const {classes} = this.props;

        return (
          <Grid container className={classes.root} spacing={12}>
              <Grid item xs={3}>
                  <Paper className={classes.paper}/>
              </Grid>
              <Grid item xs={9}>
                  <Paper className={classes.paper}/>
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
        width:  '90%',
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
});

Stage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Stage);