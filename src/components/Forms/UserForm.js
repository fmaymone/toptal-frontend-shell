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
  isLinkedWithProvider = provider => {
    const { auth } = this.props

    try {
      return (
        auth &&
        auth.providerData &&
        auth.providerData.find(p => {
          return p.providerId === provider
        }) !== undefined
      )
    } catch (e) {
      return false
    }
  }

  getProviderIcon = p => {
    switch (p) {
    case 'google.com':
      return <GoogleIcon />

    case 'facebook.com':
      return <FacebookIcon />

    case 'twitter.com':
      return <TwitterIcon />

    case 'github.com':
      return <GitHubIcon />

    default:
      return undefined
    }
  }

  handleSubmit() {

  }

  render() {
    const { intl, handleRuleChange, isAdmin, classes, appConfig, values } = this.props

    const role = values.role == null ? "regular" : values.role; 

    return (
      <form onSubmit={this.handleSubmit} style={{
        height: '100%',
        alignItems: 'strech',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
      <div className={classes.root}>
        {values.photoURL && (
          <Avatar alt={''} src={values.photoURL} className={classNames(classes.avatar, classes.bigAvatar)} />
        )}
        {!values.photoURL && (
          <Avatar className={classNames(classes.avatar, classes.bigAvatar)}>
            {' '}
            <Person style={{ fontSize: 60 }} />{' '}
          </Avatar>
        )}
        
        <br />

        <Typography variant="h4" gutterBottom>
          {values.name}
        </Typography>
        <Typography variant="h5" gutterBottom>
          {values.email}
        </Typography>

        <div>
        <FormControl component="fieldset" className={classNames.formControl}>
          <RadioGroup
            aria-label="Role"
            name="role1"
            className={classNames.group}
            value={role}
            onChange={this.props.handleRoleChange}
            row
          >
            <FormControlLabel value="admin" control={<Radio />} label="Administrator" labelPlacement="bottom"/>
            <FormControlLabel value="manager" control={<Radio />} label="User Manager" labelPlacement="bottom"/>
            <FormControlLabel value="regular" control={<Radio />} label="Regular" labelPlacement="bottom"/>
          </RadioGroup>
        </FormControl>
        </div>
      </div>
      </form>
    )
  }
}

UserForm.propTypes = {
  // handleSubmit: PropTypes.func.isRequired,
  // handleAdminChange: PropTypes.func.isRequired,
  // isAdmin: PropTypes.bool.isRequired,
  // intl: intlShape.isRequired,
  // initialized: PropTypes.bool.isRequired,
  // uid: PropTypes.string.isRequired
}

export default withAppConfigs(withStyles(styles, { withTheme: true })(UserForm))
