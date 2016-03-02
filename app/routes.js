module.exports = function(app, passport, router) {

    require('./routes/passport-routes')(app, passport);

    var friendRoutes = require('./routes/friend.js');

    router.route('/add-friend/:friend_id')
        .put(friendRoutes.putFriend);

    router.route('/get-friends')
        .get(friendRoutes.getFriends);
};