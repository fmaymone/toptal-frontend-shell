import AccountBox from '@material-ui/icons/AccountBox'
import Activity from '../../containers/Activity'
import AppBar from '@material-ui/core/AppBar'
import FilterList from '@material-ui/icons/FilterList'
import IconButton from '@material-ui/core/IconButton'
import Lock from '@material-ui/icons/Lock'
import Person from '@material-ui/icons/Person'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Scrollbar from '../../components/Scrollbar'
import SearchField from '../../components/SearchField'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import UserForm from '../../components/Forms/UserForm'
import UserGrants from '../../containers/Users/UserGrants'
import UserRoles from '../../containers/Users/UserRoles'
import { change, submit } from 'redux-form'
import { connect } from 'react-redux'
import { filterSelectors, filterActions } from 'material-ui-filter'
import { formValueSelector } from 'redux-form'
import { getList, isLoading, getPath } from 'firekit'
import { injectIntl, intlShape } from 'react-intl'
import { setSimpleValue } from '../../store/simpleValues/actions'
import { withFirebase } from 'firekit-provider'
import { withRouter } from 'react-router-dom'
import { withTheme, withStyles } from '@material-ui/core/styles'
import * as UserActions from '../../store/actions/userActions'
import { bindActionCreators } from 'redux';


const path = '/users'

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default
  },
  tabs: {
    flex: 1,
    width: '100%'
  },
  form: {
    backgroundColor: theme.palette.background.default,
    margin: 15,
    display: 'flex',
    justifyContent: 'center'
  }
})

export class User extends Component {
  state = {
    values: {},
    users: null,
    role: 'regular'
  }

  componentDidMount() {
    const { uid } = this.props
  }

  handleTabActive = (e, value) => {
    const { history, uid, rootPath, rootUid } = this.props

    if (rootPath) {
      history.push(`${path}/edit/${uid}/${value}/${rootPath}/${rootUid}`)
    } else {
      history.push(`${path}/edit/${uid}/${value}`)
    }
  }


  handleRoleChange = event => {
    let user = this.props.users.user;
    user.role = event.target.value
    this.props.UpdateUser(user);
  };

  render() {
    const {
      history,
      intl,
      theme,
      match,
      admins,
      editType,
      setFilterIsOpen,
      hasFilters,
      isLoading,
      classes,
      users
    } = this.props

    
    const uid = match.params.uid
    let isAdmin = false;
    if (!users.updating)
     isAdmin = users.user.role === 'admin';

    return (
      <Activity
        isLoading={isLoading}
        appBarContent={
          <div>
            {editType === 'grants' && (
              <div style={{ display: 'flex' }}>
                <SearchField filterName={'user_grants'} />

                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={() => setFilterIsOpen('user_grants', true)}
                >
                  <FilterList
                    className="material-icons"
                    color={hasFilters ? theme.palette.accent1Color : theme.palette.canvasColor}
                  />
                </IconButton>
              </div>
            )}
          </div>
        }
        onBackClick={() => history.push('/users')}
        title={intl.formatMessage({ id: 'edit_user' })}
      >
        <Scrollbar style={{ height: '100%' }}>
          <div className={classes.root}>
            <AppBar position="static">
              <Tabs value={editType} onChange={this.handleTabActive} fullWidth centered>
                <Tab value="profile" icon={<Person className="material-icons" />} />
                <Tab value="roles" icon={<AccountBox className="material-icons" />} />
                <Tab value="grants" icon={<Lock className="material-icons" />} />
              </Tabs>
            </AppBar>
             
            {!users.updating && editType === 'profile' && (
              <div className={classes.form}>
                <UserForm
                  handleRoleChange={this.handleRoleChange}
                  isAdmin={isAdmin}
                  values={users.user ? users.user : {}}
                  {...this.props}
                />
              </div>
            )}
            {editType === 'roles' && <UserRoles {...this.props} />}
            {editType === 'grants' && <UserGrants {...this.props} />}
          </div>
        </Scrollbar>
      </Activity>
    )
  }
}

User.propTypes = {
  history: PropTypes.object,
  intl: intlShape.isRequired,
  //submit: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  admins: PropTypes.array.isRequired
}

const selector = formValueSelector('user')

const mapStateToProps = (state, ownProps) => {
  const { auth, intl, filters, users } = state
  const { match } = ownProps

  const uid = match.params.uid
  const editType = match.params.editType ? match.params.editType : 'data'
  const { hasFilters } = filterSelectors.selectFilterProps('user_grants', filters)
  const isLoadingRoles = isLoading(state, 'user_roles')
  const isLoadingGrants = isLoading(state, 'user_grants')
  const rootPath = match.params.rootPath
  const rootUid = match.params.rootUid

  let photoURL = ''
  let displayName = ''

  if (selector) {
    photoURL = selector(state, 'photoURL')
    displayName = selector(state, 'displayName')
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
    admins: getList(state, 'admins'),
    user: getPath(state, `users/${uid}`),
    isLoading: isLoadingRoles || isLoadingGrants,
    users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      actions: bindActionCreators({ setSimpleValue, change, submit, ...filterActions }, dispatch),
      GetUser: (uid) => dispatch(UserActions.GetUser(uid)),
      UpdateUser: (user) => dispatch(UserActions.UpdateUser(user))
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(injectIntl(withRouter(withFirebase(withStyles(styles, { withTheme: true })(withTheme()(User))))))
