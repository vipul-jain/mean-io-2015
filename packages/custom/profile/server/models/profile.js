/**
 * Created on 1/1/15.
 */

'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Profile Schema
 */
var ProfileSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        required: true,
        trim: true
    },
    dob: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        required: true,
        trim: true
    },
    postal: {
        type: String,
        required: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

/**
 * Validations
 */
ProfileSchema.path('name').validate(function(title) {
    return !!title;
}, 'Name cannot be blank');

ProfileSchema.path('dob').validate(function(content) {
    return !!content;
}, 'Birth date cannot be blank');

ProfileSchema.path('address').validate(function(content) {
    return !!content;
}, 'Address cannot be blank');

ProfileSchema.path('city').validate(function(content) {
    return !!content;
}, 'City cannot be blank');

ProfileSchema.path('state').validate(function(content) {
    return !!content;
}, 'State cannot be blank');

ProfileSchema.path('postal').validate(function(content) {
    return !!content;
}, 'Postal cannot be blank');

ProfileSchema.path('country').validate(function(content) {
    return !!content;
}, 'Country cannot be blank');

/**
 * Statics
 */
ProfileSchema.statics.load = function(id, cb) {
    this.findOne({
        user: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Profile', ProfileSchema);

