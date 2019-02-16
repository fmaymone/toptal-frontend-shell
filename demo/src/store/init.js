import config from '../config'

export const initState = {
  auth: { isAuthorised: true },
  ...config.initial_state
}

export default initState
