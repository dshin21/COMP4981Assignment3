import React, {Component} from "react";
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import NavigationIcon from '@material-ui/icons/Navigation';
import Fab from '@material-ui/core/Fab';
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

    onClickSubmit = () => {
        this.props.onClickSubmit({msg:this.state.userInput});
        this.setState({userInput: ''});
    };

    render() {
        const {classes} = this.props;

        return (
          <BottomNavigation
            onChange={this.handleChange}
            className={classes.root}
          >
              <InputBase className={classes.input}
                         placeholder="Enter Your Message!"
                         value={this.state.userInput}
                         onChange={this.handleChange.bind(this)}
              />
              <Divider className={classes.divider}/>
              <Fab
                variant="extended"
                size="small"
                color="primary"
                aria-label="Add"
                className={classes.margin}
                onClick={this.onClickSubmit}
              >
                  <NavigationIcon className={classes.extendedIcon}/>
                  Send
              </Fab>
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
        marginRight: 8,
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
