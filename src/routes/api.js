import express from "express";
import { authController } from "../controllers/authControllers.js";
import { adminControllers } from "../controllers/adminControllers.js";
import { toursController } from "../controllers/toursControllers.js";
import { newsController } from "../controllers/newsControllers.js";
import { destinationControllers } from "../controllers/destinationControllers.js";
import { middlewareController } from "../controllers/middlewareControllers.js";
const router = express.Router();

export const routes = (app) => {
  // admin
  router.get(
    "/getAllAdmins",
    middlewareController.verifyTokenAdmin,
    adminControllers.getAllAdmins
  );
  router.get(
    "/getAllUsers",
    middlewareController.verifyTokenAdmin,
    adminControllers.getAllUsers
  );
  router.get(
    "/getAdmin",
    middlewareController.verifyTokenAdmin,
    adminControllers.getAdmin
  );
  router.post(
    "/addAdmin",
    middlewareController.verifyTokenAdmin,
    adminControllers.addAdmin
  );
  router.put(
    "/updateAdmin",
    middlewareController.verifyTokenAdmin,
    adminControllers.updateAdmin
  );
  router.delete(
    "/deleteAdmin",
    middlewareController.verifyTokenAdmin,
    adminControllers.deleteAdmin
  );
  router.delete(
    "/deleteUser",
    middlewareController.verifyTokenAdmin,
    adminControllers.deleteUser
  );

  // Tour
  router.get(
    "/getAllTours",
    middlewareController.verifyTokenAdmin,
    toursController.getAllTours
  );
  router.get("/getAllToursClient", toursController.getAllToursClient);
  router.get("/getTourSearch", toursController.getTourSearch);
  router.get("/getTours", toursController.getTours);
  router.post(
    "/addTour",
    middlewareController.verifyTokenAdmin,
    toursController.addTour
  );
  router.put(
    "/updateTour",
    middlewareController.verifyTokenAdmin,
    toursController.updateTour
  );
  router.delete(
    "/deleteTour",
    middlewareController.verifyTokenAdmin,
    toursController.deleteTour
  );

  //   News
  router.get("/getAllNews", newsController.getAllNews);
  router.get("/getNews", newsController.getNews);

  // Destinations
  router.get("/getAllDestinations", destinationControllers.getAllDestinations);
  router.get("/getDestination", destinationControllers.getDestination);
  router.post("/createDestinations", destinationControllers.createDestinations);

  // auth
  router.post("/register", authController.handleRegister);
  router.post("/login", authController.handleLogin);
  router.post("/refresh", authController.refreshToken);
  router.post(
    "/logout",
    middlewareController.verifyToken,
    authController.logout
  );
  return app.use("/api/tevily", router);
};
