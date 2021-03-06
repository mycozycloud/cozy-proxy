// Generated by CoffeeScript 1.10.0
var axon, configurePassport, initializeProxy, localization, path, remoteAccess, router;

path = require('path');

configurePassport = require('./lib/passport_configurator');

router = require('./lib/router');

initializeProxy = require('./lib/proxy').initializeProxy;

localization = require('./lib/localization_manager');

remoteAccess = require('./lib/remote_access');

axon = require('axon');

module.exports = function(app, server, callback) {
  var error, hash, socket;
  if (callback == null) {
    callback = function() {};
  }
  configurePassport();
  app.locals.t = localization.t;
  app.locals.getLocale = localization.getLocale;
  try {
    hash = "." + (require('../assets').hash);
  } catch (error) {
    hash = '';
  }
  app.locals.hash = hash;
  initializeProxy(app, server);
  socket = axon.socket('sub-emitter');
  socket.connect(9105);
  socket.on('device.*', function() {
    return remoteAccess.updateCredentials();
  });
  return remoteAccess.updateCredentials(function() {
    return router.reset(function() {
      return router.displayRoutes(function() {
        return callback(app, server);
      });
    });
  });
};
