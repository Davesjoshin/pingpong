'use strict';

module.exports = function(grunt) {
    require('time-grunt')(grunt);

    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        assets: grunt.file.readJSON('server/config/assets.json'),
        watch: {
            js: {
                files: ['gruntfile.js', 'server.js', 'server/**/*.js', 'public/js/**', 'test/**/*.js'],
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            html: {
                files: ['public/views/**', 'server/views/**'],
                options: {
                    livereload: true
                }
            },
            css: {
                files: ['public/system/assets/css/**'],
                tasks: ['csslint'],
                options: {
                    livereload: true
                }
            },
            scss: {
                files: ['public/system/assets/scss/**'],
                tasks: ['sass:dev'],
                options: {
                    livereload: false
                }
            }
        },
        jshint: {
            all: {
                src: ['gruntfile.js', 'server.js', 'server/**/*.js', 'public/js/**', 'test/**/*.js', '!test/coverage/**/*.js'],
                options: {
                    jshintrc: true
                }
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            production: {
                files: '<%= assets.js %>'
            }
        },
        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            all: {
                src: ['public/css/**/*.css']
            }
        },
        cssmin: {
            combine: {
                files: '<%= assets.css %>'
            }
        },
        sass: {
            dist: {
                files: {
                    'public/system/assets/css/main.css': 'public/system/assets/scss/main.scss'
                }
            },
            dev: {
                options: {
                    sourceComments: 'map'
                },
                files: {
                    'public/system/assets/css/main.css': 'public/system/assets/scss/main.scss'
                }
            }
        },
        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    args: [],
                    ignore: ['public/**'],
                    ext: 'js,html',
                    nodeArgs: ['--debug'],
                    delayTime: 1,
                    env: {
                        PORT: require('./server/config/config').port
                    },
                    cwd: __dirname
                }
            }
        },
        concurrent: {
            tasks: ['nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        },
        mochaTest: {
            options: {
                reporter: 'spec',
                require: 'server.js'
            },
            src: ['test/mocha/**/*.js']
        },
        env: {
            test: {
                NODE_ENV: 'test'
            }
        },
        karma: {
            unit: {
                configFile: 'test/karma/karma.conf.js'
            }
        },
        clean: ['public/build'],
        copy: {
            main: {
                files: [
                  // Copy over fonts to the build directory
                  {expand: true, flatten: true, src: ['public/system/assets/fonts/**'], dest: 'public/build/fonts'},
                ]
            }
        }
    });

    //Load NPM tasks
    require('load-grunt-tasks')(grunt);

    //Making grunt default to force in order not to break the project.
    grunt.option('force', true);

    //Default task(s).
    if (process.env.NODE_ENV === 'production') {
        grunt.registerTask('default', ['clean', 'jshint', 'sass', 'csslint', 'cssmin', 'uglify', 'copy']);
    } else {
        grunt.registerTask('default', ['clean', 'jshint', 'sass', 'csslint', 'concurrent']);
    }

    //Test task.
    grunt.registerTask('test', ['clean', 'env:test', 'mochaTest', 'karma:unit']);
};
