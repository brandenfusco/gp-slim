/**
* @package     BlueAcorn/GreenPistachio
* @version     4.4.0
* @author      Blue Acorn, Inc. <code@blueacorn.com>
* @copyright   Copyright © 2016 Blue Acorn, Inc.
*/

'use strict';

var combo  = require('./combo'),
    themes = require('./themes'),
    _      = require('underscore');

var themeOptions = {};

_.each(themes, function(theme, name) {
    if(theme.grunt) {
        themeOptions[name + 'Dev'] = {
            files: [{
                expand: true,
                cwd: combo.autopath(name, 'skin') + 'src/',
                src: ['**/*.svg'],
                dest: combo.autopath(name, 'skin') + 'images/'
            }]
        };
    }
});

var svgminOptions = {
    options: {
        plugins: [
            {
                removeViewBox: false
            },{
                removeUselessStrokeAndFill: false
            }
        ]
    }
};

module.exports = _.extend(themeOptions, svgminOptions);
