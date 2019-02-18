import AccountBoxIcon from '@material-ui/icons/AccountBox'
import Brightness2 from '@material-ui/icons/Brightness2'
import Brightness7 from '@material-ui/icons/Brightness7'
import Icon from '@material-ui/core/Icon'
import LanguageIcon from '@material-ui/icons/Language'
import LockIcon from '@material-ui/icons/Lock'
import React from 'react'
import SettingsIcon from '@material-ui/icons/SettingsApplications'
import StyleIcon from '@material-ui/icons/Style'
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom'
import allLocales from './locales'
import { themes as allThemes } from './themes'

const getMenuItems = props => {
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
    isAuthMenu,
    handleSignOut
  } = props

  const isAuthorised = auth.isAuthorised

  const themeItems = allThemes.map(t => {
    return {
      value: undefined,
      visible: true,
      primaryText: intl.formatMessage({ id: t.id }),
      onClick: () => {
        updateTheme(t.id)
      },
      leftIcon: <StyleIcon style={{ color: t.color }} />
    }
  })

  const localeItems = allLocales.map(l => {
    return {
      value: undefined,
      visible: true,
      primaryText: intl.formatMessage({ id: l.locale }),
      onClick: () => {
        updateLocale(l.locale)
      },
      leftIcon: <LanguageIcon />
    }
  })

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
      onClick: () => {
        switchNightMode(!themeSource.isNightModeOn)
      },
      primaryText: intl.formatMessage({ id: themeSource.isNightModeOn ? 'day_mode' : 'night_mode' }),
      leftIcon: themeSource.isNightModeOn ? <Brightness7 /> : <Brightness2 />
    },
    {
      visible: isAppInstallable && !isAppInstalled,
      onClick: () => {
        deferredPrompt.prompt()
      },
      primaryText: intl.formatMessage({ id: 'install' }),
      leftIcon: <VerticalAlignBottomIcon />
    }
  ]
}

export default getMenuItems
