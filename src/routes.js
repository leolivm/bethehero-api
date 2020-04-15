const express = require("express");
const ongController = require("./controllers/ongcontroller");
const incidentsController = require("./controllers/incidentscontroller");
const profileController = require("./controllers/profilecontroller");
const sessionController = require("./controllers/sessioncontroller");
const routes = express.Router();

routes.post("/sessions", sessionController.create);

routes.get("/ongs", ongController.index);
routes.post("/ongs", ongController.create);

routes.get("/profile", profileController.index);

routes.get("/incidents", incidentsController.index);
routes.post("/incidents", incidentsController.create);
routes.delete("/incidents/:id", incidentsController.delete);

module.exports = routes;
