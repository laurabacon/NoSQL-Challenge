const { Schema, model} = require('mongoose');








const Reaction = model('Reaction', ReactionNetworkSchema);

module.exports = Reaction;