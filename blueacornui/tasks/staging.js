/**
* @package     BlueAcorn/GreenPistachio
* @version     4.5.0
* @author      Blue Acorn, Inc. <code@blueacorn.com>
* @copyright   Copyright © 2016 Blue Acorn, Inc.
*/

module.exports = function(grunt) {
    'use strict';

    var _ = require('underscore'),
        path = require('path'),
        themes = require('../configs/themes'),
        configDir = '../configs';

    grunt.registerTask('staging', 'Staging Theme Compilation', function() {
        if(arguments[0]) {
            grunt.task.run('clean:' + arguments[0] + 'Prepare');
            grunt.task.run('sass:' + arguments[0] + 'Production');
            grunt.task.run('postcss:' + arguments[0] + 'Production');
            grunt.task.run('jshint:' + arguments[0]);
            if(arguments[0].jsdirs.length > 0) {
                _.each(arguments[0].jsdirs, function(jsdir){
                    grunt.task.run('copy:' + arguments[0] + 'BuildFallback' + jsdir);
                    grunt.task.run('copy:' + arguments[0] + 'BuildTheme' + jsdir);
                });
            }
            grunt.task.run('uglify:' + arguments[0] + 'Production');
            grunt.task.run('concurrent:' + arguments[0] + 'UseBanner');
            grunt.task.run('clean:' + arguments[0] + 'Prepare');
            grunt.task.run('shell:cache');
        }else{
            _.each(themes, function(theme, name){
                if(theme.grunt) {
                    grunt.task.run('clean:' + name + 'Prepare');
                    grunt.task.run('sass:' + name + 'Production');
                    grunt.task.run('postcss:' + name + 'Production');
                    grunt.task.run('jshint:' + name);
                    if(theme.jsdirs.length > 0) {
                        _.each(theme.jsdirs, function(jsdir){
                            grunt.task.run('copy:' + name + 'BuildFallback' + jsdir);
                            grunt.task.run('copy:' + name + 'BuildTheme' + jsdir);
                        });
                    }
                    grunt.task.run('uglify:' + name + 'Production');
                    grunt.task.run('concurrent:' + name + 'UseBanner');
                    grunt.task.run('clean:' + name + 'Prepare');
                }
            });
            grunt.task.run('shell:cache');
        }

    });
};
