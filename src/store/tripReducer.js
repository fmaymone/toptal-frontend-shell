import * as TripActions from '../store/actions/tripActions'

export function TripListReducer(state = [], action) {
	switch (action.type) {

		case TripActions.CREATE_TRIP_SUCCESS: {
			return [
				...state,
				action.trip
			];
		}

		
		case TripActions.GET_TRIPS_SUCCESS: {

			return action.trips;

		}

		case TripActions.GET_TRIP: {
			return {
				...state,
				loadingTrips: action.loadingTrips
			};
		}

		case TripActions.GET_ALL_TRIPS: {
			return {
				...state,
				loadingTrips: action.loadingTrips
			};
		}
		case TripActions.GET_ALL_TRIPS_SUCCESS: {

			return action.trips;

		}

		case TripActions.GET_MONTHLY_REPORT: {

			return {
				...state,
				loadingMonthlyReport: true
			} 

		}

		case TripActions.GET_MONTHLY_REPORT_SUCCESS: {

			return {
				...state,
				url: action.url,
				loadingMonthlyReport: false
			}

		}
		
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


const trip = (state, action) => {


	if (state._id !== (action._id || action.trip._id)) {
		return state;
	}

	switch (action.type) {


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