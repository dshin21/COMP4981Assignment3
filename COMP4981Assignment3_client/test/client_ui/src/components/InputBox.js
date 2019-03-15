import React, {Component} from "react";
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

class InputBox extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {classes} = this.props;

        return (
          <Paper className={classes.root} elevation={1}>
              <InputBase className={classes.input} placeholder="Enter Your Message!"/>
              <Divider className={classes.divider}/>
              <IconButton color="primary" className={classes.iconButton} aria-label="Directions">
              </IconButton>
          </Paper>
        );
    }
}

const styles = theme => ({
    root:       {
        padding:    '2px 4px',
        display:    'flex',
        alignItems: 'center',
        width:      '90%',
        marginTop: '10px'
    },
    input:      {
        marginLeft: 8,
        flex:       1,
    },
    iconButton: {
        padding: 10,
    },
    divider:    {
        width:  1,
        height: 28,
        margin: 4,
    },
});

InputBox.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputBox);
