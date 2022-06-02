const Session = require('../models/sessionModel');
const sessionController = {};

/**
* isLoggedIn - find the appropriate session for this request in the database, then
* verify whether or not the session is still valid.
*/
sessionController.isLoggedIn = (req, res, next) => {
  Session.findOne({cookieId: req.cookies.ssid}, (err, session) => {
    if (err) { return next(err); }
    else if (!session) { return next('no session found'); }
    else { return next(); }
  });
};

sessionController.startSession = (req, res, next) => {
  Session.create({cookieId: res.locals.user.id}, (err, session) => {
    if (err) return next(err);
    else return next();
  });
};

module.exports = sessionController;
module.exports = sessionController;