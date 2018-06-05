import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withTheme, withStyles } from '@material-ui/core/styles'
import { injectIntl, intlShape } from 'react-intl'
import { setSimpleValue } from '../../store/simpleValues/actions'
import Activity from '../../components/Activity'
import { withRouter } from 'react-router-dom'
import { withFirebase } from 'firekit-provider'
import ChatMessages from '../../containers/ChatMessages/ChatMessages'

export class Chat extends Component {
  render () {
    const { theme, intl, firebaseApp } = this.props

    return (
      <Activity
        // containerStyle={{ overflow: 'hidden', backgroundColor: theme.chip.backgroundColor }}
        title={intl.formatMessage({ id: 'public_chats' })}>

        <ChatMessages
          isChatsHidden
          path={'public_chats'}
          receiverPath={'public_chats'}
          firebaseApp={firebaseApp}
        />

      </Activity>
    )
  }
}

Chat.propTypes = {
  intl: intlShape.isRequired,
  theme: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownPops) => {
  const { auth } = state
  const { match } = ownPops
  const uid = match.params.uid

  return {
    uid,
    auth
  }
}

export default connect(
  mapStateToProps, { setSimpleValue }
)(injectIntl(withTheme()(withRouter(withFirebase(Chat)))))
