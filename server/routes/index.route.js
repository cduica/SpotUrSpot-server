import express from 'express';
import authRoutes from './auth.route';
import spotRoutes from './spot.route';
import spotifyRoutes from './spotify.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/spots', spotRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

router.use('/playlists', spotifyRoutes);

export default router;
