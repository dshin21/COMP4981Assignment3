import React, {Component} from "react";
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import LandingDialog from './LandingDialog';

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ipAddress:         false,
            portNumber:        false,
            ipClicked:         false,
            portNumberClicked: false,
            shouldOpen:        true
        };
    }

    setServerInfo = (isIp, text) => {
        if (isIp) {
            this.setState({ipAddress: text});
        } else {
            this.setState({portNumber: text});
        }
    };

    onSave = () => {
        if (this.state.ipAddress && this.state.portNumber) {
            this.props.setServerInfo(this.state.ipAddress, this.state.portNumber);
            this.setState({shouldOpen: false});
        } else
            console.log("Please Complete the Form");
    };

    Transition = (props) => {
        return <Slide direction="up" {...props} />;
    };

    render() {
        const {classes} = this.props;

        return (
          <Dialog
            fullScreen
            open={this.state.shouldOpen}
            TransitionComponent={this.Transition}
          >
              <AppBar className={classes.appBar}>
                  <Toolbar>
                      <Typography variant="h6" color="inherit" className={classes.flex}>
                          Welcome to Daniel's Chat Service
                      </Typography>
                      <Button color="inherit" onClick={this.onSave}>
                          save
                      </Button>
                  </Toolbar>
              </AppBar>
              <List>
                  <ListItem button onClick={() => this.setState({ipClicked: !this.state.ipClicked})}>
                      <ListItemText primary="IP Address" secondary={this.state.ipAddress}/>
                      {this.state.ipClicked ?
                        <LandingDialog isIpAddress={true} setServerInfo={this.setServerInfo}/> : ''}
                  </ListItem>
                  <Divider/>
                  <ListItem button onClick={() => this.setState({portNumberClicked: !this.state.portNumberClicked})}>
                      <ListItemText primary="Port Number" secondary={this.state.portNumber}/>
                      {this.state.portNumberClicked ?
                        <LandingDialog isPortNumber={true} setServerInfo={this.setServerInfo}/> : ''}
                  </ListItem>
              </List>
          </Dialog>
        );
    }
}

const styles = theme => ({
    appBar: {
        position: 'relative',
    },
    flex:   {
        flex: 1,
    },
});

Landing.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Landing);
