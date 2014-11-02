//make spawn can be used in windows
// borrowd from npm win-spawn<https://github.com/ForbesLindesay/win-spawn>
var cSpawn = require('child_process').spawn;
var os = require('os').type();
function spawn(command, args, options) {
  if (os === 'Windows_NT') {
    command = command.replace(/\//g, '\\');
    
    if (command === 'rm') {
      command = 'rmdir';
      if (args[0] === '-rf' || args[0] == '-fr') {
        args[0] = '/q';
        args.unshift('/s');
      }
      if (args[0] === '-f') {
        args[0] = '/q';
      }
      if (args[0] === '-r') {
        args[0] = '/s';
      }
    }
    args = args || [];
    options = options || {};
    var match, matchA;
    if (matchA = /((?:[A-Z_]+\=[^ \=]+ )+)?([^\r\n]+)/.exec(command)) {
      try {
        var file = require('fs').readFileSync(matchA[2], 'utf8');
        if (match = /\#\!\/usr\/bin\/env ([^\r\n]+)/.exec(file)) {
          args.unshift(matchA[2]);
          command = (matchA[1] || '') + match[1];
        }
      } catch (ex) { }
    }

    if (match = /((?:[A-Z_]+\=[^ \=]+ )+)([^\r\n]+)/.exec(command)) {
      command = match[2];

      options.env = options.env || shallowClone(process.env);

      var env = match[1].split(' ');
      env.forEach(function (v) {
        v = v.split('=');
        if (v.length === 2) {
          options.env[v[0]] = v[1];
        }
      });
    }

    args.unshift(command);
    args.unshift('/c');
    args.unshift('/d');
    command = 'cmd';
  }
  return cSpawn(command, args, options);
}

function shallowClone(obj) {
  var out = {};
  Object.keys(obj)
    .forEach(function (key) {
      out[key] = obj[key];
    });
  return out;
}


// spawn a child process and execute multiple shell command

exports.exec = function(cmd,cwd, cb){
    // this would be way easier on a shell/bash script :P
    //var child_process = require('child_process');
    var parts = cmd.split(/\s+/g);
    var params = {
       stdio: 'inherit'
    };
    if (cwd) params.cwd = cwd;
    var p = spawn(parts[0], parts.slice(1), params);
    p.on('exit', function(code){
        var err = null;
        if (code) {
            err = new Error('command "'+ cmd +'" exited with wrong status code "'+ code +'"');
            err.code = code;
            err.cmd = cmd;
        }
        if (cb) cb(err);
    });
};
 

 
// execute multiple commands in series
exports.series = function(cmds, cb){
    var execNext = function(){
        var cmdObj = cmds.shift();
        exports.exec(cmdObj.cmd, cmdObj.cwd, function(err){
            if (err) {
                cb(err);
            } else {
                if (cmds.length) execNext();
                else cb(null);
            }
        });
    };
    execNext();
};