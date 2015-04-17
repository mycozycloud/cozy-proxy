// Generated by CoffeeScript 1.6.2
var Instance, LocalizationManager, Polyglot;

Polyglot = require('node-polyglot');

Instance = require('../models/instance');

LocalizationManager = (function() {
  function LocalizationManager() {}

  LocalizationManager.prototype.polyglot = null;

  LocalizationManager.prototype.initialize = function(callback) {
    var _this = this;

    return this.retrieveLocale(function(err, locale) {
      if (err != null) {
        return callback(err);
      } else {
        _this.polyglot = _this.getPolyglotByLocale(locale);
        return callback(null, _this.polyglot);
      }
    });
  };

  LocalizationManager.prototype.retrieveLocale = function(callback) {
    return Instance.getLocale(function(err, locale) {
      if ((err != null) || !locale) {
        locale = 'en';
      }
      return callback(err, locale);
    });
  };

  LocalizationManager.prototype.getPolyglotByLocale = function(locale) {
    var err, phrases;

    try {
      phrases = require("../../client/locales/" + locale);
    } catch (_error) {
      err = _error;
      phrases = require('../../client/locales/en');
    }
    return new Polyglot({
      locale: locale,
      phrases: phrases
    });
  };

  LocalizationManager.prototype.t = function(key, params) {
    var _ref;

    if (params == null) {
      params = {};
    }
    return (_ref = this.polyglot) != null ? _ref.t(key, params) : void 0;
  };

  LocalizationManager.prototype.getPolyglot = function() {
    return this.polyglot;
  };

  return LocalizationManager;

})();

module.exports = new LocalizationManager();
