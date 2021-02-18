const notifications = require("./api/controllers/notifications.controller");

module.exports = {
  configure: function (app, router) {
    //Get users API
    app.get("/api/users", (req, res) => {
      notifications.getUsers(req, res);
    });

    //Get user's notifications API
    app.get("/api/notifications/:user_id", (req, res) => {
      notifications.getNotifications(req, res);
    });

    //Get user's updated notifications API
    app.get("/api/updatedNotifications/:user_id", (req, res) => {
      notifications.getUpdatedNotifications(req, res);
    });
  },
};
