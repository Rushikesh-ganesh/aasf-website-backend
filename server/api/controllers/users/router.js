import * as express from "express";
const multer = require("multer");
import controller from "./controller";

import isAuthenticated from "../../middlewares/isAuthenticated";
import isAdmin from "../../middlewares/isAdmin";

const fileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(csv)$/))
    return callback(new Error("Please upload a valid .csv file"), false);
  else return callback(null, true);
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, __dirname + `/../../../../public/users/`);
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

//Upload a .csv file with field name as "users" as form-data body

export default express
  .Router()
  .post(
    "/upload",
    isAuthenticated,
    isAdmin,
    upload.single("users"),
    controller.uploadUsers
  )
  .post("/login", controller.login)
  .post("/changepassword", isAuthenticated, controller.changePassword)
  .get("/details", isAuthenticated, controller.getUserDetails);
