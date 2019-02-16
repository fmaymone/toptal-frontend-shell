export default class AuthService {
    constructor(client) {
        this._client = client;
        this._authToken = "";
        this._authenticated = false;
        this._email = '';
    }

    async signUp(name, email, password, passwordConfirmation) {
        try {
            let response = await this._client.post("/signup", {
                name: name, 
                email: email, 
                password: password, 
                password_confirmation: passwordConfirmation
            });
            this._authenticated = true;
            this._authToken = response.data.auth_token;
            return true;
        }
        catch(ex) {
            return false;
        }
    }

    async login(email, password) {
        try {
            let response = await this._client.post("/auth/login", {
                email: email, 
                password: password
            });
            this._authenticated = true;
            this._authToken = response.data.auth_token;
            this._email = response.data.email;
            this._role = response.data.role;
            return this._authToken;
        }
        catch(ex) {
            console.log(ex.message);
            throw ex;
        }
    }

    isAuthenticated() {
        return this._authenticated;
    }

    throwWhenUnauthenticated() {
        if (!this._authenticated) {
            throw new Error("Not authenticated.");
        }
    }

    get authToken() {
        this.throwWhenUnauthenticated();
        return this._authToken;
    }
} 