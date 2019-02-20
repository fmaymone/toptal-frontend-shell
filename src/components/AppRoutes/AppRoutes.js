/* eslint-disable react/jsx-key */
import React from 'react'
import RestrictedRoute from '../../containers/RestrictedRoute'
import makeLoadable from '../../containers/MyLoadable'
import { Route } from 'react-router-dom'

const getAppRoutes = firebaseLoader => {
  const MyLoadable = (opts, preloadComponents) => makeLoadable({ ...opts, firebase: firebaseLoader }, preloadComponents)

  const AsyncSignIn = MyLoadable({ loader: () => import('../../pages/Auth/SignIn') })
  const AsyncSignUp = MyLoadable({ loader: () => import('../../pages/Auth/SignUp') })
  const AsyncSignOut = MyLoadable({ loader: () => import('../../pages/Auth/SignOut') })
  const AsyncUser = MyLoadable({ loader: () => import('../../pages/Users/User') })
  const AsyncUsers = MyLoadable({ loader: () => import('../../pages/Users/Users') }, [AsyncUser])
  const AsyncMyAccount = MyLoadable({ loader: () => import('../../pages/MyAccount') })
  const AsyncPageNotFound = MyLoadable({ loader: () => import('../../pages/PageNotFound') })

  return [
    <RestrictedRoute type="public" path="/signin" component={AsyncSignIn} />,
    <RestrictedRoute type="public" path="/signup" component={AsyncSignUp} />,
    <RestrictedRoute type="private" path="/signout" component={AsyncSignOut} />,
    <RestrictedRoute type="private" path="/users" exact component={AsyncUsers} />,
    <RestrictedRoute type="private" path="/users/:select" exact component={AsyncUsers} />,
    <RestrictedRoute type="private" path="/users/edit/:uid/:editType" exact component={AsyncUser} />,
    <RestrictedRoute type="private" path="/users/edit/:uid/:editType/:rootPath/:rootUid" exact component={AsyncUser} />,
    <RestrictedRoute type="private" path="/my_account" exact component={AsyncMyAccount} />,
    <Route component={AsyncPageNotFound} />
  ]
}

export default getAppRoutes
