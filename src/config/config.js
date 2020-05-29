import configureStore from "../store";
import getMenuItems from "./menuItems";
import grants from "./grants";
import locales from "./locales";
import { RMWIcon } from "../components/Icons";
import { themes } from "./themes";

const config = {
  drawer_width: 240,
  appIcon: RMWIcon,
  configureStore,
  getMenuItems,
  locales,
  themes,
  grants,
  routes: [],
  baseURL: "https://dry-meadow-93183.herokuapp.com",
  onAuthStateChanged: undefined,
  notificationsReengagingHours: 48,
  firebaseLoad: () => import("./firebase"),
};

export default config;
