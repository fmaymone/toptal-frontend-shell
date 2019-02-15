import * as TripActions from '../store/actions/tripActions'



// We are dividing the reducers using a technique called Reducer composition.
// By doing this we are seperating the reducer for the Collection and the Individual Item


//The collection Reducer, It handles only the collection

export function TripListReducer(state = [], action) {
    switch (action.type) {

        // The cases ordered in CRUD order.

        // Create
        case TripActions.CREATE_TRIP_SUCCESS: {
                return [
                    ...state,
                    action.trip
                ];
        }
            
        //Read    
        case TripActions.GET_TRIPS_SUCCESS: {
            
            return action.trips;

        }

        case TripActions.GET_TRIP: {
            return { 
                ...state, 
                loadingTrips: action.loadingTrips
            };
        }
        
        // The following Cases handle the data by mapping it. Mostly because they are related with the modification of a single Data
        
        //Update    
        case TripActions.START_EDITING: {
            
            return state.map(s => trip(s, action))

        }
        case TripActions.CANCEL_EDITING: {
            
            return state.map(s => trip(s, action))

        }
        case TripActions.UPDATE_TRIP: {

            return state.map(s => trip(s, action))
            
        }
        case TripActions.UPDATE_TRIP_SUCCESS: {

            return state.map(s => trip(s, action))

        }
        
        //Delete    
        case TripActions.DELETE_TRIP: {

            return state.map(s => trip(s, action))

        }
        case TripActions.DELETE_TRIP_SUCCESS: {

            return state.filter(s => trip(s, action))

        }
            
        default:
            return state
    }
}


//The individual Reducer. It handles only one Trip Object.


const trip = (state, action) => {

    // If the mapped trip of the previous state matches with the new ID of the action, 
    // Only then proceed to the Reducer Switch case

    if (state._id !== (action._id || action.trip._id)) {
        return state;
    }

    switch (action.type) {

        // Edit/modifies the individual Trips using ES6 spread operator. The cases are self explanatory.

        case TripActions.START_EDITING:
            {
                return {
                    ...state,
                    editing: true
                }
            }

        case TripActions.CANCEL_EDITING:
            {
                return {
                    ...state,
                    editing: false
                }
            }

        case TripActions.UPDATE_TRIP:
            {
                return {
                    ...state,
                    editing: false,
                    updating: true
                }
            }

        case TripActions.UPDATE_TRIP_SUCCESS:
            {
                return {
                    ...state,
                    trip: action.trip,
                    updating: false
                }
            }

        case TripActions.DELETE_TRIP:
            {
                return {
                    ...state,
                    deleting: true
                }
            }

        case TripActions.DELETE_TRIP_SUCCESS:
            {
                return false
            }

        default:
            {
                return state;
            }
    }
}