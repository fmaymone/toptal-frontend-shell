import Avatar from "@material-ui/core/Avatar";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Person from "@material-ui/icons/Person";
import IconButton from "@material-ui/core/IconButton";
import PropTypes from "prop-types";
import React, { Component } from "react";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import withAppConfigs from "../../utils/withAppConfigs";
import { withStyles } from "@material-ui/core/styles";
import {
  GoogleIcon,
  FacebookIcon,
  GitHubIcon,
  TwitterIcon
} from "../../components/Icons";
import { intlShape } from "react-intl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { Button } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import { User } from "../../pages/Users/User";
import UserModel from "../../model/user";
import { withRouter } from "react-router-dom";
import * as UserActions from "../../store/actions/userActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Icon from "@material-ui/core/Icon";
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
  avatar: {
    margin: 10
  },
  bigAvatar: {
    width: 120,
    height: 120
  },
  margin: {
    margin: theme.spacing.unit
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3
  },
  root: {
    backgroundColor: theme.palette.background.default,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
});

class UserForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: ""
    };
  }

  componentDidMount() {
    this.setState({ name: this.props.values.name });
  }

  handleNameChange = event => {
    this.setState({ name: event.target.value });
  };

  validateForm() {
    return this.state.name !== null && this.state.name !== "";
  }

  handleSubmit = event => {
    event.preventDefault();
    const { values } = this.props;
    const user = new UserModel(values.id, this.state.name, values.email);
    this.props.actions.UpdateUser(user, this.props.history);
  };

  handleDelete = event => {
    event.preventDefault();
    const { values } = this.props;
    this.props.actions.DeleteUser(values.id, this.props.history);
  };

  render() {
    const { classes, values } = this.props;

    const role = values.role == null ? "regular" : values.role;
    const name = values.name;
    return (
      <form className={classes.form} onSubmit={this.handleSubmit}>
        <div className={classes.root}>
          {values.photoURL && (
            <Avatar
              alt={""}
              src={values.photoURL}
              className={classNames(classes.avatar, classes.bigAvatar)}
            />
          )}
          {!values.photoURL && (
            <Avatar className={classNames(classes.avatar, classes.bigAvatar)}>
              {" "}
              <Person style={{ fontSize: 60 }} />{" "}
            </Avatar>
          )}

          <br />

          {/* <Typography variant="h4" gutterBottom> 
          {values.name}
        </Typography> */}
          <Chip label={values.email}  variant="outlined" />
          <FormControl margin="normal" required>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input
              id="name"
              value={this.state.name}
              name="name"
              autoFocus
              onChange={this.handleNameChange}
            />
          </FormControl>
         
   

          <div>
            <FormControl
              component="fieldset"
              className={classNames.formControl}
            >
              <RadioGroup
                aria-label="Role"
                name="role1"
                className={classNames.group}
                value={role}
                onChange={this.props.handleRoleChange}
                row
              >
                <FormControlLabel
                  value="admin"
                  control={<Radio />}
                  label="Administrator"
                  labelPlacement="bottom"
                />
                <FormControlLabel
                  value="manager"
                  control={<Radio />}
                  label="User Manager"
                  labelPlacement="bottom"
                />
                <FormControlLabel
                  value="regular"
                  control={<Radio />}
                  label="Regular"
                  labelPlacement="bottom"
                />
              </RadioGroup>
            </FormControl>
            <br />
            <div
              style={{ position: 'fixed', top:10 , right:50, zIndex: 21474836 }}
            >
              <IconButton
                type="submit"
                variant="contained"
                color="inherit"
                className={classes.submit}
                disabled={!this.validateForm()}
              >
                <Icon className="material-icons">save</Icon>
              </IconButton>
              </div>
              <div
              style={{ position: 'fixed', top:10 , right:10, zIndex: 21474836 }}
            >
              <IconButton
                type="button"
                variant="contained"
                color="inherit"
                className={classes.submit}
                disabled={!this.validateForm()}
                onClick={this.handleDelete}
              >
                <Icon className="material-icons">delete</Icon>
              </IconButton>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

UserForm.propTypes = {
  // handleSubmit: PropTypes.func.isRequired,
  // handleAdminChange: PropTypes.func.isRequired,
  // isAdmin: PropTypes.bool.isRequired,
  // intl: intlShape.isRequired,
  // initialized: PropTypes.bool.isRequired,
  // uid: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  const { name, history } = state;

  return {
    name,
    history
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(UserActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withRouter(withAppConfigs(withStyles(styles, { withTheme: true })(UserForm)))
);
