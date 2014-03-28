'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var util = require('util');

var UserSchema = new Schema({
    username : { type : String, required : true, unique:true,  lowercase: true, trim: true },
    password : { type : String, required : true },
    email: { type : String, required : true, unique:true,  lowercase: true, trim: true }
});

UserSchema.methods.query = function(params){
    console.log(params);
};



mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');