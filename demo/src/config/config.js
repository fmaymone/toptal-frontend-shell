import React from 'react'
import Loadable from 'react-loadable'
import getMenuItems from './menuItems'
import LoadingComponent from 'rmw-shell/lib/components/LoadingComponent'
import grants from './grants'
import locales from './locales'
import routes from './routes'
import themes from './themes'

const Loading = () => <LoadingComponent />

const LPAsync = Loadable({
  loader: () => import('../../src/pages/LandingPage'),
  loading: Loading
})

const config = {
  
  drawer_width: 256,
  routes,
  getMenuItems,
  locales,
  themes,
  grants,
  firebaseLoad: () => import('./firebase'),
  landingPage: LPAsync
}

export default config
