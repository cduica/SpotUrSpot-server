import Spot from '../models/spot.model';

function load(req, res, next, id) {
  Spot.get(id)
    .then((spot) => {
      req.spot = spot; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

function get(req, res) {
    res.json(req.spot);
}

function create(req, res, next) {
    const spot = new Spot({
        spotID: req.body.spotID, 
        playlistURL: req.body.playlistURL
    });

    spot.save()
        .then(saved => res.json(saved))
        .catch(e => next(e));
}

function update(req, res, next) {
    const spot = req.spot;
    spot.playlistURL = req.body.playlistURL;
    spot.save()
        .then(saved => res.json(saved))
        .catch(e => next(e));
}

function list(req, res, next) {
    const {limit = 50, skip = 0} = req.query;
    Spot.list({limit, skip})
        .then(spots => res.json(spots))
        .catch(e => next(e));
}

function remove(req, res) {
    const spot = req.spot;
    spot.remove()
        .then(delted => res.json(deleted))
        .catch(e => next(e));
}

export default {load, get, create, update, list, remove};