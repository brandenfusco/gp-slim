/**
* @package     BlueAcorn/GreenPistachio
* @version     4.5.0
* @author      Blue Acorn, Inc. <code@blueacorn.com>
* @copyright   Copyright © 2016 Blue Acorn, Inc.
*/

'use strict';

module.exports = {
    default: {
        grunt: false,
        area: 'frontend',
        name: 'base/default',
        locale: 'en_US',
        theme_fallback: []
    },
    rwd: {
        grunt: false,
        area: 'frontend',
        name: 'rwd/default',
        locale: 'en_US',
        files: [
            'styles',
            'styles-ie8',
            'madisonisland',
            'madisonisland-ie8',
            'scaffold-forms'
        ],
        dsl: 'scss',
        bower_fallback: [
            'bower_components/compass-mixins/lib', 'bower_components/sass-list-maps/_sass-list-maps.scss'
        ],
        theme_fallback: []
    },
    enterprise: {
        grunt: false,
        area: 'frontend',
        name: 'rwd/enterprise',
        locale: 'en_US',
        files: [
            'enterprise',
            'enterprise-ie8'
        ],
        dsl: 'scss',
        bower_fallback: [
            'bower_components/compass-mixins/lib', 'bower_components/sass-list-maps/_sass-list-maps.scss'
        ],
        theme_fallback: ['rwd']
    },
    site: {
        grunt: true,
        area: 'frontend',
        name: 'blueacorn/site',
        locale: 'en_US',
        dev_url: 'gp.dev',
        files: [
            'blueacorn-super-selects',
            'fonts',
            'madisonisland',
            'styleguide',
            'styles-account',
            'styles-cart',
            'styles-category',
            'styles-checkout',
            'styles-cms',
            'styles-product',
            'styles'
        ],
        jsdirs: [
            'blueacorn',
            'development'
        ],
        dsl: 'scss',
        bower_fallback: [
            'bower_components/compass-mixins/lib', 'bower_components/sass-list-maps/_sass-list-maps.scss',
        ],
        theme_fallback: ['enterprise','rwd']
    }
    // This is an example object that you would add for a new theme that was setup to rollback to blueacorn/site
    // test: {
    //     grunt: true,
    //     area: 'frontend',
    //     name: 'blueacorn/test',
    //     locale: 'en_US',
    //     files: [
    //         'test'
    //     ],
    //     jsdirs: [
    //         'blueacorn'
    //     ],
    //     dsl: 'scss',
    //     bower_fallback: [
    //         'bower_components/compass-mixins/lib', 'bower_components/sass-list-maps/_sass-list-maps.scss',
    //     ],
    //     theme_fallback: ['site','enterprise','rwd']
    // }
};
