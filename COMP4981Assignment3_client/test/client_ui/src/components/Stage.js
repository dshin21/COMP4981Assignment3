import React, {Component} from "react";
import Message from './Message';
import InputBox from './InputBox';
import socketIOClient from "socket.io-client";

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';

class Stage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ipAddress:  this.props.ipAddress,
            portNumber: this.props.portNumber,
            message:    false,
            spacing:    '16',
            endpoint:   "http://127.0.0.1:4001",
            clients:    [],
            messages:   [],
            myID:       false
        };

        const socket = socketIOClient(this.state.endpoint);
        socket.emit('sendClientInfo', this.state.ipAddress + ' ' + this.state.portNumber);
    }

    componentDidMount() {
        this.getUpdates();
    }

    getUpdates = () => {
        const socket = socketIOClient(this.state.endpoint);
        socket.emit('sendUpdates', ' ');

        socket.on("receiveUpdates", data => this.setState({message: data},
          () => {
              if (data.length === 4) {
                  let parsedID = data[2].split(':')[1];
                  let parsedIP = data[0].split(':')[1];
                  let temp = {
                      id: parsedID,
                      ip: parsedIP
                  };
                  this.updateUsers(temp);
              }
              if (data.length === 5) {
                  let parsedID = data[0].split(':')[1];
                  let parsedIP = data[1].split(':')[1];
                  let temp = {
                      id:  parsedID,
                      ip:  parsedIP,
                      msg: data[2]
                  };
                  this.updateUsers(temp);
                  this.updateMessages(temp);
              }
          }
        ));
    };

    updateUsers = (newClientObj) => {
        let tempClients = this.state.clients;
        let exists = false;

        for (let i = 0; i < tempClients.length; i++) {
            if (tempClients[i].id === newClientObj.id)
                exists = true;
        }

        if (!exists) {
            let obj = {
                id: newClientObj.id,
                ip: newClientObj.ip
            };

            tempClients.push(obj);
            this.setState({clients: tempClients}, () => {
                if (this.state.myID === false)
                    this.setState({myId: this.state.clients[0].id});
            });
        }
    };

    renderClientList = () => {
        return this.state.clients.map((e, i) => {
            return (
              <ListItem button key={i}>
                  <ListItemText primary={`User ${e.id} : ${e.ip}`}/>
              </ListItem>
            );
        });
    };

    updateMessages = (newMsgObj) => {
        let temp = this.state.messages;
        let obj = {
            id:  newMsgObj.id,
            msg: newMsgObj.msg
        };
        temp.push(obj);
        this.setState({messages: temp});
    };

    renderMessages = () => {
        if (this.state.messages.length !== 0)
            return this.state.messages.map((e, i) => {
                {
                    return (
                      <Message key={i}
                               updateMessages={this.updateMessages}
                               updateUsers={this.updateUsers}
                               isMyMsg={e.id === this.state.myID}
                               message={e.msg}/>
                    );
                }
            });
    };

    render() {
        const {classes, theme} = this.props;

        const drawer = (
          <div>
              <div className={classes.toolbar}/>
              <ListItem alignItems={"center"}>
                  <ListItemText>
                      <div style={{textAlign: 'center'}}>Client List</div>
                  </ListItemText>
              </ListItem>
              <Divider/>
              <List>
                  {
                      this.renderClientList()
                  }
              </List>
          </div>
        );

        return (
          <div className={classes.root}>
              <CssBaseline/>
              <AppBar position="fixed" className={classes.appBar}>
                  <Toolbar>
                      <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={this.handleDrawerToggle}
                        className={classes.menuButton}
                      >
                      </IconButton>
                      <Typography variant="h6" color="inherit" noWrap>
                          Daniel's Chat Service
                      </Typography>
                  </Toolbar>
              </AppBar>
              <nav className={classes.drawer}>
                  <Hidden smUp implementation="css">
                      <Drawer
                        container={this.props.container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={this.state.mobileOpen}
                        onClose={this.handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                      >
                          {drawer}
                      </Drawer>
                  </Hidden>
                  <Hidden xsDown implementation="css">
                      <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                      >
                          {drawer}
                      </Drawer>
                  </Hidden>
              </nav>
              <main className={classes.content}>
                  <div className={classes.toolbar}/>
                  <Grid container className={classes.root} spacing={16}>
                      <Grid item xs={9}>
                          {this.state.messages.length !== 0 ? this.renderMessages() :
                            <Message updateMessages={this.updateMessages}
                                     updateUsers={this.updateUsers}
                                     message={`SYSTEM: Welcome!`}/>}
                      </Grid>
                      <Grid item xs={12}>
                          <InputBox/>
                      </Grid>
                  </Grid>
              </main>
          </div>
        );
    }
}

const drawerWidth = 240;

const styles = theme => ({
    root:        {
        display: 'flex',
    },
    drawer:      {
        [theme.breakpoints.up('sm')]: {
            width:      drawerWidth,
            flexShrink: 0,
        },
    },
    appBar:      {
        marginLeft:                   drawerWidth,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    menuButton:  {
        marginRight:                  20,
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar:     theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content:     {
        flexGrow:        1,
        padding:         theme.spacing.unit * 3,
        backgroundColor: '#FAFAFA',
    },
    paper:       {
        height: '90%',
        width:  '90%'
    },
});

Stage.propTypes = {
    classes:   PropTypes.object.isRequired,
    container: PropTypes.object,
    theme:     PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(Stage);
