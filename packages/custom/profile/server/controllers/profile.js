'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Profile = mongoose.model('Profile'),
    _ = require('lodash');


/**
 * Find profile by id
 */
exports.profile = function(req, res, next, id) {
    Profile.load(id, function(err, profile) {
        if (err) return next(err);
        if (!profile) return res.status(404).json({
            error: 'Unable to find the profile'
        });
        req.profile = profile;
        next();
    });
};

/**
 * Create an profile
 */
exports.create = function(req, res) {
    var profile = new Profile(req.body);
    profile.user = req.user;

    profile.save(function(err) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot save the profile'
            });
        }
        res.json(profile);

    });
};

/**
 * Update an profile
 */
exports.update = function(req, res) {
    var profile = req.profile;

    profile = _.extend(profile, req.body);

    profile.save(function(err) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot update the profile'
            });
        }
        res.json(profile);

    });
};

/**
 * Delete an profile
 */
exports.destroy = function(req, res) {
    var profile = req.profile;

    profile.remove(function(err) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot delete the profile'
            });
        }
        res.json(profile);

    });
};

/**
 * Show an profile
 */
exports.show = function(req, res) {
    res.json(req.profile);
};

/**
 * List of Profile
 */
exports.all = function(req, res) {
    Profile.find().sort('-created').populate('user', 'name username').exec(function(err, profiles) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot list the profiles'
            });
        }
        res.json(profiles);

    });
};
