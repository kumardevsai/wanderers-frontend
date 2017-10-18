import { create } from 'apisauce';

export default class AuthApi {
  constructor() {
    this.api = create({
      baseURL: 'http://local.auth.wanderers.com:4000',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });
  }

  login = (email, password) => {
    return this.api.post('/sessions', {
      email,
      password
    });
  };
}
