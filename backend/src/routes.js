const express =  require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

//SessionController
routes.post('/sessions', SessionController.create);

//OngController
routes.get('/ongs', OngController.index);
routes.post('/ongs', celebrate({
  //integrando validador
  [Segments.BODY]:  Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp: Joi.string().required().min(10).max(11),
      city: Joi.string().required(),
      uf: Joi.string().required().length(2),
  })
}), OngController.create);

//ProfileController
routes.get('/profile', celebrate({
    //integrando validador
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.index);

//IncidentController
routes.get('/incidents', celebrate({
    //integrando validador
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', celebrate({
     //integrando validador
     [Segments.PARAMS]: Joi.object().keys({
         id: Joi.number().required(),
     })
}), IncidentController.delete)

module.exports = routes;