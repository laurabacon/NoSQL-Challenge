const { Schema, model} = require('mongoose');

//mongoose schema instance
const UserNetworkSchema = new Schema({
    username: {type: String, unique: true, required: true, trim: true},
    email: {type: String, unique: true, required: true, match: [/.+@.+\..+/]},
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

UserNetworkSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('User', UserNetworkSchema);

module.exports = User;