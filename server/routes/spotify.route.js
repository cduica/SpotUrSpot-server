import express from 'express'
import spotifyController from '../controllers/spotify.controller'

const router = express.Router();

router.route('/')
    .get(spotifyController.getPlaylists);

// router.route('/tracks')
// .get(spotifyController.getTracks);

router.route('/:spotID')
    .post(spotifyController.changePlaylist)
  
/** Load user when API with userId route parameter is hit */
router.param('spotID', spotifyController.load);    

export default router;