/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , crypto = require('crypto')

/**
 * User Schema
 */

var ModelSchema = new Schema({
  uname:    {type: String, required: true, unique: true},
  date:     {type: Date,   default: Date.now}
});

/**
 * Methods
 */

ModelSchema.methods = {
}

/**
 * Statics
 */

ModelSchema.statics = {
	list: function (options, cb) {
	    this.find(options).exec(cb)
	}
}

mongoose.model('XUser', ModelSchema)
