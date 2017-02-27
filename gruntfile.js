var path = require('path');
module.exports = function(grunt) {
  "use strict";

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-gitinfo');
  grunt.loadNpmTasks("grunt-ts");

  var now = new Date().getTime();

  grunt.initConfig({
    ts: {
      app: {
        files: [{
          src: ["typescript/*.ts", "!typescript/.baseDir.ts", "!typescript/_all.d.ts"],
          dest: "./app"
        }],
        options: {
          module: "commonjs",
          noLib: true,
          target: "es5",
          sourceMap: false
        }
      }
    },
    gitinfo: {},
    copy: {
      main: {
        files: [
          {expand: true, src: 'app/**', dest: '<%= dirs.deployFolder %>'},
          {expand: true, src: 'static/**',  dest: '<%= dirs.deployFolder %>'},
          {expand: true, src: 'views/**',  dest: '<%= dirs.deployFolder %>'},
          {expand: true, src: ['init.js', 'package.json', 'npm-shrinkwrap.json'], dest: '<%= dirs.deployFolder %>'}
        ]
      }
    },
    dirs: {
      deployFolder: __dirname  + '/deploy/' + now + '-<%= gitinfo.local.branch.current.shortSHA %>/',
      deployZipFile: __dirname  + '/deploy/' + now + '-<%= gitinfo.local.branch.current.shortSHA %>server.zip'
    },
    exec: {
      echo_platform: {
        cmd: function() {
          var platform = process.platform;
          return 'echo platform: ' + platform;
        }
      },
      zipMac: {
        cwd: '<%= dirs.deployFolder %>',
        // Zip is built in to Mac.
        cmd: 'zip -r <%= dirs.deployZipFile %> . -x "*.DS_Store"'
      },
      zipWin: {
        // 7z
        cwd: '<%= dirs.deployFolder %>',
      }
    }
  });

  grunt.registerTask('zipAWS', 'Zip deploymenty bundle', function() {
    grunt.task.run('exec:echo_platform');
    var platform = process.platform;
    if (platform === 'darwin') {
      grunt.task.run('exec:zipMac');
    } else if (platform === 'win32') {
      console.log('TODO: Zip on windows.');
    } else {
      console.log('Unsupported platform!');
    }
  });

  grunt.registerTask('logSHA', 'Log Git SHA', function() {
    var git = grunt.config('gitinfo');
    console.log('Zipping commit: ' + git.local.branch.current.shortSHA);
  });

  grunt.registerTask('zipForDeploy', 'Queues deploy tasks', function() {
    grunt.task.run('gitinfo');
    grunt.task.run('logSHA');
    grunt.task.run('copy');
    grunt.task.run('zipAWS');
  });

  grunt.registerTask("default", [
    "ts"
  ]);
};
