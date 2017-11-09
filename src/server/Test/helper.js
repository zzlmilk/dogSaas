var should = require('should');
var request = require('supertest');
var async = require('async');



var app = require('../mainTest');



global.getRandomStr = function(){

    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;

}