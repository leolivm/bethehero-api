const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");
const ongController = require("./controllers/ongcontroller");
const incidentsController = require("./controllers/incidentscontroller");
const profileController = require("./controllers/profilecontroller");
const sessionController = require("./controllers/sessioncontroller");
const routes = express.Router();

routes.post("/sessions", sessionController.create);

routes.get("/ongs", ongController.index);
routes.post(
  "/ongs",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp: Joi.string().required().min(10).max(11),
      city: Joi.string().required(),
      uf: Joi.string().required().length(2),
    }),
  }),
  ongController.create
);

routes.get(
  "/profile",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  profileController.index
);

routes.get(
  "/incidents",
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
    }),
  }),
  incidentsController.index
);
routes.post("/incidents", incidentsController.create);
routes.delete(
  "/incidents/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),
  }),
  incidentsController.delete
);

module.exports = routes;
