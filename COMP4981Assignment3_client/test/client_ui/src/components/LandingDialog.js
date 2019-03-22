import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";

class LandingDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ipAddress: false,
      portNumber: false,
      isIpAddress: this.props.isIpAddress,
      isPortNumber: this.props.isPortNumber,
      shouldOpen: true,
      text: ""
    };
  }

  handleClose = isCancel => {
    if (!isCancel) {
      this.setState({ shouldOpen: false });
      if (this.state.isIpAddress)
        this.props.setServerInfo(true, this.state.text);
      if (this.state.isPortNumber)
        this.props.setServerInfo(false, this.state.text);
    } else {
      this.setState({ shouldOpen: false });
    }
  };

  handleChange = e => {
    this.setState({ text: e.target.value });
  };

  render() {
    return (
      <Dialog
        open={this.state.shouldOpen}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Enter the Server's{" "}
          {this.state.isIpAddress ? "IP Address" : "Port Number"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={this.state.isIpAddress ? "IP Address" : "Port Number"}
            type="text"
            fullWidth
            onChange={this.handleChange.bind(this)}
            value={this.state.text}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.handleClose(true)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => this.handleClose(false)} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const styles = theme => ({
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  }
});

LandingDialog.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LandingDialog);
