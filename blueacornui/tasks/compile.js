/**
* @package     BlueAcorn/GreenPistachio
* @version     4.4.0
* @author      Blue Acorn, Inc. <code@blueacorn.com>
* @copyright   Copyright © 2016 Blue Acorn, Inc.
*/

module.exports = function(grunt) {
    'use strict';

    var _ = require('underscore'),
        path = require('path'),
        themes = require('../configs/themes'),
        configDir = '../configs',
        helper = require('./helper');

    grunt.registerTask('compile', 'Theme Compilation', function() {
        if(arguments[0]) {
            helper.runTasks(arguments[0], 'compile', grunt);
            grunt.task.run('shell:cache');
        }else{
            _.each(themes, function(theme, name){
                if(theme.grunt) {
                    helper.runTasks(name, 'compile', grunt);
                }
            });
            grunt.task.run('shell:cache');
        }
    });
};
