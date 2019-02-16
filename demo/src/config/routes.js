import React from 'react'
import makeLoadable from 'rmw-shell/lib/containers/MyLoadable'
import RestrictedRoute from 'rmw-shell/lib/containers/RestrictedRoute'

const MyLoadable = (opts, preloadComponents) =>
  makeLoadable({ ...opts, firebase: () => import('./firebase') }, preloadComponents)

const AsyncDashboard = MyLoadable({ loader: () => import('../pages/Dashboard') })
const AsyncTrip = MyLoadable({ loader: () => import('../pages/Trips/Trip') })
const AsyncTrips = MyLoadable({ loader: () => import('../pages/Trips/Trips') }, [AsyncTrip])
//const AsyncLoginHome = MyLoadable({ loader: () => import('../pages/Login/Home') })

const routes = [
  <RestrictedRoute type="private" path="/" exact component={AsyncDashboard} />,
  //<RestrictedRoute type="private" path="/dashboard" exact component={AsyncLoginHome} />,
  <RestrictedRoute type="private" path="/trips" exact component={AsyncTrips} />,
  <RestrictedRoute type="private" path="/trips/edit/:uid" exact component={AsyncTrip} />,
  <RestrictedRoute type="private" path="/trips/create" exact component={AsyncTrip} />
]

export default routes