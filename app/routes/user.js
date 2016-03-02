/**
 * Created by alex on 3/2/16.
 */

var User        = require('../models/user');

exports.getUser = function(req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) {
            res.status(500);
            res.send('Internal Error');
        }
        if (!user) {
            res.status(404);
            return res.send('User not found');
        }
        res.status(200);
        res.send(user);
    });
};