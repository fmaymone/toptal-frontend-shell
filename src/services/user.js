import AuthService from "./auth";

import User from "../model/user"

export default class UserService {
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
      let response = await this._client.get("/users", this.defaultConfig());
      console.log("[listUsers]: " + response.data);
      return response.data.map(u => { return new User(u.id, u.name, u.email, u.role); });
    }
    catch(ex) {
      console.log(ex.message)
      return [];
    }
  }

  async create(user) {
    this._auth.throwWhenUnauthenticated();
    try {
      let response = await this._client.post("/users",
        user.toJSON(), this.defaultConfig());
      console.log("[createUser]: " + response.data);
      return response.data;
    }
    catch(ex) {
        console.log(ex.message)
        throw ex;
    }
  }

  async update(user) {
    this._auth.throwWhenUnauthenticated();
    try {
      let response = await this._client.patch(`/users/${user.id}`, 
        user.toJSON(), this.defaultConfig());
      console.log("[updateUser]: ok");
    }
    catch(ex) {
      console.log(ex.message)
      throw ex;
    }
  }

  async delete(userId) {
    this._auth.throwWhenUnauthenticated();
    try {
      let response = await this._client.delete(`/users/${userId}`, this.defaultConfig());
      console.log("[deleteUsers]: ok");
    }
    catch(ex) {
      console.log(ex.message)
      throw ex;
    }
  }

  async get(userId) {
    this._auth.throwWhenUnauthenticated();
    try {
      let response = await this._client.get(`/users/${userId}`, this.defaultConfig());
      console.log("[getUser]: ok");
      const {id, name, email, role} = response.data; 
      return new User(id, name, email, role);
    }
    catch(ex) {
      console.log(ex.message)
      throw ex;
    }
  }
}