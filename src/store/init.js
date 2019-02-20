import {authService} from '../services/toptal-api'

export const initState = {
  auth: { isAuthorised: authService.isAuthenticated() }
}

export default initState

// import { isAuthorised } from '../utils/auth'

// export const initState = {
//   //auth: { isAuthorised: isAuthorised() }
//   auth: { isAuthorised: isAuthorised() }
// }

// export default initState
