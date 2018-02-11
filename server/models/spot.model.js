import mongoose from 'mongoose';
import httpStatus from 'http-status';
import Promise from 'bluebird';
import APIError from '../helpers/APIError';

const SpotSchema = new mongoose.Schema({
    spotID: {
        type: String,
        required: true
    },
    playlistURL: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date, 
        default: Date.now
    }
});

SpotSchema.statics = {
    get(id) {
        return this.findById(id)
            .exec()
            .then((spot) => {
                if(spot) {
                    return spot;
                }
                const err = new APIError('No such spot exists!', httpStatus.NOT_FOUND);
                return Promise.reject(err);
            });
    },

    list({skip=0, limit=50} = {}) {
        return this.find()
            .sort({createdAt: -1})
            .skip(+skip)
            .limit(+limit)
            .exec();
    }
}

export default mongoose.model('Spot', SpotSchema);