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
  
  firebase_config: {
    apiKey: "AIzaSyClErg5_br0n6rh863romTewtDXUwczYqQ",
    authDomain: "toptal-trips.firebaseapp.com",
    databaseURL: "https://toptal-trips.firebaseio.com",
    projectId: "toptal-trips",
    storageBucket: "toptal-trips.appspot.com",
    messagingSenderId: "851204810915"
  },
  firebase_config_dev: {
    apiKey: "AIzaSyClErg5_br0n6rh863romTewtDXUwczYqQ",
    authDomain: "toptal-trips.firebaseapp.com",
    databaseURL: "https://toptal-trips.firebaseio.com",
    projectId: "toptal-trips",
    storageBucket: "toptal-trips.appspot.com",
    messagingSenderId: "851204810915"
  },
  firebase_providers: ['google.com', 'facebook.com', 'twitter.com', 'github.com', 'password', 'phone'],
  initial_state: {
    theme: 'dark',
    locale: 'en'
  },
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
