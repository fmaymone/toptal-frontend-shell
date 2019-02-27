/* eslint-disable react/jsx-key */
import React from 'react'
import RestrictedRoute from 'rmw-shell/lib/containers/RestrictedRoute'
import makeLoadable from 'rmw-shell/lib/containers/MyLoadable'


const MyLoadable = (opts, preloadComponents) =>
  makeLoadable({ ...opts, firebase: () => import('./firebase') }, preloadComponents)

const AsyncTrip = MyLoadable({ loader: () => import('../../../src/pages/Trips/Trip') })
const AsyncTrips = MyLoadable({ loader: () => import('../../../src/pages/Trips/UserTrips') }, [AsyncTrip])
const AsyncAllTrips = MyLoadable({ loader: () => import('../../../src/pages/Trips/AllTrips') }, [AsyncTrip])
const AsyncSignOut = MyLoadable({ loader: () => import('../../../../toptal-frontend-shell/src/pages/Auth/SignOut') })
const AsyncMyAccount = MyLoadable({ loader: () => import('../../../../toptal-frontend-shell/src/pages/MyAccount/MyAccount') })


const routes = [
  <RestrictedRoute type="private" path="/trips" exact component={AsyncTrips} />,
  <RestrictedRoute type="private" path="/trips/edit/:uid" exact component={AsyncTrip} />,
  <RestrictedRoute type="private" path="/trips/create" exact component={AsyncTrip} />,
  <RestrictedRoute type="private" path="/trips/all_trips" exact component={AsyncAllTrips} />,
  <RestrictedRoute type="private" path="/signout" component={AsyncSignOut} />,
  <RestrictedRoute type="private" path="/my_account" exact component={AsyncMyAccount} />,


]

export default routes
