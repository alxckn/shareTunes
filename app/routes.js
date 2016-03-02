module.exports = function(app, passport, router) {

    require('./routes/passport-routes')(app, passport);

    var friendRoutes = require('./routes/friend.js');

    router.route('/add-friend/:friend_id')
        .put(friendRoutes.addFriend);

    router.route('/get-friends')
        .get(friendRoutes.getFriends);

    router.route('/approve-friend/:id')
        .put(friendRoutes.approveFriend);

    var userRoutes = require('./routes/user.js');

    router.route('/user/:id')
        .get(userRoutes.getUser);
};