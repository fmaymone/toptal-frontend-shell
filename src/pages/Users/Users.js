/* eslint-disable linebreak-style */
import Activity from "../../containers/Activity";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl, intlShape } from "react-intl";
import { withFirebase } from "firekit-provider";
import { withRouter } from "react-router-dom";
import { withTheme } from "@material-ui/core/styles";
import * as UserActions from "../../store/actions/userActions";
import { bindActionCreators } from "redux";
import UsersList from '../../containers/Users/UsersList'
import ErrorBoundary from '../../containers/ErrorBoundary/ErrorBoundary'
const path = "users";

export class Users extends Component {
  state = {
    users: null
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    this.props.actions.GetUsers();
  };

  handleRowClick = user => {
    const { history, isSelecting } = this.props;
    this.props.actions.GetUser(user, history);
  };

  render() {
    const { users, history, intl } = this.props;

    const loadingUsers = users.loadingUsers;

    return (
      <Activity
        title={intl.formatMessage({ id: "users" })}
        isLoading={loadingUsers}
      >
      <ErrorBoundary>
       <UsersList users={users.users} history={history} handleRowClick={this.handleRowClick}/>
      </ErrorBoundary>
      </Activity>
    );
  }
}

Users.propTypes = {
  // users: PropTypes.array,
  // intl: intlShape.isRequired,
  // theme: PropTypes.object.isRequired,
  // auth: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const { auth, users, loadingUsers } = state;
  const { match } = ownProps;

  const isSelecting = match.params.select ? match.params.select : false;

  return {
    isSelecting,
    loadingUsers,
    users,
    auth
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
  //  { ...filterActions }
)(injectIntl(withTheme()(withFirebase(withRouter(Users)))));
