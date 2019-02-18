/* eslint-disable react/jsx-key */
import React from 'react'
import RestrictedRoute from 'rmw-shell/lib/containers/RestrictedRoute'
import makeLoadable from 'rmw-shell/lib/containers/MyLoadable'


const MyLoadable = (opts, preloadComponents) =>
  makeLoadable({ ...opts, firebase: () => import('./firebase') }, preloadComponents)

//const AsyncSignIn = MyLoadable({ loader: () => import('../pages/SignIn') })
const AsyncDashboard = MyLoadable({ loader: () => import('../pages/Dashboard') })
const AsyncAbout = MyLoadable({ loader: () => import('../pages/About') })
const AsyncCompany = MyLoadable({ loader: () => import('../pages/Companies/Company') })
const AsyncCompanies = MyLoadable({ loader: () => import('../pages/Companies/Companies') }, [AsyncCompany])
const AsyncTask = MyLoadable({ loader: () => import('../pages/Tasks/Task') })
const AsyncTasks = MyLoadable({ loader: () => import('../pages/Tasks/Tasks') }, [AsyncTask])
const AsyncDocument = MyLoadable({ loader: () => import('../pages/Document') })
const AsyncCollection = MyLoadable({ loader: () => import('../pages/Collection') })
const AsyncTrip = MyLoadable({ loader: () => import('../../../src/pages/Trips/Trip') })
const AsyncTrips = MyLoadable({ loader: () => import('../../../src/pages/Trips/UserTrips') }, [AsyncTrip])
const AsyncAllTrips = MyLoadable({ loader: () => import('../../../src/pages/Trips/AllTrips') }, [AsyncTrip])

const routes = [
  <RestrictedRoute type="private" path="/" exact component={AsyncDashboard} />,
  <RestrictedRoute type="private" path="/dashboard" exact component={AsyncDashboard} />,
  <RestrictedRoute type="private" path="/about" exact component={AsyncAbout} />,
  <RestrictedRoute type="private" path="/companies" exact component={AsyncCompanies} />,
  <RestrictedRoute type="private" path="/companies/edit/:uid" exact component={AsyncCompany} />,
  <RestrictedRoute type="private" path="/companies/create" exact component={AsyncCompany} />,
  <RestrictedRoute type="private" path="/tasks" exact component={AsyncTasks} />,
  <RestrictedRoute type="private" path="/tasks/edit/:uid" exact component={AsyncTask} />,
  <RestrictedRoute type="private" path="/document" exact component={AsyncDocument} />,
  <RestrictedRoute type="private" path="/collection" exact component={AsyncCollection} />,
  <RestrictedRoute type="private" path="/trips" exact component={AsyncTrips} />,
  <RestrictedRoute type="private" path="/trips/edit/:uid" exact component={AsyncTrip} />,
  <RestrictedRoute type="private" path="/trips/create" exact component={AsyncTrip} />,
  <RestrictedRoute type="private" path="/trips/all_trips" exact component={AsyncAllTrips} />,
  //<RestrictedRoute type="private" path="/signin" exact component={AsyncSignIn} />
]

export default routes
