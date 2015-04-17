// Generated by CoffeeScript 1.9.1
var Application, americano;

americano = require('americano-cozy');

module.exports = Application = americano.getModel('Application', {
  name: String,
  displayName: String,
  description: String,
  slug: String,
  state: String,
  isStoppable: {
    type: Boolean,
    "default": true
  },
  date: {
    type: Date,
    "default": Date.now
  },
  icon: String,
  iconPath: String,
  iconType: String,
  color: {
    type: String,
    "default": null
  },
  git: String,
  errormsg: String,
  branch: String,
  port: Number,
  permissions: Object,
  password: String,
  homeposition: Object,
  widget: String,
  version: String,
  domain: String,
  needsUpdate: {
    type: Boolean,
    "default": false
  },
  _attachments: Object
});

Application.domainSlug = function(domain, callback) {
  return Application.request("all", {}, function(err, res) {
    var app, i, len;
    if (err != null) {
      return callback(err);
    }
    for (i = 0, len = res.length; i < len; i++) {
      app = res[i];
      if (app.domain === domain) {
        callback(null, app.slug);
        return;
      }
    }
    return callback(null, "");
  });
};
