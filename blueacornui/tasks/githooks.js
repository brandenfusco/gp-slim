/**
* @package     BlueAcorn/GreenPistachio
* @version     4.4.0
* @author      Blue Acorn, Inc. <code@blueacorn.com>
* @copyright   Copyright © 2016 Blue Acorn, Inc.
*/

module.exports = function(grunt) {
    'use strict';

    grunt.registerTask('dev-githooks', 'Evaluate Theme Javascript', function() {
        grunt.task.run('githooks:dev');
    });
};
