module.exports = {
  isUserLoggedIn: () => {
    return !!this.getToken() && !this.isTokenExpired(this.getToken());
  },
};
