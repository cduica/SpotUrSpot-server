import Joi from 'joi';

export default {

  createSpot: {
    body: {
      spotID: Joi.string().required(),
      playlistURL: Joi.string().required()
    }
  },

  updateSpot: {
    body: {
      playlistURL: Joi.string().required()
    },
    params: {
      spotID: Joi.string().required()
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  }
};
