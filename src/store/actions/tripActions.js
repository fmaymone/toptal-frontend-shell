//Import the Trip API 

import {tripService} from "../../services/toptal-api"
import { setDialogIsOpen } from 'rmw-shell/lib/store/dialogs/actions'

//SignUp
export const SIGNUP_SUCCESS = '[Trip] SIGNUP_SUCCESS' 
export const SIGNUP_ERROR = '[Trip] SIGNUP_ERROR'

//Login
export const LOGIN_SUCCESS = '[Trip] LOGIN_SUCCESS' 
export const LOGIN_ERROR = '[Trip] LOGIN_ERROR'

//Create
export const CREATE_TRIP = '[Trip] CREATE_TRIP' 
export const CREATE_TRIP_SUCCESS = '[Trip] CREATE_TRIP_SUCCESS' 
export const CREATE_TRIP_ERROR = '[Trip] CREATE_TRIP_ERROR' 


//Read
export const GET_TRIPS = '[Trip] GET_TRIPS' 
export const GET_TRIPS_SUCCESS = '[Trip] GET_TRIPS_SUCCESS' 
export const GET_TRIPS_ERROR = '[Trip] GET_TRIPS_ERROR' 

export const GET_TRIP = '[Trip] GET_TRIP' 
export const GET_TRIP_SUCCESS = '[Trip] GET_TRIP_SUCCESS' 
export const GET_TRIP_ERROR = '[Trip] GET_TRIP_ERROR' 


//Update
export const START_EDITING ='[Trip] START_EDITING'
export const CANCEL_EDITING = '[Trip] CANCEL_EDITING'

export const UPDATE_TRIP = '[Trip] UPDATE_TRIP' 
export const UPDATE_TRIP_SUCCESS = '[Trip] UPDATE_TRIP_SUCCESS' 
export const UPDATE_TRIP_ERROR = '[Trip] UPDATE_TRIP_ERROR' 

export const COMPLETE_TRIP = 'COMPLETE_TRIP'


//Delete
export const DELETE_TRIP = '[Trip] DELETE_TRIP' 
export const DELETE_TRIP_SUCCESS = '[Trip] DELETE_TRIP_SUCCESS' 
export const DELETE_TRIP_ERROR = '[Trip] DELETE_TRIP_ERROR' 


export function SignUpSuccess(user) {
    return {
        type: SIGNUP_SUCCESS,
        user: user
    }
}

export function SignUpError() {
    return {
        type: SIGNUP_ERROR
    }
}
 
export function SignUp(name, email, password, password_confirmation) {
    return (dispatch, getState) => {
        return tripService.signUp(name, email, password, password_confirmation).then(res => {
            if (res) {
                dispatch(SignUpSuccess({name: name, email: email, password: password}))
            } else {
                dispatch(SignUpError())
            }
        })
    }
}

export function LoginSuccess(token) {
    return {
        type: LOGIN_SUCCESS,
        token: token
    }
}

export function Login(email, password) {
    return (dispatch, getState) => {
        return tripService.login(email, password).then( token => {
            dispatch(LoginSuccess(token))
        })
    }
}

export function CreateTrip(trip){
    return (dispatch, getState) => {
        return tripService.create(trip).then(res => {
            dispatch(CreateTripSuccess(res))
        })
    }
}

export function CreateTripSuccess(trip){
    return {
        type:CREATE_TRIP_SUCCESS,
        trip
    }
}

export function GetTrip(id){
    return (dispatch, getState) => {
        return tripService.get(id).then(res => {
            dispatch(GetTripSuccess(res))
        })
    }
}

export function GetTripSuccess(trip){
    return {
        type:GET_TRIP_SUCCESS,
        trip
    }
}

export function GetTrips(){
    return (dispatch, getState) => {
        tripService.list().then(res => {
          dispatch(GetTripsSuccess(res))
        })
        dispatch({
          type: GET_TRIPS,
          loadingTrips: true
        });
    }
}

export function GetTripsSuccess(trips){
    return {
        type:GET_TRIPS_SUCCESS,
        trips: trips,
        loadingTrips: false
    }
}

export function StartEditing(_id) {
    return {
        type: START_EDITING,
        _id
    }
}
export function CancelEditing(_id) {
    return {
        type: CANCEL_EDITING,
        _id
    }
}

export function UpdateTrip(trip) {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_TRIP,
            trip: trip
        })
        tripService.update(trip).then(() => {
            dispatch(UpdateTripSuccess(trip))
        })
    }
}
export function UpdateTripSuccess(trip) {
    return {
        type: UPDATE_TRIP_SUCCESS,
        trip,
        _id: trip._id
    }
}

export function DeleteTrip(trip, history) {
    return (dispatch, getState) => {
        dispatch({
            type: DELETE_TRIP,
            trip: trip
        })
        tripService.delete(trip).then(() => {
            dispatch(DeleteTripSuccess(trip))
            dispatch(setDialogIsOpen('delete_trip', false))
            history.push("/trips")
        }).catch(error => {
            dispatch(DeleteTripError(error))
        })
    }
}
export function DeleteTripSuccess(trip) {
    return {
        type: DELETE_TRIP_SUCCESS,
        _id: trip
    }
}

export function DeleteTripError(error) {
    return {
        type: DELETE_TRIP_ERROR,
        error: error
    }
}