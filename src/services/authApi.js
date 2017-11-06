import { create } from 'apisauce';

export default class AuthApi {
  constructor() {
    this.api = create({
      // custom url (it has to redirect to facebook) -> atom /etc/hosts
      baseURL: 'http://local.auth.wanderers.com:4000',
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
