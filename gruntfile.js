module.exports = function(grunt) {
  "use strict";

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
    }
  });

  grunt.loadNpmTasks("grunt-ts");

  grunt.registerTask("default", [
    "ts",
  ]);
};
