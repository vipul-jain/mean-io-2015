'use strict';

/* jshint -W098 */

var profile = require('../controllers/profile');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
    if (!req.user.isAdmin && req.profile.user.id !== req.user.id) {
        return res.status(401).send('User is not authorized');
    }
    next();
};
// The Package is past automatically as first parameter
module.exports = function (Profile, app, auth, database) {

    app.get('/profile/edit_profile/anyone', function (req, res, next) {
        res.send('Anyone can access this');
    });

    app.get('/profile/edit_profile/auth', auth.requiresLogin, function (req, res, next) {
        res.send('Only authenticated users can access this');
    });

    app.get('/profile/edit_profile/admin', auth.requiresAdmin, function (req, res, next) {
        res.send('Only users with Admin role can access this');
    });

    app.get('/profile/edit_profile/render', function (req, res, next) {
        Profile.render('index', {
            package: 'profile'
        }, function (err, html) {
            //Rendering a view from the Package server/views
            res.send(html);
        });
    });

    app.route('/profile')
        .get(profile.all)
        .post(auth.requiresLogin, profile.create);

    app.route('/profile/:userId')
        .get(auth.isMongoId, profile.show)
        .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, profile.update)
        .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, profile.destroy);

    // Finish with setting up the articleId param
    app.param('userId', profile.profile);

};
