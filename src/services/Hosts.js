class Hosts {
  placesHost = () => {
    return 'http://localhost:5000';
  };

  authHost = () => {
    return 'http://local.auth.wanderers.com:4000';
  };
}

const singleton = new Hosts();
export default singleton;
