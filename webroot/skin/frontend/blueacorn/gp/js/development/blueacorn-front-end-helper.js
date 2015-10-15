/**
 * @package     Blueacorn/FrontEndDevelopmentHelper
 * @version     1.0
 * @author      Blue Acorn <code@blueacorn.com>
 * @copyright   Copyright © 2015 Blue Acorn.
 */

function FrontEndDevelopmentHelper(options) {
    this.init(options);
}

;(function($, ba){

    FrontEndDevelopmentHelper.prototype = {
        init: function (options) {
            this.settings = {
                'moduleName': 'FrontEndDevelopmentHelper',
                'viewportElement': {
                    'id': 'viewport-width-helper',
                    'position': 'fixed',
                    'bottom': '0',
                    'left': '50%',
                    'zIndex': '9999',
                    'color': '#fff',
                    'padding': '0 7px',
                    'background': '#0077c6',
                    'fontSize': '12px',
                    'lineHeight': '20px',
                    'textAlign': 'center',
                    'height': '20px',
                }
            };

            // Overrides the default settings
            ba.overrideSettings(this.settings, options);

            // Start the debugger
            ba.setupDebugging(this.settings);

            this.setHelperElement();
            this.updateHelperElement();
            this.setObservers();
        },

        setHelperElement: function() {
            var self = this;
            $('body').append($('<div/>',{id: self.settings.viewportElement.id}));
        },

        updateHelperElement: function() {
            var self = this;

            self.setHelperStyles();
            self.setHelperContent();
            self.centerHelper();

        },

        setHelperStyles: function() {
            var self = this;

            $('#' + self.settings.viewportElement.id).css({
                "position": self.settings.viewportElement.position,
                "bottom": self.settings.viewportElement.bottom,
                "left": self.settings.viewportElement.left,
                "z-index": self.settings.viewportElement.zIndex,
                "color": self.settings.viewportElement.color,
                "padding": self.settings.viewportElement.padding,
                "background-color": self.settings.viewportElement.background,
                "font-size": self.settings.viewportElement.fontSize,
                "line-height": self.settings.viewportElement.lineHeight,
                "text-align": self.settings.viewportElement.textAlign,
                "height": self.settings.viewportElement.height,
            });
        },

        setHelperContent: function() {
            var self = this,
                currentPageContent;

            $('#' + self.settings.viewportElement.id).html('vp: ' + $('body').width() + self.getCurrentPage() + self.getTouchSupport()
            );
        },

        getCurrentPage: function() {
            return ba.Page ? ' | page: ' + ba.Page.identifyPage() : '';
        },

        getTouchSupport: function() {
            return $('html').hasClass('touch') ? ' | touch' : ' | no-touch';
        },

        centerHelper: function() {
            var self = this;

            $('#' + self.settings.viewportElement.id).css('margin-left', self.getElementMargin());
        },

        setObservers: function() {
            var self = this;

            $(window).on('resize', function() {
                self.updateHelperElement();
            });
        },

        getElementMargin: function() {
            var self = this,
                viewportElement = $('#' + self.settings.viewportElement.id);

            return (viewportElement.width() - ((viewportElement.width()/2)*3)) + 'px';
        },
    };

    /**
     * The parameter object is optional.
     * Must be an object.
     */
     if(mageConfig["styleguide/development/enable_development"]){
        $(document).on('baCoreReady', function() {
            ba.FrontEndDevelopmentHelper = new FrontEndDevelopmentHelper({});
        });

     }
})(jQuery, ba);