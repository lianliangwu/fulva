"use strict";
/**
 * Module dependencies.
 */

var express = require('express');
var app = express();
var routes = require('./routes');
var rc = require('./routes/revisionControl');
var am = require('./routes/assetManage');
var modelManager = require('./routes/modelManager.js');
var user = require('./routes/user');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var movieControl = require('./routes/movieControl');
var imageControl = require('./routes/imageControl');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser({limit: '1000mb'}));
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({secret: '1234567890QWERTY'}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'test')));


app.get('/', user.requireUser(), routes.index);
app.post('/addScene', routes.addScene);
app.post('/removeScene', routes.removeScene);
app.get('/getAllScenes', routes.getAllScenes);

app.post('/addModel', modelManager.addModel);
app.post('/removeModel', modelManager.removeModel);
app.get('/getModels', modelManager.getModels);
//app.get('/getTree', modelManager.getTree);
app.get('/getTreeTest', function (req, res) {res.render('getTreeTest');});
app.get('/getTreeNodes', modelManager.getTreeNodes);
app.post('/editTreeNode', modelManager.editTreeNode);
app.post('/removeTreeNode', modelManager.removeTreeNode);
app.post('/addTreeNode', modelManager.addTreeNode);
app.get('/getModels2', modelManager.getModels2);

app.get('/login', function (req, res) {res.render('login');});
app.post('/login', user.login);
app.get('/register', function (req, res) {res.render('register');});
app.post('/register', user.createUser);

app.get('/addUser', function (req, res) {res.render('addUser');});
app.post('/addUser', user.createUser);
app.post('/createGroup', user.createGroup);
app.post('/removeGroup', user.removeGroup);
app.get('/getAllGroups', user.getAllGroups);
app.get('/getGroupByName', user.getGroupByName);
app.post('/addUserToGroup', user.addUserToGroup);
app.post('/removeUserFromGroup', user.removeUserFromGroup);

app.get('/getAsset', am.getAsset);
app.post('/addImgAsset', am.addImgAsset);
app.get('/getImgAsset', am.getImgAsset);
app.post('/updateImgAsset', am.updateImgAsset);
app.post('/removeImgAsset', am.removeImgAsset);
app.get('/listImgAsset', am.listImgAsset);
app.post('/addGeoAsset', am.addGeoAsset);
app.get('/getGeoAsset', am.getGeoAsset);
app.post('/updateGeoAsset', am.updateGeoAsset);
app.post('/removeGeoAsset', am.removeGeoAsset);
app.get('/listGeoAsset', am.listGeoAsset);
app.post('/updateSnapshot', am.updateSnapshot);
app.get('/searchAssets', am.searchAssets);


app.post('/addDirectory', am.addDirectory);
app.post('/removeDirectory', am.removeDirectory);
app.get('/listDirContent', am.listDirContent);
app.post('/updateDirectory', am.updateDirectory);
app.get('/getDirTree', am.getDirTree);

app.get('/getAllVersions', rc.getAllVersions);
app.get('/retrieve', rc.retrieve);
app.post('/commit', rc.commit);
app.get('/merge', rc.merge);
app.post('/removeVersion', rc.removeVersion);
app.get('/checkout', rc.checkout);
app.post('/addBranch', rc.addBranch);
app.post('/removeBranch', rc.removeBranch);
app.get('/getBranches', rc.getBranches);
app.post('/addTag', rc.addTag);
app.post('/removeTag', rc.removeTag);
app.get('/getTags', rc.getTags);
app.get('/getRHG', rc.getVersionHistory);

// video
app.get('/vedio', function (req, res) {res.render('vedio_index');});
app.post('/upload', movieControl.upload);
app.get('/download', movieControl.download);

app.get('/getMovieTreeNodes', movieControl.getTreeNodes);
app.post('/editMovieTreeNode', movieControl.editTreeNode);
app.post('/removeMovieTreeNode', movieControl.removeTreeNode);
app.post('/addMovieTreeNode', movieControl.addTreeNode);
app.get('/getMovieModels2', movieControl.getModels2);

app.get('/semantic_graph', function (req, res) {res.render('semantic_graph');});

// image
app.get('/image', function (req, res) {res.render('image_index');});
app.get('/searchImage', imageControl.searchImage);
app.post('/searchByText', imageControl.searchByText);
// app.post('/searchVideo', imageControl.searchVideo);

// synchronus operation
io.on('connection', function(socket){
  socket.on('operation', function(op){
    io.emit('operation', op);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

