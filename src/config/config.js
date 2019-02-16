import configureStore from '../store'
import getMenuItems from './menuItems'
import grants from './grants'
import locales from './locales'
import { RMWIcon } from '../components/Icons'
import { themes } from './themes'

const config = {
  drawer_width: 240,
  appIcon: RMWIcon,
  configureStore,
  getMenuItems,
  locales,
  themes,
  grants,
  routes: [],
  baseURL: "https://toptal-backend-fmaymone.c9users.io",
  onAuthStateChanged: undefined,
  notificationsReengagingHours: 48,
  firebaseLoad: () => import('./firebase'),
  getNotifications: (notification, props) => {
    const { history } = props
    return {
      chat: {
        path: 'chats',
        autoClose: 5000,
        //getNotification: () => <div>YOUR CUSTOM NOTIFICATION COMPONENT</div>,
        onClick: () => {
          history.push('/chats')
        },
        ...notification
      }
    }
  }
}

export default config
