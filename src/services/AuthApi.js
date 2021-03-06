import { create } from 'apisauce';

import Hosts from './Hosts';

export default class AuthApi {
  constructor() {
    this.api = create({
      // Hosts required for different environments
      baseURL: Hosts.authHost(),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });
  }

  login = (email, password) => {
    // post to #sessions from authentication-ms
    return this.api.post('/sessions', {
      email,
      password
    });
  };

  signup = (name, email, password, image) => {
    const form_data = new FormData();
    form_data.append('user[name]', name);
    form_data.append('user[email]', email);
    form_data.append('user[password]', password);
    form_data.append('user[image]', image);
    // post to #users from authentication-ms
    return this.api.post('/users', form_data);
  };
}
