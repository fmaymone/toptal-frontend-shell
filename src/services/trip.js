import AuthService from "./auth";


export default class TripService extends AuthService {
    static instance = null;

    constructor(baseUrl) {
        super(baseUrl);
        this.promise = this.login("mouse@test.com", "password");
    }

    static create(baseUrl) {
        if (TripService.instance === null)
            TripService.instance = new TripService(baseUrl);
        return TripService.instance;
    }

    defaultConfig() {
        return {
            headers: {
                Authorization: this._authToken,
                Accept: "application/vnd.trips.v1+json",
                'Content-Type': 'application/json',
            }
        };
    }

    async list() {
        if (this.promise != null) {
            await this.promise;
        }
        if (!this._authenticated) {
            throw new Exception("Not Authenticated");
        }
        try {
            let response = await this._client.get("/trips", this.defaultConfig());
            console.log("[listTrips]: " + response.data);
            return response.data;
        }
        catch(ex) {
            console.log(ex.message)
            return [];
        }
    }

    async create(trip) {
        if (!this._authenticated) {
            throw new Exception("Not Authenticated");
        }
        try {
            let response = await this._client.post("/trips", {
                destination: trip.destination,
                start_date: trip.start_date,
                end_date: trip.end_date,
                comment: trip.comment
            }, this.defaultConfig());
            console.log("[createTrip]: " + response.data);
            return response.data;
        }
        catch(ex) {
            console.log(ex.message)
            throw ex;
        }
    }

    async update(trip) {
        if (!this._authenticated) {
            throw new Exception("Not Authenticated");
        }
        try {
            let response = await this._client.patch(`/trips/${trip.id}`, trip, this.defaultConfig());
            console.log("[updateTrip]: ok");
        }
        catch(ex) {
            console.log(ex.message)
            throw ex;
        }
    }

    async delete(tripId) {
        if (!this._authenticated) {
            throw new Exception("Not Authenticated");
        }
        try {
            let response = await this._client.delete(`/trips/${tripId}`, this.defaultConfig());
            console.log("[deleteTrip]: ok");
        }
        catch(ex) {
            console.log(ex.message)
            throw ex;
        }
    }

    async get(tripId) {
        if (!this._authenticated) {
            throw new Exception("Not Authenticated");
        }
        try {
            let response = await this._client.get(`/trips/${tripId}`, this.defaultConfig());
            console.log("[getTrip]: ok");
            return response.data;
        }
        catch(ex) {
            console.log(ex.message)
            throw ex;
        }
    }
}