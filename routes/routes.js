  module.exports = function(app, passport, mongoose) {
      let auth = require('./auth/auth.js')();
      let location = require('./shared/location.js');
      let appointment = require('./appointment/appointment.js');
      let contact = require('./contact/contact.js');
      let subsidiary = require('./subsidiary/subsidiary.js');
      let favorite = require('./user/favorite.js');
      let message = require('./user/message.js');
      let notifications = require('./billing/notifications.js');
      let billing = require('./billing/billing.js');
      let configuration = require('./configuration/configuration.js');
      let files = require('./files/files.js')(mongoose);
      let index = require('./index');

      app.use('/appointment', appointment);
      app.use('/contact', contact);
      app.use('/subsidiary', subsidiary);
      app.use('/favorite', favorite);
      app.use('/message', message);
      app.use('/notifications', notifications);
      app.use('/billing', billing);
      app.use('/files', files);
      app.use('/location', location);
      app.use('/configuration', configuration);
      app.use('/auth', auth);
      app.use('/', index);
  };