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

  signup = (name, email, password, image) => {
    const form_data = new FormData();
    form_data.append('user[name]', name);
    form_data.append('user[email]', email);
    form_data.append('user[password]', password);
    form_data.append('user[image]', image);

    return this.api.post('/users', form_data);
  };
}
