class Hosts {
  placesHost = () => {
    // if i'm in prod
    if (window.location.host.indexOf('localhost') === -1) {
      return 'https://wanderers-places.herokuapp.com';
    } else {
      return 'http://localhost:5000';
    }
  };

  authHost = () => {
    if (window.location.host.indexOf('localhost') === -1) {
      return 'https://wanderers-auth.herokuapp.com';
    } else {
      return 'http://local.auth.wanderers.com:4000';
    }
  };
}

const singleton = new Hosts();
export default singleton;
