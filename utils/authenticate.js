//function middleware that checks the login status of the user
const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports = withAuth;
