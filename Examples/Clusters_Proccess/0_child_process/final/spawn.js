var spawn = require('child_process').spawn;
// Create a child process
var child = spawn('tail', 
    ['-f', '/var/log/system.log']);

child.stdout.on('data', 
    function (data) {
        console.log('tail output: ' + data);
    }
);