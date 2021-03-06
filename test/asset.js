/*global describe, it, before, after */
"use strict";
var assert = require("assert");
var fs = require("fs");
var Asset = require("../models/asset");
var SNode = require("../models/sNode");
var db = require("../models/db");
var am = require('../routes/assetManage.js');
var request = require('request');


describe('GeoAsset', function(){
	describe('count', function(){
		var asset = new Asset({
			"uuid": "aaaaa",
			"path": "aa",
			"name": "aa",
			"type": "geo",
			"count": 1
		});

		before(function(done){
			asset.save(function(err){
				if(!err){
					done();
				}else{
					done(err);
				}
			});
		});
		after(function(done){
			Asset.remove({
				'uuid': 'bbbbb',
				'type': 'img'
			}, function(err){
				if(!err){
					done();
				}else{
					done(err);
				}
			});
		});	
		it('should increase by 1 when a new ref from snode added', function(done){
			var snode = new SNode({
				data: "{\"assetId\":\"aaaaa\"}",
				uuid: "a",
				versionNum: "1",
				children: [],
				type: "geometry"
			});
			var count = asset.count;

			SNode.signals.nodeAdded.dispatch(snode);
			setTimeout(test, 10);

			function test(){
				Asset.findOne({
					'uuid': 'aaaaa',
					'type': 'geo'
				}, function onEnd(err, asset){
					if(!err){
						assert.equal(asset.count, count+1);
						done();
					}else{
						done(err);
					}
				});
			}
		});

		it('should decrease by 1 when a ref from snode removed, and the count>2', function(done) {
			var snode = new SNode({
				data: "{\"assetId\":\"aaaaa\"}",
				uuid: "a",
				versionNum: "1",
				children: [],
				type: "geometry"
			});
			var count;
			
			Asset.findOne({
				'uuid': 'aaaaa',
				'type': 'geo'
			}, function onEnd(err, asset){
				if(!err){
					count = asset.count;
					SNode.signals.nodeRemoved.dispatch(snode);
					setTimeout(test, 10);
				}else{
					done(err);
				}
			});

			function test(){
				Asset.findOne({
					'uuid': 'aaaaa',
					'type': 'geo'
				}, function onEnd(err, asset){
					if(!err){
						assert.equal(asset.count, count-1);
						done();
					}else{
						done(err);
					}
				});
			}
		});

		it('should be removed when the count is decreased to 0', function(done){
			var snode = new SNode({
				data: "{\"assetId\":\"aaaaa\"}",
				uuid: "a",
				versionNum: "1",
				children: [],
				type: "geometry"
			});		

			var count;
			
			Asset.findOne({
				'uuid': 'aaaaa',
				'type': 'geo'
			}, function onEnd(err, asset){
				if(!err){
					count = asset.count;
					assert.equal(count, 1);
					SNode.signals.nodeRemoved.dispatch(snode);
					setTimeout(test, 10);
				}else{
					done(err);
				}
			});		

			function test(){
				Asset.findOne({
					'uuid': 'aaaaa',
					'type': 'geo'
				}, function onEnd(err, asset){
					if(!err){
						assert.equal(asset, undefined);
						done();
					}else{
						done(err);
					}
				});
			}					
		});

		after(function(done){
			Asset.remove({
				'uuid': 'aaaaa',
				'type': 'geo'
			}, function(err){
				if(!err){
					done();
				}else{
					done(err);
				}
			});
		});
	});

	describe('update', function(){
		var asset = new Asset({
			"uuid": "bbbbb",
			"path": "aa",
			"name": "aa",
			"type": "geo",
			"count": 1
		});
		before(function(done){
			asset.save(function(err){
				if(!err){
					done();
				}else{
					done(err);
				}
			});
		});
		it('should be updated when a newAsset is provided', function(done) {
			request('http://www.google.com', function (error, response, body) {
			  if (!error && response.statusCode === 200) {
			    console.log(body); // 打印google首页
			  }
			});
		});
	});
});
describe('ImgAsset', function(){
	describe('count', function(){
		var asset = new Asset({
			"uuid": "bbbbb",
			"path": "aa",
			"name": "aa",
			"type": "img",
			"count": 1
		});

		before(function(done){
			asset.save(function(err){
				if(!err){
					done();
				}else{
					done(err);
				}
			});
		});

		it('should increase by 1 when a new ref from snode added', function(done){
			var snode = new SNode({
				data: "{\"assetId\":\"bbbbb\"}",
				uuid: "a",
				versionNum: "1",
				children: [],
				type: "texture"
			});
			var count = asset.count;

			SNode.signals.nodeAdded.dispatch(snode);
			setTimeout(test, 10);

			function test(){
				Asset.findOne({
					'uuid': 'bbbbb',
					'type': 'img'
				}, function onEnd(err, asset){
					if(!err){
						assert.equal(asset.count, count+1);
						done();
					}else{
						done(err);
					}
				});
			}
		});

		it('should decrease by 1 when a ref from snode removed, and the count>2', function(done) {
			var snode = new SNode({
				data: "{\"assetId\":\"bbbbb\"}",
				uuid: "a",
				versionNum: "1",
				children: [],
				type: "texture"
			});
			var count;
			
			Asset.findOne({
				'uuid': 'bbbbb',
				'type': 'img'
			}, function onEnd(err, asset){
				if(!err){
					count = asset.count;
					SNode.signals.nodeRemoved.dispatch(snode);
					setTimeout(test, 10);
				}else{
					done(err);
				}
			});

			function test(){
				Asset.findOne({
					'uuid': 'bbbbb',
					'type': 'img'
				}, function onEnd(err, asset){
					if(!err){
						assert.equal(asset.count, count-1);
						done();
					}else{
						done(err);
					}
				});
			}
		});

		it('should be removed when the count is decreased to 0', function(done){
			var snode = new SNode({
				data: "{\"assetId\":\"bbbbb\"}",
				uuid: "a",
				versionNum: "1",
				children: [],
				type: "texture"
			});

			var count;
			
			Asset.findOne({
				'uuid': 'bbbbb',
				'type': 'img'
			}, function onEnd(err, asset){
				if(!err){
					count = asset.count;
					assert.equal(count, 1);
					SNode.signals.nodeRemoved.dispatch(snode);
					setTimeout(test, 10);
				}else{
					done(err);
				}
			});		

			function test(){
				Asset.findOne({
					'uuid': 'bbbbb',
					'type': 'img'
				}, function onEnd(err, asset){
					if(!err){
						assert.equal(asset, undefined);
						done();
					}else{
						done(err);
					}
				});
			}
		});	
	});
});