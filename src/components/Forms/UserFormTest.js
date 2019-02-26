import Avatar from '@material-ui/core/Avatar'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Person from '@material-ui/icons/Person'
import IconButton from '@material-ui/core/IconButton'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Switch from '@material-ui/core/Switch'
import Typography from '@material-ui/core/Typography'
import classNames from 'classnames'
import withAppConfigs from '../../utils/withAppConfigs'
import { withStyles } from '@material-ui/core/styles'
import { GoogleIcon, FacebookIcon, GitHubIcon, TwitterIcon } from '../../components/Icons'
import { intlShape } from 'react-intl'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Button } from '@material-ui/core';

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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
})

class UserForm extends Component {

  render() {
    const { classes, values } = this.props

    const role = (values.role == null) ? "regular" : values.role

    return (
      <Activity
        isLoading={isLoading}
        onBackClick={() => history.push("/users")}
        title={intl.formatMessage({ id: "edit_user" })}
      >
      </Activity>


    )
  }
}

export default connect(
  mapStateToProps, { setDialogIsOpen }
)(injectIntl(withRouter(withTheme()(UserForm))))
