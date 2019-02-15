import TripService from './trip'
import UserService from './user'
import config from '../config'

export const tripService = TripService.create(config.baseURL);
export const userService = UserService.create(config.baseURL);