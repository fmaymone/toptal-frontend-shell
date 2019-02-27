//Import the User API 

import { userService } from "../../services/toptal-api"

//Create
export const CREATE_USER = '[User] CREATE_USER'
export const CREATE_USER_SUCCESS = '[User] CREATE_USER_SUCCESS'
export const CREATE_USER_ERROR = '[User] CREATE_USER_ERROR'


//Read
export const GET_USERS = '[User] GET_USERS'
export const GET_USERS_SUCCESS = '[User] GET_USERS_SUCCESS'
export const GET_USERS_ERROR = '[User] GET_USERS_ERROR'

export const GET_USER = '[User] GET_USER'
export const GET_USER_SUCCESS = '[User] GET_USER_SUCCESS'
export const GET_USER_ERROR = '[User] GET_USER_ERROR'

export const GET_PROFILE = '[Profile] GET_PROFILE'
export const GET_PROFILE_SUCCESS = '[Profile] GET_PROFILE_SUCCESS'


//Update
export const START_EDITING_USER = '[User] START_EDITING_USER'
export const CANCEL_EDITING_USER = '[User] CANCEL_EDITING_USER'

export const UPDATE_USER = '[User] UPDATE_USER'
export const UPDATE_USER_SUCCESS = '[User] UPDATE_USER_SUCCESS'
export const UPDATE_USER_ERROR = '[User] UPDATE_USER_ERROR'

export const UPDATE_PROFILE = '[Profile] UPDATE_PROFILE'
export const UPDATE_PROFILE_SUCCESS = '[Profile] UPDATE_PROFILE_SUCESS'
export const UPDATE_PROFILE_ERROR = '[Profile] UPDATE_PROFILE_ERROR'

export const UPDATE_ROLE = '[User] UPDATE_ROLE'
export const UPDATE_ROLE_SUCCESS = '[User] UPDATE_ROLE_SUCCESS'

export const COMPLETE_USER = 'COMPLETE_USER'


//Delete
export const DELETE_USER = '[User] DELETE_USER'
export const DELETE_USER_SUCCESS = '[User] DELETE_USER_SUCCESS'
export const DELETE_USER_ERROR = '[User] DELETE_USER_ERROR'

export function CreateUser(user) {
	return (dispatch, getState) => {
		return userService.create(user).then(res => {
			dispatch(CreateUserSuccess(res))
		})
	}
}

export function CreateUserSuccess(user) {
	return {
		type: CREATE_USER_SUCCESS,
		user
	}
}

export function GetUser(id, history) {
	return (dispatch, getState) => {
		userService.get(id).then(res => {
			dispatch(GetUserSuccess(res, history))
			history.push(`/users/edit/${id}/profile`);
		})
		dispatch({
			type: GET_USERS
		})
	}
}

export function GetProfile(id) {
	return (dispatch, getState) => {
		userService.get(id).then(res => {
			dispatch(GetProfileSuccess(res))
		})
		dispatch({
			type: GET_PROFILE
		})
	}
}

export function GetUserSuccess(user, history) {
	
	return {
		type: GET_USER_SUCCESS,
		user,
		history
	}
}

export function GetProfileSuccess(user) {
	
	return {
		type: GET_PROFILE_SUCCESS,
		user
	}
}

export function GetUsers() {
	return (dispatch, getState) => {
		userService.list().then(res => {
			dispatch(GetUsersSuccess(res))
		})
		dispatch({
			type: GET_USERS,
			loadingUsers: true
		});
	}
}

export function GetUsersSuccess(users) {
	return {
		type: GET_USERS_SUCCESS,
		users: users,
		loadingUsers: false
	}
}

export function StartEditingUser(_id) {
	return {
		type: START_EDITING_USER,
		_id
	}
}
export function CancelEditingUser(_id) {
	return {
		type: CANCEL_EDITING_USER,
		_id
	}
}

export function UpdateUser(user, history ) {
	return (dispatch, getState) => {
		dispatch({
			type: UPDATE_USER,
			user: user
		})
		userService.update(user).then(() => {
			dispatch(UpdateUserSuccess(user, history))
		})
	}
}

export function UpdateRole(userId, newRole) {
	return (dispatch, getState) => {
		dispatch({
			type: UPDATE_ROLE,
			userId: userId
		})
		userService.updateRole(userId, newRole).then(() => {
			dispatch(UpdateRoleSuccess(userId, newRole))
		})
	}
}

export function UpdateRoleSuccess(userId, newRole) {
	return {
		type: UPDATE_ROLE_SUCCESS,
		userId,
		newRole
	}
}

export function UpdateUserSuccess(user, history) {
	history.push('/users')
	return {
		type: UPDATE_USER_SUCCESS,
		user,
		_id: user._id,
		history,
	}
}

export function DeleteUser(userId, history) {
	return (dispatch, getState) => {
		dispatch({
			type: DELETE_USER,
			user: userId
		})
		userService.delete(userId).then(() => {
			dispatch(DeleteUserSuccess(userId))
			history.push("/users")
		}).catch(error => {
			dispatch(DeleteUserError(error))
		})
	}
}
export function DeleteUserSuccess(userId) {
	return {
		type: DELETE_USER_SUCCESS,
		_id: userId
	}
}

export function DeleteUserError(error) {
	return {
		type: DELETE_USER_ERROR,
		error: error
	}
}

export function UpdateProfile(user, history) {
	return (dispatch, getState) => {
		dispatch({
			type: UPDATE_PROFILE,
			user: user
		})
		userService.update(user).then(() => {
			dispatch(UpdateProfileSuccess(user, history))
		})
	}
}

export function UpdateProfileSuccess(user, history) {
	//history.push('/sign_in')
	return {
		type: UPDATE_PROFILE_SUCCESS,
		user,
		_id: user._id,
		history,
	}
}

