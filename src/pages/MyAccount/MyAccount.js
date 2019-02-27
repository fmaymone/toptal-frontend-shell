import AccountBox from "@material-ui/icons/AccountBox";
import Activity from "../../containers/Activity";
import AppBar from "@material-ui/core/AppBar";
import FilterList from "@material-ui/icons/FilterList";
import IconButton from "@material-ui/core/IconButton";
import Lock from "@material-ui/icons/Lock";
import Person from "@material-ui/icons/Person";
import PropTypes from "prop-types";
import React, { Component } from "react";
import Scrollbar from "../../components/Scrollbar";
import SearchField from "../../components/SearchField";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import UserForm from "../../components/Forms/UserForm";
import UserGrants from "../../containers/Users/UserGrants";
import UserRoles from "../../containers/Users/UserRoles";
import { change, submit } from "redux-form";
import { connect } from "react-redux";
import { filterSelectors, filterActions } from "material-ui-filter";
import { formValueSelector } from "redux-form";
import { getList, isLoading, getPath } from "firekit";
import { injectIntl, intlShape } from "react-intl";
import { setSimpleValue } from "../../store/simpleValues/actions";
import { withFirebase } from "firekit-provider";
import { withRouter } from "react-router-dom";
import { withTheme, withStyles } from "@material-ui/core/styles";
import * as UserActions from "../../store/actions/userActions";
import { bindActionCreators } from "redux";
import UserModel from "../../model/user";

const path = "/users";

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default
  },
  tabs: {
    flex: 1,
    width: "100%"
  },
  form: {
    backgroundColor: theme.palette.background.default,
    margin: 15,
    display: "flex",
    justifyContent: "center"
  }
});

export class MyAccount extends Component {
  state = {
    values: {},
    users: null,
    role: "regular"
  };

  componentDidMount() {
    let user = this.props.auth.loginResponse.id;
    this.props.GetProfile(user);
  }
  
  handleDelete = () => {
    let user = this.props.users.user;
    let history = this.props.history;
    this.props.DeleteUser(user.id, history);
  };

  handleRoleChange = event => {
    let user = this.props.users.user;
    user.role = event.target.value;
    this.props.UpdateRole(user.id, user.role);
  };

  handleUpdate = (id,name,email) => {
    const user = new UserModel(id, name, email);
    this.props.UpdateProfile(user, this.props.history);
  }

  render() {
    const {
      history,
      intl,
      theme,
      match,
      editType,
      setFilterIsOpen,
      hasFilters,
      isLoading,
      classes,
      users
    } = this.props;

    const uid = match.params.uid;
    let isAdmin = false;

    return (
      <Activity
        isLoading={isLoading}
        onBackClick={() => history.goBack()}
        title={intl.formatMessage({ id: "my_account" })}
        
      >
        <Scrollbar style={{ height: "100%" }}>
          <div className={classes.root}>
            <div className={classes.form}>
              <UserForm
                handleRoleChange={this.handleRoleChange}
                isAdmin={isAdmin}
                values={users.user ? users.user : {}}
                handleDelete = {this.handleDelete}
                handleUpdate = {this.handleUpdate}
                {...this.props}
              />
            </div>
          </div>
        </Scrollbar>
      </Activity>
    );
  }
}

MyAccount.propTypes = {
  // history: PropTypes.object,
  // intl: intlShape.isRequired,
  // //submit: PropTypes.func.isRequired,
  // theme: PropTypes.object.isRequired,
  // match: PropTypes.object.isRequired,
  // admins: PropTypes.array.isRequired
};

const selector = formValueSelector("user");

const mapStateToProps = (state, ownProps) => {
  const { auth, intl, filters, users } = state;
  const { match } = ownProps;

  const uid = match.params.uid;
  const editType = match.params.editType ? match.params.editType : "data";
  const { hasFilters } = filterSelectors.selectFilterProps(
    "user_grants",
    filters
  );
  const isLoadingRoles = isLoading(state, "user_roles");
  const isLoadingGrants = isLoading(state, "user_grants");
  const rootPath = match.params.rootPath;
  const rootUid = match.params.rootUid;

  let photoURL = "";
  let displayName = "";

  if (selector) {
    photoURL = selector(state, "photoURL");
    displayName = selector(state, "displayName");
  }

  return {
    rootPath,
    rootUid,
    hasFilters,
    auth,
    uid,
    editType,
    intl,
    photoURL,
    displayName,
    admins: getList(state, "admins"),
    user: getPath(state, `users/${uid}`),
    isLoading: isLoadingRoles || isLoadingGrants,
    users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      { setSimpleValue, UserActions, change, submit, ...filterActions },
      dispatch
    ),
    GetProfile: uid => dispatch(UserActions.GetProfile(uid)),
    UpdateProfile: (uid, history) => dispatch(UserActions.UpdateProfile(uid, history)),
    DeleteUser: (uid, history) => dispatch(UserActions.DeleteUser(uid, history))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  injectIntl(
    withRouter(
      withFirebase(withStyles(styles, { withTheme: true })(withTheme()(MyAccount)))
    )
  )
);
