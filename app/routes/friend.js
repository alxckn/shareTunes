/**
 * Created by alex on 3/1/16.
 */

var Friendship  = require('../models/friendship');
var User        = require('../models/user');

var userExists = function(id) {
    return new Promise(function(resolve, reject) {
        User.findById(id, function (err, user) {
            if (err)
                reject('There was an error');
            if (!user)
                reject('The friend was not found');
            resolve();
        });
    });
};

var notAlreadyFriends = function(userId, friendId) {
    return new Promise(function(resolve, reject) {
        Friendship.findOne({friend1_id: userId, friend2_id: friendId}, function (err, friendship) {
            if (err)
                reject('There was an error');
            if (!friendship) {
                resolve();
            }
            reject('Friendship already exists');
        });
    });
};

var createFriend = function(friend_id, req) {
    console.log('Adding a friend to '+ req.user.id);
    return new Promise(function(resolve, reject) {
        Promise
            .all([userExists(friend_id), notAlreadyFriends(req.user.id, friend_id), notAlreadyFriends(friend_id, req.user.id)])
            .then(function() {
                var newFriendship = new Friendship();

                newFriendship.friend1_id = req.user.id;
                newFriendship.friend2_id = friend_id;
                newFriendship.accepted = false;

                newFriendship.save(function(err) {
                    if (err) {
                        reject('Error when saving friendship');
                    }
                    resolve('Friendship was created');
                });
            }).catch(function(message) {
            console.log(message);
            reject(message);
        });
    });
};

exports.addFriend = function(req, res) {
    var friendId = req.params.friend_id;
    Promise
        .all([createFriend(friendId, req)])
        .then(function(message) {
            res.status(201);
            res.send(message);
        })
        .catch(function(message) {
            console.log('There was problem in routes '+message);
            res.status(404);
            res.send(message);
    });
};

var createFriendsJson = function(friendships, userId) {
    var friendsJson = {};

    friendsJson['friends'] = [];
    friendsJson['toApprove'] = [];
    friendsJson['pending'] = [];

    for (var i=0; i<2; i++) {
        if (typeof friendships[i] !== 'undefined'){
            for (var j in friendships[i]) {
                var friend = friendships[i][j];
                if (friend.friend1_id == userId)
                    friend.accepted ? friendsJson['friends'].push(friend.friend2_id) : friendsJson['pending'].push(friend.friend2_id);
                else if (friend.friend2_id == userId)
                    friend.accepted ? friendsJson['friends'].push(friend.friend1_id) : friendsJson['toApprove'].push(friend.friend1_id);
            }
        }
    }

    return friendsJson;
};

exports.getFriends = function(req, res) {
    var promise = new Promise(function(resolve, reject) {
        Friendship.find({$or : [{friend1_id: req.user.id}, {friend2_id: req.user.id}]}, function (err, friendships) {
            if (err)
                reject('There was an error');
            if (!friendships) {
                reject('No friends');
            }
            resolve(friendships);
        });
    });
    Promise
        .all([promise])
        .then(function(friendships) {
            res.status(200);
            res.send(createFriendsJson(friendships, req.user.id));
        })
        .catch(function(message) {
            res.status(404);
            res.send(message);
    });
};

exports.approveFriend = function(req, res) {
    var promise = new Promise(function(resolve, reject) {
        Friendship.findOne({$and : [{friend1_id: req.params.id}, {friend2_id: req.user.id}, {accepted: false}]}, function (err, friendship) {
            console.log(friendship);
            if (err)
                reject('There was an error');
            if (friendship == null || !friendship) {
                reject('No friendship to accept found');
            }
            else {
                friendship.accepted = true;
                friendship.save(function(err) {
                    if (err) {
                        reject('Error when updating friendship');
                    }
                    resolve('Friendship was updated');
                });
            }
        });
    });
    Promise
        .all([promise])
        .then(function(message) {
            res.status(200);
            res.send(message);
        })
        .catch(function(message) {
            res.status(404);
            res.send(message);
        });
};