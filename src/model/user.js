class Role {
  static ROLE_ADMIN = "admin";
  static ROLE_REGULAR = "regular";
  static ROLE_MANAGER = "manager";
}

export default class User {
  constructor(id = -1, name = "", email = "", role = "") {
    this._id = id;
    this._name = name;
    this._email = email;
    this._role = role;
  }
  set role(value) {
    this._role = value;
  }

  set name(value) {
    this._name = value;
  }
  get name() {
    return this._name;
  }

  get id() {
    return this._id;
  }

  get email() {
    return this._email;
  }

  get role() {
    return this._role;
  }

  toJSON() {
    return {
      id: this._id,
      name: this._name,
      email: this._email,
      role: this._role
    };
  }
}
