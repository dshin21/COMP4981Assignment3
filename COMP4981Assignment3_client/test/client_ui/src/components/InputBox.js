import React, {Component} from "react";
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import BottomNavigation from '@material-ui/core/BottomNavigation';

class InputBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: ''
        };
    }

    handleChange = e => {
        this.setState({userInput: e.target.value});
    };

    render() {
        const {classes} = this.props;

        return (
          <BottomNavigation
            onChange={this.handleChange}
            showLabels
            className={classes.root}
          >
              <InputBase className={classes.input}
                         placeholder="Enter Your Message!"
                         value={this.state.userInput}
                         onChange={this.handleChange.bind(this)}
              />
              <Divider className={classes.divider}/>
              <IconButton color="primary" className={classes.iconButton} aria-label="Directions">
              </IconButton>
          </BottomNavigation>
        );
    }
}

const styles = theme => ({
    root:       {
        padding:    '2px 4px',
        display:    'flex',
        alignItems: 'center',
        width:      '90%',
        marginTop:  '10px'
    },
    nav_root:   {
        width: 500,
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
