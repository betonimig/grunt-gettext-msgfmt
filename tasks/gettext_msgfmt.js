/*
 * grunt-gettext-msgfmt
 * https://github.com/betonimig/grunt-gettext-msgfmt
 *
 * Copyright (c) 2017 Ildar Migranov
 * Licensed under the MIT license.
 */

'use strict';
var exec = require('child_process').exec;

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('gettext_msgfmt', 'Compile .po files with msgfmt.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      verbose: true,
      destDir: "",
      // Operation mode
      mode: false
    });
    var verbose = !options.verbose?"":" --verbose";
    var mode = !options.mode?"":" --"+options.mode;
    var command_base = 'msgfmt' + verbose + mode;
    var done = this.async();

    if (!options.mode) {
        var tasks = [];
        // Iterate over all specified file groups.
        this.files.forEach(function(file) {
          var inputFile = file.src[0];
          if (!inputFile || !grunt.file.exists(inputFile)) {
            grunt.log.warn('Source file "' + inputFile + '" not found.');
            return false;
          }
          if (!grunt.file.exists(file.dest)) {
            grunt.file.write(file.dest, '');
          }
          var command = command_base + ' -o ' + file.dest + ' ' + inputFile;
          grunt.log.writeln('Run: '+command);
          tasks.push((function(file) {
            return new Promise((resolve, reject)=>{
              exec(command, function(error, stdout, stderr){
                if (error) {
                  grunt.verbose.writeln('stderr: ' + stderr);
                  reject(error);
                } else {
                  grunt.log.writeln('File "' + file.dest + '" created.');
                  resolve(stdout);
                }
              });
            });
          })(file));
        });
        Promise.all(tasks)
          .then(done, err=>grunt.log.error(err));
    } else {
      var destDir = options.destDir;
      if (!grunt.file.exists(destDir)) {
        grunt.file.mkdir(destDir);
      }
      var inputFile = this.files[0].src[0];
      if (!inputFile || !grunt.file.exists(inputFile)) {
        grunt.log.warn('Source file "' + inputFile + '" not found.');
        return false;
      }
      var outFile = this.files[0].dest;
      var resourse = !options.resourse?"":" -r "+options.resourse;
      destDir = !options.destDir?"":" -d "+options.destDir;
      var locale = !options.locale?"":" -l "+options.locale;
      var command = command_base + ' -f' + resourse + destDir + locale +" "+ inputFile;
      grunt.log.writeln('Run: '+command);
      exec(command, function(error, stdout, stderr){
        if (error) {
          grunt.verbose.writeln('stderr: ' + stderr);
        } else {
          grunt.log.writeln('File "' + outFile + '" created.');
        }
        done(error);
      });
    }
  });

};
