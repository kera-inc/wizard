var exec = require('child_process').exec
  , spawn = require('child_process').spawn
  , fs = require('fs')
  , Builder = require('component-builder');

function compileBuild(callback) {
  console.log('Compiling build');
  var builder = new Builder('');

  builder.build(function(err, obj) {
    if (err) {
      console.log(err);
    } else {
      var dirname = __dirname + '/../build';
      var filename = dirname + '/build.js';
      var lib = obj.require + obj.js;

      fs.mkdir(dirname, function(err) {
        if (err && err.code != 'EEXIST') {
          console.log(err);
        } else {
          fs.writeFile(filename, lib,function(err) {
            if (err) {
              console.log(err);
            } else {
              callback();
            }
          });
        }
      });
    }
  });
}

function runFrontEndTests(callback) {
  console.log('Running front-end tests');

  var phantom_bin = "PHANTOMJS_BIN=" + __dirname + "/../node_modules/phantomjs/lib/phantom/bin/phantomjs";
  var testacular = __dirname + "/../node_modules/testacular/bin/testacular";
  var browsers = (process.env.CI) ? 'PhantomJS' : 'Chrome';
  var options = '--single-run --browsers=' + browsers;
  var command = phantom_bin + ' ' + testacular + ' start ' + __dirname + '/../test/testacular.conf.js ' + options;

  exec(command, function(err, stdout, stderr) {
    console.log(stdout);

    callback(err);
  });
}

var server;

function startServer() {
  var http_server_bin = __dirname + '/../node_modules/http-server/bin/http-server';
  var path = __dirname + '/../';
  var options = '-p 8000';

  server = spawn(http_server_bin, [path, options]);

  server.stdout.on('data', function(data) {
    console.log('server: ' + data);
  });

  server.stderr.on('data', function(data) {
    console.log('server error: ' + data);
  });
}

function stopServer() {
  server.kill();
}

compileBuild(function() {
  startServer();
  runFrontEndTests(function(err) {
    stopServer();

    if (err) {
      console.log(err);
      process.exit(1);
    } else {

      process.exit(0);
    }
  });
});
