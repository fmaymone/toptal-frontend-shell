import React, { Component } from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import { withRouter } from "react-router-dom";
import * as AuthActions from "../../store/actions/authActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { injectIntl } from "react-intl";
import { setDialogIsOpen } from "rmw-shell/lib/store/dialogs/actions";
import withAppConfigs from '../../utils/withAppConfigs'


const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      confirm_password: ""
    };
  }

  handleClose = () => {
    const { setDialogIsOpen } = this.props.actions;
    setDialogIsOpen("login_error", false);
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { name, email, password, confirm_password } = this.state;
    this.props.SignUp(
      name,
      email,
      password,
      confirm_password,
      this.props.history
    );
  };

  validateForm() {
    return (
      this.state.name.length &&
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirm_password
    );
  }

  render() {
    const { classes, auth, intl, dialogs, history } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Name</InputLabel>
              <Input
                id="name"
                value={this.state.name}
                name="name"
                autoFocus
                onChange={this.handleChange("name")}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                id="email"
                value={this.state.email}
                name="email"
                autoFocus
                onChange={this.handleChange("email")}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                value={this.state.password}
                onChange={this.handleChange("password")}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Confirm Password</InputLabel>
              <Input
                name="confirm_password"
                type="password"
                id="confirm_password"
                value={this.state.confirm_password}
                onChange={this.handleChange("confirm_password")}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={!this.validateForm()}
            >
              Sign up
            </Button>
             <br />
             <br />
            <Button
              onClick={() => {
                history.push("/signin");
              }}
              className={classes.button}
              variant="outlined"
              color="primary"
            >
              {"Sign In"}
            </Button>
          </form>
          <Dialog
            open={dialogs.login_error === true}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-comment"
          >
            <DialogTitle id="login-dialog-title">Login Error</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-comment">
                {auth.error && auth.error.message}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </main>
    );
  }
}

SignUp.propTypes = {
  history: PropTypes.object
};

const mapStateToProps = state => {
  const { email, password, history, auth, intl, dialogs } = state;

  return {
    intl,
    auth,
    dialogs,
    email,
    password,
    history
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ setDialogIsOpen }, dispatch),
    SignUp: (name, email, pw, cpw, history) =>
      dispatch(AuthActions.SignUp(name, email, pw, cpw, history))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(withAppConfigs(withRouter(withStyles(styles)(SignUp)))));
