exports.isLoggedIn = (req, res, next) => {
  if (req.url === '/') {
    next();
  } else if (req.user) {
    next();
  } else {
    // Commented out authentication
    /*
    console.log('not logged in');
    res.redirect('/');
    */
    req.user = "Mike" 
    next();
  }
};