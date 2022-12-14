const express = require("express");
const authController = require("../Controllers/authController");
const auth = require("../Middlewears/auth");
const upload = require("../Middlewears/multer");

const Router = express.Router();

Router.route("/upload").post(
  auth,
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "photo", maxCount: 1 },
  ]),
  authController.UploadVideo
);

Router.route("/profile/:userId").get(auth, authController.profile);
Router.route("/videos").get(auth, authController.GetVideos);
Router.route("/video/:videoId").get(auth, authController.GetVideo);
Router.route("/follow/:userId").post(auth, authController.Follow);
Router.route("/unFollow/:userId").delete(auth, authController.UnFollow);
Router.route("/comment/:videoId/:userId").post(auth, authController.Comment);
Router.route("/like/:videoId").post(auth, authController.like);
Router.route("/dislike/:videoId").delete(auth, authController.Dislike);
Router.route("/didliked/:videoId").get(auth, authController.Didliked);
Router.route("/didFollow/:userId").get(auth, authController.DidFollow);
Router.route("/getComments/:videoId").get(auth, authController.GetComments);
Router.route("/inbox").get(auth, authController.GetNotifications);
Router.route("/search/users/:value").get(auth, authController.SearchUsers);
Router.route("/search/videos/:value").get(auth, authController.SearchVideos);
Router.route("/delete/:videoId").delete(auth, authController.DeleteVideo);
Router.route("/getProfile/edit").get(auth, authController.GetProfileForEdit);
Router.route("/update").put(auth, authController.UpdateProfileDetails);
Router.route("/update/photo").put(
  auth,
  upload.single("photo"),
  authController.UpdateProfilePhoto
);

module.exports = Router;
