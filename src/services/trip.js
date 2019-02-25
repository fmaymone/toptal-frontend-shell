import AuthService from "./auth";

export default class TripService {
    constructor(authService: AuthService, client) {
        this._auth = authService;
        this._client = client;
    }

    defaultConfig() {
        return {
            headers: {
                Authorization: this._auth.authToken,
                Accept: "application/vnd.trips.v1+json",
                'Content-Type': 'application/json',
            }
        };
    }

    async list() {
        this._auth.throwWhenUnauthenticated();
        try {
            let response = await this._client.get("/trips", this.defaultConfig());
            //console.log("[listTrips]: " + response.data);
            return response.data;
        }
        catch(ex) {
            console.log(ex.message)
            return [];
        }
    }

    async getAll() {
        this._auth.throwWhenUnauthenticated();
        try {
            let response = await this._client.get("/admin/get_all_trips", this.defaultConfig());
            //console.log("[listAllTrips]: " + response.data);
            return response.data;
        }
        catch(ex) {
            console.log(ex.message)
            return [];
        }
    }

    async create(trip) {
        this._auth.throwWhenUnauthenticated();
        try {
            let response = await this._client.post("/trips", {
                destination: trip.destination,
                start_date: trip.start_date,
                end_date: trip.end_date,
                comment: trip.comment
            }, this.defaultConfig());
           // console.log("[createTrip]: " + response.data);
            return response.data;
        }
        catch(ex) {
            console.log(ex.message)
            throw ex;
        }
    }

    async update(trip) {
        this._auth.throwWhenUnauthenticated();
        try {
            let response = await this._client.patch(`/trips/${trip.id}`, trip, this.defaultConfig());
            //console.log("[updateTrip]: ok");
        }
        catch(ex) {
            console.log(ex.message)
            throw ex;
        }
    }

    async delete(tripId) {
        this._auth.throwWhenUnauthenticated();
        try {
            let response = await this._client.delete(`/trips/${tripId}`, this.defaultConfig());
            //console.log("[deleteTrip]: ok");
        }
        catch(ex) {
            console.log(ex.message)
            throw ex;
        }
    }

    async get(tripId) {
        this._auth.throwWhenUnauthenticated();
        try {
            let response = await this._client.get(`/trips/${tripId}`, this.defaultConfig());
            //console.log("[getTrip]: ok");
            return response.data;
        }
        catch(ex) {
            console.log(ex.message)
            throw ex;
        }
    }

    async getMonthlyReport(month) {
        this._auth.throwWhenUnauthenticated();
        try {
            let response = await this._client.get(`/print_monthly_trips/${month}`, this.defaultConfig());
           // console.log("[getMonthlyReport]: ok");
            return {
                url: `${this._client.defaults.baseURL}/${response.data.url}`
            };
        }
        catch(ex) {
            console.log(ex.message)
            throw ex;
        }
    }
}