import mongoose from 'mongoose'
import mongoosePaginate  from 'mongoose-paginate-v2'

const schema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        company: {type: String, required: true},
        price: {type: Number, required: true},
        description: {type: String, required: true},
        coverImage: {type: String, required: true},
        releaseDate: {type: Date, required: true}
    }
);

schema.plugin(mongoosePaginate);

export const GameModel = mongoose.model('Game', schema);


export default GameModel
