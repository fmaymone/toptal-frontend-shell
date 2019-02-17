//Import the User API 

import {userService} from "../../services/toptal-api"

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


//Update
export const START_EDITING_USER ='[User] START_EDITING_USER'
export const CANCEL_EDITING_USER = '[User] CANCEL_EDITING_USER'

export const UPDATE_USER = '[User] UPDATE_USER' 
export const UPDATE_USER_SUCCESS = '[User] UPDATE_USER_SUCCESS' 
export const UPDATE_USER_ERROR = '[User] UPDATE_USER_ERROR' 

export const COMPLETE_USER = 'COMPLETE_USER'


//Delete
export const DELETE_USER = '[User] DELETE_USER' 
export const DELETE_USER_SUCCESS = '[User] DELETE_USER_SUCCESS' 
export const DELETE_USER_ERROR = '[User] DELETE_USER_ERROR' 

export function CreateUser(user){
    return (dispatch, getState) => {
        return userService.create(user).then(res => {
            dispatch(CreateUserSuccess(res))
        })
    }
}

export function CreateUserSuccess(user){
    return {
        type:CREATE_USER_SUCCESS,
        user
    }
}

export function GetUser(id, history){
    return (dispatch, getState) => {
        return userService.get(id).then(res => {
            dispatch(GetUserSuccess(res, history))
        })
    }
}

export function GetUserSuccess(user, history){
    return {
        type:GET_USER_SUCCESS,
        user,
        history
    }
}

export function GetUsers(){
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

export function GetUsersSuccess(users){
    return {
        type:GET_USERS_SUCCESS,
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

export function UpdateUser(user) {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_USER,
            user: user
        })
        userService.update(user).then(() => {
            dispatch(UpdateUserSuccess(user))
        })
    }
}
export function UpdateUserSuccess(user) {
    return {
        type: UPDATE_USER_SUCCESS,
        user,
        _id: user._id
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
            //dispatch(setDialogIsOpen('delete_user', false)) ???
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