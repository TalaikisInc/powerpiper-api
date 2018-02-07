module.exports = function(grunt) {
    "use strict"
  
    grunt.initConfig({
      ts: {
        app: {
          files: [{
            src: [
                "src/\*\*/\*.ts",
                "src/\*.ts"
            ],
            dest: "./dist"
          }],
          options: {
            module: "commonjs",
            target: "es6",
            sourceMap: false,
            rootDir: "src",
            strict: true,
            experimentalDecorators: true,
            emitDecoratorMetadata: true,
            strictNullChecks: false,
            strictPropertyInitialization: false,
            strictNullChecks: false
          }
        }
      },
      watch: {
        ts: {
          files: [
              "src/\*\*/\*.ts",
              "src/\*.ts"
            ],
          tasks: ["ts"]
        }
      }
    })
  
    grunt.loadNpmTasks("grunt-contrib-watch")
    grunt.loadNpmTasks("grunt-ts")
  
    grunt.registerTask("default", [
      "ts"
    ])
  
  }
