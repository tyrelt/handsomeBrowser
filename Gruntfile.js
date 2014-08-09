module.exports = function(grunt) {
    'use strict';
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        express: {
            all: {
                options: {
                    port: 9000,
                    hostname: 'localhost',
                    livereload: true,
                    bases: './'
                }
            }
        },
        open: {
            all: {
                path: 'http://localhost:<%= express.all.options.port%>'
            }
        },
        watch: {
            all: {
                files: [
                    'handsomeBrowser.js',
                    'popup.html',
                    // 'styles.css'
                ],
                tasks: [
                    'jshint',
                    'htmlhint',
                ],
                // options: {
                //     livereload: true
                // }
            }
        },
        jshint: {
            files: ['handsomeBrowser.js']
        },
        htmlhint: {
            build: {
                options: {
                    'tag-pair': true,
                    'tagname-lowercase': true,
                    'attr-lowercase': true,
                    'attr-value-double-quotes': true,
                    'doctype-first': true,
                    'spec-char-escape': true,
                    'id-unique': true,
                    'head-script-disabled': true,
                    'style-disabled': true
                },
                src: ['popup.html']
            }
        }
    });
grunt.registerTask('default', [
    'jshint',
    'htmlhint',
    //'express',
    //'open', 
    'watch'
    ]);
};