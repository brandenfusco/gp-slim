/**
 * @package     Blueacorn\\ChangeText
 * @version     1.0
 * @author      Blue Acorn <code@blueacorn.com>
 * @copyright   Copyright © 2015 Blue Acorn.
 */

;(function ($, window, document, undefined) {

    var pluginName = "textChange";

    // The actual plugin constructor
    function ChangeText(element) {
        this.$element = $(element);
        this.init();
    }

    /**
     * Initiation of plugin object scope.
     * Will accept an element
     *
     * @param element
     *  jQuery element to act upon
     */
    ChangeText.prototype = {

        init: function() {
            this.addDefaultPropToElement();
        },

        addDefaultPropToElement: function(){
            this.$element.attr('data-text', this.$element.text().trim());
        },

        updateText: function(text){
            if(!text && typeof this.$element.data('text') !== "undefined"){
                this.$element.text(this.$element.data('text'));
            }
            this.$element.text(text);
        }
    };

    $.fn[pluginName] = function() {
        return new ChangeText(this);
    };

})(jQuery, window, document);