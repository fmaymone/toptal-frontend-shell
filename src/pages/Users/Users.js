import Activity from '../../containers/Activity'
import AltIconAvatar from '../../components/AltIconAvatar'
import Divider from '@material-ui/core/Divider'
import Email from '@material-ui/icons/Email'
import FilterList from '@material-ui/icons/FilterList'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import OfflinePin from '@material-ui/icons/OfflinePin'
import Phone from '@material-ui/icons/Phone'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ReactList from 'react-list'
import Scrollbar from '../../components/Scrollbar'
import SearchField from '../../components/SearchField'
import Toolbar from '@material-ui/core/Toolbar'
import { FilterDrawer, filterSelectors, filterActions } from 'material-ui-filter'
import { GoogleIcon, FacebookIcon, GitHubIcon, TwitterIcon } from '../../components/Icons'
import { connect } from 'react-redux'
import { getList, isLoading } from 'firekit'
import { injectIntl, intlShape } from 'react-intl'
import { withFirebase } from 'firekit-provider'
import { withRouter } from 'react-router-dom'
import { withTheme } from '@material-ui/core/styles'
import * as UserActions from '../../store/actions/userActions'
import { bindActionCreators } from 'redux';

const path = 'users'

export class Users extends Component {

  state = {
    loadingUsers: true,
    users: []
  }

  componentDidMount() {
    // const { watchList } = this.props
    // watchList(path)
    this.fetchData();

  }
 
  fetchData = async () => {
    this.props.actions.GetUsers();
  }

  getProviderIcon = provider => {
    const color = 'primary'

    switch (provider.providerId) {
    case 'google.com':
      return <GoogleIcon color={color} />
    case 'facebook.com':
      return <FacebookIcon color={color} />
    case 'twitter.com':
      return <TwitterIcon color={color} />
    case 'github.com':
      return <GitHubIcon color={color} />
    case 'phone':
      return <Phone color={color} />
    case 'password':
      return <Email color={color} />
    default:
      return undefined
    }
  }

  handleRowClick = user => {
    const { history, isSelecting } = this.props
    this.props.actions.GetUser(user, history);
  }

  renderList(users) {
    if (users === undefined) {
      return <div />
    }

    return users.map((user, index) => {
      return <div key={index}>
        <ListItem
          key={index}
          onClick={() => {
            this.handleRowClick(user.id)
          }}
          id={index}
        >
          <AltIconAvatar src={null} iconName={'person'} />

          <ListItemText
            primary={user.name}
            secondary={user.email}
          />

          <Toolbar>
            <div key={index}><Email color='primary' /></div>
          </Toolbar>
          <OfflinePin color={user.connections ? 'primary' : 'disabled'} />
        </ListItem>
        <Divider inset={true} />
      </div>
    })
  }

  render() {
    const { users, theme, intl, setFilterIsOpen, loadingUsers } = this.props

    const filterFields = [
      {
        name: 'displayName',
        label: intl.formatMessage({ id: 'name' })
      },
      {
        name: 'creationTime',
        type: 'date',
        label: intl.formatMessage({ id: 'creation_time' })
      }
    ]

    return (
      <Activity
        title={intl.formatMessage({ id: 'users' })}
        appBarContent={
          <div style={{ display: 'flex' }}>
            <SearchField filterName={'users'} />

            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => {
                setFilterIsOpen('users', true)
              }}
            >
              <FilterList
                className="material-icons"
                color={theme.palette.canvasColor}
              />
            </IconButton>
          </div>
        }
        isLoading={loadingUsers}
      >
        <div style={{ height: '100%', overflow: 'none' }}>
          <Scrollbar>
            <List id="test" ref={field => (this.list = field)}>
              {this.renderList(users)}
            </List>
          </Scrollbar>
        </div>
        <FilterDrawer name={'users'} fields={filterFields} />
      </Activity>
    )
  }
}

Users.propTypes = {
  users: PropTypes.array,
  intl: intlShape.isRequired,
  theme: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const { auth, users, loadingUsers } = state
  const { match } = ownProps

  const isSelecting = match.params.select ? match.params.select : false

  return {
    isSelecting,
    loadingUsers,
    users,
    auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      actions: bindActionCreators(UserActions, dispatch),
  }
}

export default connect(
  mapStateToProps,mapDispatchToProps
//  { ...filterActions }
)(injectIntl(withTheme()(withFirebase(withRouter(Users)))))
