/**
* @package     Blueacorn\BlueAcornCore
* @version     1.0
* @author      Blue Acorn <code@blueacorn.com>
* @copyright   Copyright © 2015 Blue Acorn.
*/

var ba;

function BlueAcornCore(options) {
    this.init(options);
}

;(function($){

    BlueAcornCore.prototype = {
        init: function (options) {
            this.settings = {
                'debug': false,
                'moduleName' : 'BlueAcornCore'
            };

            // Overrides the default settings
            this.overrideSettings(this.settings, options);

            // Start the debugger
            if (this.settings.debug === true) {
                this.setupDebugging(this.settings);
            }

            this.triggerCustomEvent();
        },

        /**
         * Takes default settings in object scope, and
         * merges the optional object passed in on initiation
         * of the class.
         */
        overrideSettings: function (settings, options) {
            if (typeof options === 'object') {
                settings = jQuery.extend(settings, options);
            }
        },

        setupDebugging: function (moduleSettings) {
            if(typeof moduleSettings === 'object'){
                this.watchConsole(moduleSettings.moduleName + ' Loaded!!!');
                this.watchConsole(moduleSettings);
            }
        },

        triggerCustomEvent: function() {
            $(document).on('ready', function(){
                $(document).trigger('baCoreReady');
            });
        },

        /**
         * Checks if the specified jQuery element exists.
         *
         * If regular HTML element is passed, will change into
         * jQuery selector for use in this function.
         *
         * @param $element - jQuery object
         * @returns {boolean}
         */
        checkForElement: function($element){
            if(!($element instanceof jQuery)){
                $element = jQuery($element);
            }
            return $element.length >= 1;
        },

        /**
         * Adds console log if degubbing is true
         * @param string
         */
        watchConsole: function (message) {
            if(!$('.ie9').length && typeof console !== "undefined" && this.settings.debug) {
                console.log(message);
            }
        },

        /**
         * Returns a function that will only be triggered once, after inactivity of (wait) ms
         * Ported from: http://underscorejs.org/docs/underscore.html
         *
         * @param func
         * @param wait
         * @param immediate
         * @returns {Function}
         */
        debounce: function (func, wait, immediate) {
            var timeout;

            return function() {
                var context = this,
                    args = arguments;

                var later = function() {
                    timeout = null;

                    if (!immediate) {
                        func.apply(context, args);
                    }
                };

                if (immediate && !timeout) {
                    func.apply(context, args);
                }

                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }
    };

    /**
     * The parameter object is optional.
     * Must be an object.
     */
    ba = new BlueAcornCore({
        "debug": mageConfig["styleguide/development/enable_development"] > 0 ? true : false
    });

})(jQuery);

// Deals with issues between jQuery & Prototype Event Triggering
// @source: http://stackoverflow.com/a/460709
Element.prototype.triggerEvent = function(eventName)
{
    if (document.createEvent)
    {
        var evt = document.createEvent('HTMLEvents');
        evt.initEvent(eventName, true, true);

        return this.dispatchEvent(evt);
    }

    if (this.fireEvent)
        return this.fireEvent('on' + eventName);
};
