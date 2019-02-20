import Activity from '../../containers/Activity'
import AuthUI from '../../containers/AuthUI/AuthUI'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import firebaseui from 'firebaseui'
import withAppConfigs from '../../utils/withAppConfigs'
import { injectIntl } from 'react-intl'
import { withFirebase } from 'firekit-provider'
import SignInScreen from './SigninScreen';

export class SignIn extends Component {
  render() {
    const { intl } = this.props

    return (
      <Activity title={intl.formatMessage({ id: 'sign_in' })}>
        <SignInScreen />
      </Activity>
    )
  }
}

export default injectIntl(withAppConfigs(SignIn))
