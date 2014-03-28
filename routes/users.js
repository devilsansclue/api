module.exports.route = function(server, db) {

    var UsersModel = require('../models/user.js');

    server.get('/users/query',function(req, res, next) {
        var Users = new UsersModel();
        Users.query(req.params);
        return next();
    });

    server.get('/users', function (req, res, next) {
        UsersModel.find(function(err,users){
            res.send(users);
        });
        return next();
    });

    server.post('/users',function(req, res, next){
        UsersModel.create(req.params,function(err,user){
            if(err) res.send(err);
            res.send(user);
        });
    });

    server.get('/users/:id', function (req, res, next) {
        UsersModel.findOne()
            .where('_id').equals(req.params.id)
            .exec(function(err,user){
                res.send(user);
            });
        return next();
    });

    server.put('/users/:id', function (req, res, next) {
        UsersModel.findOne()
            .where('_id').equals(req.params.id)
            .exec(function(err,user){
                user.username = req.params.username;
                user.save(function(err) {
                    res.send(user);
                });
            });
        return next();
    });

    server.del('/users/:id', function (req, res, next) {
        UsersModel.findOne()
            .where('_id').equals(req.params.id)
            .exec(function(err,user){
                user.remove(function(err, user) {
                    if(err) resp = false;
                    else resp = true;
                    res.send(resp);
                });
            });
        return next();
    });



}