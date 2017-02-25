module.exports = function(grunt) {
  "use strict";

  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-copy');
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
          {src: ['init.js', 'package.json', 'npm-shrinkwrap.json'], dest: '<%= dirs.deployFolder %>'}
        ]
      }
    },
    compress: {
      main: {
        options: {
          archive: '<%= dirs.deployZipFile %>',
          mode: 'zip'
        },
        files: [
          {expand: true, cwd: '<%= dirs.deployFolder %>', src: '**'}
        ]
      }
    },
    dirs: {
      deployFolder: './deploy/' + now +
          '-<%= gitinfo.local.branch.current.shortSHA %>/',
      deployZipFile: './deploy/' + now + '-<%= gitinfo.local.branch.current.shortSHA %>server.zip'
    }
  });

  grunt.registerTask('logSHA', 'Log Git sha', function() {
    var git = grunt.config('gitinfo');
    console.log('Zipping commit: ' + git.local.branch.current.shortSHA);
  });

  grunt.registerTask('zipForDeploy', 'Queues deploy tasks', function() {
    grunt.task.run('gitinfo');
    grunt.task.run('logSHA');
    grunt.task.run('copy');
    grunt.task.run('compress');
  });

  grunt.registerTask("default", [
    "ts"
  ]);
};
