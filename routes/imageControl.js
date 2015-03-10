"use strict";
/*
 * wll 2015.1.23
**/

var Movie = require('../models/movie.js');
var async = require("async");

// Description: bing image search 
exports.searchImage = function(req, res) {
	var searchString = req.query['searchString'];
    //console.log("Image search query string");
	//console.log(searchString);
	//var searchResult = [];
    var Bing = require('node-bing-api')({ accKey: "gfn/M6cO7wHzrLWPJlj/RRCOWtJqg5kQ8vkveXw1aHE" });
    Bing.images(searchString, function(error, res2, body){
        //console.log(body);
        res.send({
            'images': body,
            'success': true
        });
    }, {
        skip: 26
    }); 
};

// Description: text search 
exports.searchByText = function(req, res) {

	var searchString = req.body.searchString;
	console.log(searchString);
	var searchResult;
	var keywords;

    // // add an element
    // var element = new Movie({
    //     'path': 'path3', 'name': 'name3', 'description': 'xiuer xiuer xiuer', 'tag': 'tag3'
    // });

    // element.save(function onEnd(err, element) {
    // 	console.log('------------- save -------------');
    //     if(!err){
    //         res.send({
    //             'success': true
    //         });
    //     }
    // });

    // get the movies
    Movie.getAllMovies(function onEnd(err, result) {
        if(err){
            console.log("get all tree nodes err: "+ err);
        }
        if(!err){
            console.log("get all tree nodes success");
            searchResult = result;
        }
    });

    var AlchemyAPI = require('alchemy-api');
	var alchemy = new AlchemyAPI('9a690c877b6fffc77388ecf950f3ad6101cef3b4');
	alchemy.keywords(searchString, {}, function(err, response) {
      if (err) throw err;
      // See http://www.alchemyapi.com/api/keyword/htmlc.html for format of returned object
      keywords = response.keywords;
      // Do something with data
      console.log(keywords);
	});

	// res.send({
	// 	'keyworks': searchResult,
	// 	'query string keyworks': keywords,
	// 	'success': true
	// });
    // redirect to image search page
    req.session.keywords = keywords;
    req.session.searchResult = searchResult;
	res.redirect('../image');
};


// // Description: youku video search 
// exports.searchVideo function(req, res) {


// };