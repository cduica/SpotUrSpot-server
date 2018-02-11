import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import spotCtrl from '../controllers/spot.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/users - Get list of users */
  .get(spotCtrl.list)

  /** POST /api/users - Create new user */
  .post(validate(paramValidation.createSpot), spotCtrl.create);

router.route('/:spotID')
  /** GET /api/users/:userId - Get user */
  .get(spotCtrl.get)

  /** PUT /api/users/:userId - Update user */
  .put(validate(paramValidation.updateSpot), spotCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(spotCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('spotID', spotCtrl.load);

export default router;
