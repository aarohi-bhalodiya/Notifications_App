const config = require("../../config");
const fs = require("fs");

function NotificationsController() {
  //Get all users API
  this.getUsers = async (req, res) => {
    let notifications = fs.readFileSync("uploads/invitations.json");
    notifications = JSON.parse(notifications);
    if (notifications) {
      notifications = notifications.invites;
      let users = Array.from(
        new Set(notifications.map((user) => user.user_id))
      ).map((user_id) => {
        return {
          user_id: user_id,
          sender_id: notifications.find((user) => user.user_id == user_id)
            .sender_id,
        };
      });
      return res.status(config.HTTP_SUCCESS).send({
        status: config.SUCCESS,
        code: config.HTTP_SUCCESS,
        message: users.length + " users found.",
        result: users,
      });
    } else {
      return res.status(config.HTTP_NOT_FOUND).send({
        status: config.ERROR,
        code: config.HTTP_NOT_FOUND,
        error: "There are no users in the system!",
      });
    }
  };

  //Get user's all notifications API
  this.getNotifications = async (req, res) => {
    const user_id = req.params.user_id;
    let notificationsData = fs.readFileSync("uploads/invitations.json");
    notificationsData = JSON.parse(notificationsData);
    if (notificationsData) {
      notificationsData = notificationsData.invites;
      let notifications = notificationsData.filter(
        (user) => user.user_id == user_id
      );
      return res.status(config.HTTP_SUCCESS).send({
        status: config.SUCCESS,
        code: config.HTTP_SUCCESS,
        message: notifications.length + " notifications found.",
        result: notifications,
      });
    } else {
      return res.status(config.HTTP_NOT_FOUND).send({
        status: config.ERROR,
        code: config.HTTP_NOT_FOUND,
        error: "There are no users in the system!",
      });
    }
  };

  //Get user's all updated notifications API
  this.getUpdatedNotifications = async (req, res) => {
    const user_id = req.params.user_id;
    let updatedNotificationsData = fs.readFileSync(
      "uploads/invitations_update.json"
    );
    updatedNotificationsData = JSON.parse(updatedNotificationsData);
    if (updatedNotificationsData) {
      updatedNotificationsData = updatedNotificationsData.invites;
      let updatedNotifications = updatedNotificationsData.filter(
        (user) => user.user_id == user_id
      );
      return res.status(config.HTTP_SUCCESS).send({
        status: config.SUCCESS,
        code: config.HTTP_SUCCESS,
        message: updatedNotifications.length + " updated notifications found.",
        result: updatedNotifications,
      });
    } else {
      return res.status(config.HTTP_NOT_FOUND).send({
        status: config.ERROR,
        code: config.HTTP_NOT_FOUND,
        error: "There are no updated notifications in the system!",
      });
    }
  };
}

module.exports = new NotificationsController();
