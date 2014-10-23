// spawn a child process and execute multiple shell command

exports.exec = function(cmd,cwd, cb){
    // this would be way easier on a shell/bash script :P
    var child_process = require('child_process');
    var parts = cmd.split(/\s+/g);
    var params = {
       stdio: 'inherit'
    };
    if (cwd) params.cwd = cwd;
    var p = child_process.spawn(parts[0], parts.slice(1), params);
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