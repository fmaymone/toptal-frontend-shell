import Activity from '../../containers/Activity'
import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import withAppConfigs from '../../utils/withAppConfigs'
import { injectIntl } from 'react-intl'
import * as AuthActions from '../../store/actions/authActions'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

export class SignOut extends Component {
  componentDidMount(){

  }

  render() {
    const { intl } = this.props

    return (
      <div></div>
    )
  }
}

const mapStateToProps = (state) => {
  const { history, intl } = state;

  return {
    intl,
    history
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ setDialogIsOpen }, dispatch),
    Logout: (history) => dispatch(AuthActions.Logout(history))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(withRouter(withStyles(styles)(SignOut))));