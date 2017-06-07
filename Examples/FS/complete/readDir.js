var fs = require('fs');
var Path = require('path');
var colors = require('colors');

fs.readdir(process.argv[2],function(err,files){
    if(err){
        console.log('An Error has occured');
        return;
    }

    files.forEach(function(file){
        var path = Path.join(process.argv[2],file);
        
        fs.stat(path,function(err,stat){
            if(err){
                console.log('An Error has occured');
            }
            else{
                if(stat.isDirectory()){
                    console.log(path.red);
                }
                else{
                    console.log(path.green);
                }
            }
        });


    })

});
