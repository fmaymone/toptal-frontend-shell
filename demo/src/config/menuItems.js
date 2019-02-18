import React from 'react'
import Icon from '@material-ui/core/Icon'
import allLocales from './locales'
import allThemes from './themes'
import LanguageIcon from '@material-ui/icons/Language'
import StyleIcon from '@material-ui/icons/Style'
import Brightness2 from '@material-ui/icons/Brightness2'
import Brightness7 from '@material-ui/icons/Brightness7'
import SettingsIcon from '@material-ui/icons/SettingsApplications'
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import LockIcon from '@material-ui/icons/Lock'

const getMenuItems = (props) => {
  const {
    locale,
    updateTheme,
    switchNightMode,
    updateLocale,
    intl,
    themeSource,
    auth,
    isGranted,
    deferredPrompt,
    isAppInstallable,
    isAppInstalled,
    //isAuthMenu,
    handleSignOut
  } = props


  const isAuthorised = auth.isAuthorised
  let isManager = false
  let isAdmin = false

   if(auth.loginResponse !== undefined){
     const role = auth.loginResponse.role
     isAdmin = (role === 'admin')
     isManager = (role === 'manager')
   }
  

  const themeItems = allThemes.map((t) => {
    return {
      value: undefined,
      visible: true,
      primaryText: intl.formatMessage({ id: t.id }),
      onClick: () => { updateTheme(t.id) },
      leftIcon: <StyleIcon style={{ color: t.color }} />
    }
  })

  const localeItems = allLocales.map((l) => {
    return {
      value: undefined,
      visible: true,
      primaryText: intl.formatMessage({ id: l.locale }),
      onClick: () => { updateLocale(l.locale) },
      leftIcon: <LanguageIcon />
    }
  })

  //TODO Needs to come from our API
  const isAuthMenu = false;
  if (isAuthMenu) {
    return [
      {
        value: '/my_account',
        primaryText: intl.formatMessage({ id: 'my_account' }),
        leftIcon: <AccountBoxIcon />
      },
      {
        value: '/signin',
        onClick: handleSignOut,
        primaryText: intl.formatMessage({ id: 'sign_out' }),
        leftIcon: <LockIcon />
      }
    ]
  }

  return [
    {
      value: '/trips',
      visible: isAuthorised,
      primaryText: intl.formatMessage({ id: 'trips' }),
      leftIcon: <Icon className='material-icons' >Trips</Icon>
    },
    {
      value: '/trips/all_trips',
      visible: isAdmin,
      primaryText: intl.formatMessage({ id: 'all_trips' }),
      leftIcon: <Icon className='material-icons' >All Trips</Icon>
    },
      {
      visible: isAdmin, // In prod: isGranted('administration'),
      primaryTogglesNestedList: true,
      primaryText: intl.formatMessage({ id: 'administration' }),
      leftIcon: <Icon className='material-icons' >security</Icon>,
      nestedItems: [
        {
          value: '/users',
          visible: (isAdmin || isManager) , // In prod: isGranted('read_users'),
          primaryText: intl.formatMessage({ id: 'users' }),
          leftIcon: <Icon className='material-icons' >group</Icon>
        }
      ]
    },
    {
      divider: true,
      visible: isAuthorised
    },
    {
      primaryText: intl.formatMessage({ id: 'settings' }),
      primaryTogglesNestedList: true,
      leftIcon: <SettingsIcon />,
      nestedItems: [
        {
          primaryText: intl.formatMessage({ id: 'theme' }),
          secondaryText: intl.formatMessage({ id: themeSource.source }),
          primaryTogglesNestedList: true,
          leftIcon: <StyleIcon />,
          nestedItems: themeItems
        },
        {
          primaryText: intl.formatMessage({ id: 'language' }),
          secondaryText: intl.formatMessage({ id: locale }),
          primaryTogglesNestedList: true,
          leftIcon: <LanguageIcon />,
          nestedItems: localeItems
        }
      ]
    },
    {
      onClick: () => { switchNightMode(!themeSource.isNightModeOn) },
      primaryText: intl.formatMessage({ id: themeSource.isNightModeOn ? 'day_mode' : 'night_mode' }),
      leftIcon: themeSource.isNightModeOn ? <Brightness7 /> : <Brightness2 />
    },
    {
      visible: isAppInstallable && !isAppInstalled,
      onClick: () => { deferredPrompt.prompt() },
      primaryText: intl.formatMessage({ id: 'install' }),
      leftIcon: <VerticalAlignBottomIcon />
    }
  ]
}

export default getMenuItems
