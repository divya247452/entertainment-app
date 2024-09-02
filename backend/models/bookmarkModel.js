const mongoose = require('mongoose');

const bookmarkSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        itemId: {
            type:Number,
            required:true
        },
        backdrop_path: {
            type: String,
            required: true
        },
        title: {
            type:String
        },
        name: {
            type:String
        },
        release_date: {
            type:String
        },
        first_air_date: {
            type:String
        }
    },
    {
      timestamps: true,
    }
)

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

module.exports = Bookmark;