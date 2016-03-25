/**
* @package     BlueAcorn/GreenPistachio
* @version     
* @author      Blue Acorn, Inc. <code@blueacorn.com>
* @copyright   Copyright © 2016 Blue Acorn, Inc.
*/

'use strict';

module.exports = {
    dev: {
        options: {
            dest: '../.git/hooks'
        },
        'post-merge': {
            taskNames: 'compile'
        },
        'post-checkout': {
            taskNames: 'compile'
        }
    }
};
