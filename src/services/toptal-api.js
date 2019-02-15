import TripService from './trip'
import UserService from './user'
import AuthService from './auth';
import config from '../config';
import axios from "axios";

export class ToptalTripsApi {
  static _instance = null;
  static create() {
    if (ToptalTripsApi._instance == null) {
      const axiosClient = axios.create({ baseURL: config.baseURL });
      ToptalTripsApi._instance = new ToptalTripsApi(axiosClient);
    }
    return ToptalTripsApi._instance;
  }

  constructor(axiosClient) {
    this._client = axiosClient;
    this._auth = new AuthService(this._client);
    this._trips = new TripService(this._auth, this._client);
    this._users = new UserService(this._auth, this._client);
  }

  get tripService () {
    return this._trips;
  }

  get userService () {
    return this._users;
  }

  get authService () {
    return this._auth;
  }
}

export const toptalTripsApi = ToptalTripsApi.create();
export const tripService = toptalTripsApi.tripService;
export const userService = toptalTripsApi.userService;
export const authService = toptalTripsApi.authService;