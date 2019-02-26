import React, { Component } from "react";
import Activity from "../../containers/Activity";
import { injectIntl } from "react-intl";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import * as UserActions from "../../store/actions/userActions";
import { bindActionCreators } from "redux";
import LoadingComponent from '../../components/LoadingComponent'


class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const { history, auth } = this.props;
    this.props.actions.GetUser(auth.loginResponse.id, history);
  }
  
  render() {
    const { intl, auth, users } = this.props;
    return (
      <div>Loading</div>
    )
  }
}

const mapStateToProps = state => {
  const { intl, simpleValues, auth, messaging, users } = state;
  return {
    auth,
    intl,
    users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(UserActions, dispatch)
  };
};

export default connect(
  mapStateToProps, mapDispatchToProps)(injectIntl(withRouter(MyAccount)))