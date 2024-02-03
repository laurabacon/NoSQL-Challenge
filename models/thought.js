const { Schema, model} = require('mongoose');








const Thought = model('Thought', ThoughtNetworkSchema);

module.exports = Thought;