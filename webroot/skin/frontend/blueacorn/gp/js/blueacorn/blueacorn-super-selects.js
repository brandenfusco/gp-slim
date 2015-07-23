/**
 * @package     Blueacorn/SuperSelects
 * @version     1.0
 * @author      Blue Acorn <code@blueacorn.com>
 * @copyright   Copyright © 2015 Blue Acorn.
 */

function SuperSelects(options) {
    this.init(options);
}

jQuery(document).ready(function($){

    SuperSelects.prototype = {

        /**
         * Override Settings & Execute Base Methods
         * @param  options key/value for Super Select Settings
         * @return DOM Manipulation for Select Elements
         */
        init: function (options) {
            this.settings = {
                'moduleName': 'SuperSelects',
                'displayMethod': 'show', //[show, fade, slide]
                'displayType': 'over', // [over, under, right, left, circle, overlay, fullscreen, thumbnail, fullthumb, rotate, custom],
                'typeArray': ['over', 'under', 'right', 'left', 'circle', 'overlay', 'fullscreen', 'thumbnail', 'fullthumb'],
                'truncate': true, // [true, false]
                'truncateAmount': 30, // [Numeric Value]
                'optionLimits': 10, // [Numeric Value]
                'imageType': "span", // [span, image],
                'htmlTag': $('html'),
                'selects': $('select'), // jQuery DOM Object Selector
                'smallSelects': $('#select-language, .toolbar select, .review-heading .pager select, .review-customer-index .pager select, .small-select'), // List of known Small Selects
                'smallClass': 'sm', // Class for Small Selects
                'blackList': ['.no-style'] //Black List for Selects that should not be styled, Array of classes to look for, not DOM selectors
            };

            // Overrides the default settings
            ba.overrideSettings(this.settings, options);

            // Start the debugger
            ba.setupDebugging(this.settings);

            this.setCustomEventObservers();
            this.createSuperSelect();
            this.unsetCustom();
            this.updateInternetExplorer();
        },

        /**
         * Set Custom Event Observers for Updating Form Elements
         * that may or may not be already setup.
         */
        setCustomEventObservers: function() {
            var self = this;

            // Watching update:selects, update:all & section:update Custom Events
            $(document).on('update:selects update:all section:update', function() {
                self.createSuperSelect();
                self.unsetCustom();
                self.updateInternetExplorer();
            });

        },

        /**
         * Initial Step for Creating Super Selects
         * @return DOM Manipulation for Select Elements
         */
        createSuperSelect: function() {
            var self = this,
                settings = self.settings;

            this.superSelectsBefore();

            // Start Iterating through Select Elements
            $.each(settings.selects, function(idx, select){
                var currentSelect = $(select),
                    selectOptions,
                    dynamicSelectOption;

                // Detects if the Super Select DOM Customizations alread
                // exist in the DOM.
                if($(this).siblings('.ba-select-box').length > 0) {
                    self.updateSuperSelectsShiv(currentSelect);
                    return;
                }

                self.setParentStyle(currentSelect);

                self.setSelectType(currentSelect);

                // Create the Super Select Elements
                self.createSuperSelectElement(currentSelect);

                // Add a class to the original select
                // to hide it.
                $(currentSelect).addClass('ba-select-input');

                if(self.settings.htmlTag.hasClass('touch') && (self.settings.htmlTag.hasClass('resp-mobile') || self.settings.htmlTag.hasClass('resp-tablet'))) {
                    $(currentSelect).height($('.ba-select-box').height());
                    $(currentSelect).parent().addClass('ba-select-container');
                }

                // Bind super select option to a
                // Variable and append list element.
                selectOptions = $(currentSelect).siblings('.ba-select-box').find('.ba-options');
                $(selectOptions).append('<ul></ul>');

                // Iterate through the select options to create the individual super select options & attach to Select
                self.buildOptionsObjects(currentSelect);

                // Create Individual List of Items for the Super Select
                dynamicSelectOption = 'buildSelectOption' + self.camelCaseCreator(self.getSelectType(currentSelect));

                $.each(currentSelect.optionsArray, function(idx) {
                    if($.isFunction(self[dynamicSelectOption])){
                        self[dynamicSelectOption](this, selectOptions, idx);
                    }else{
                        self.buildSelectOption(this, selectOptions, idx);
                    }
                });

                // Populate the Shiv
                self.updateSuperSelectsShiv(currentSelect);

                // Add Observers
                self.setSelectObservers(currentSelect);

            });
        },

        /**
         * Add Styling for Parent DIV or Wrap the Custom Select in
         * a DIV if the parent Element isn't an input-box already.
         * Also handles adding the Small Select class to the parent
         * if the custom select needs to be smaller.
         * @param currentSelect jQuery DOM Object of Select
         * Form Element
         */
        setParentStyle: function(currentSelect) {
            var self = this;

            if($(currentSelect).parent().hasClass('ba-select-container')) {
                return;
            }else{
                if($(currentSelect).parent().hasClass('input-box')){
                    $(currentSelect).parent().addClass('ba-select-container');
                }else{
                    $(currentSelect).wrap('<div class="input-box ba-select-container"></div>');
                }
            }

            if($(currentSelect).hasClass(self.settings.smallClass) && !$(currentSelect).parent().hasClass(self.settings.smallClass)) {
                $(currentSelect).parent().addClass(self.settings.smallClass);
            }

        },

        /**
         * Add Small Class to Selects that need to display smaller
         * for the User Interface
         * @return DOM Manipulation, Add SMALL Class to Element
         */
        superSelectsBefore: function() {
            var self = this;

            $(self.settings.smallSelects).addClass(self.settings.smallClass);
        },

        /**
         * Add Click & Option Observers to the Current Select Element
         * @param currentSelect jQueryDOM Object of Select
         * Form Element
         */
        setSelectObservers: function(currentSelect) {
            var self = this, dynamicClickObserver, dynamicOptionObservers;

            // Set Click Observer
            dynamicClickObserver = 'setClickObserver' + self.camelCaseCreator(self.getSelectType(currentSelect));

            if($.isFunction(self[dynamicClickObserver])){
                self[dynamicClickObserver](currentSelect);
            }else{
                self.setClickObserver(currentSelect);
            }

            // Set Option Observers
            dynamicOptionObservers = 'setOptionObservers' + self.camelCaseCreator(self.getSelectType(currentSelect));
            if($.isFunction(self[dynamicOptionObservers])){
                self[dynamicOptionObservers](currentSelect);
            }else{
                self.setOptionObservers(currentSelect);
            }

            if(self.settings.htmlTag.hasClass('touch') && (self.settings.htmlTag.hasClass('resp-mobile') || self.settings.htmlTag.hasClass('resp-tablet'))) {
                $(currentSelect).on('change', function(){
                    self.updateSuperSelectsShiv(currentSelect);
                });
            }
        },

        /**
         * Default Click Observer for Select Shiv to Open Select Options
         * @param currentSelect jQueryDOM Object of Select
         * Form Element
         */
        setClickObserver: function(currentSelect) {
            var self        = this,
                selectShiv  = $(currentSelect).siblings('.ba-select-box').find('.ba-shiv');

                // Add Click Event tot he Super Select Shiv
                selectShiv.on('click touchstart', function(){
                    // Detect if the Shiv is Already Open
                    if(!$(currentSelect).siblings('.ba-select-box').hasClass('open')){
                        self.openOptions(currentSelect);
                    }else{
                        self.closeOptions(currentSelect);
                    }
                });
        },

        /**
         * Click Observer for Super Select that opens to the Left
         * @param currentSelect jQueryDOM Object of Select
         */
        setClickObserverLeft: function(currentSelect) {
            var self        = this,
                selectShiv  = $(currentSelect).siblings('.ba-select-box').find('.ba-shiv');

                // Add Click Event tot he Super Select Shiv
                selectShiv.on('click touchstart', function(){
                    // Detect if the Shiv is Already Open
                    var baSelectBox = $(currentSelect).siblings('.ba-select-box'),
                        baOptionsBox = $(baSelectBox).find('.ba-options');

                    if(!$(baSelectBox).hasClass('open')){
                        self.openOptions(currentSelect);
                        var newLeft = $(baOptionsBox).outerWidth() - ($(baOptionsBox).outerWidth() * 2) - 6,
                            newTop = ($(baOptionsBox).height()/2) - $(baOptionsBox).height();
                        $(baOptionsBox).css({
                            "left": newLeft,
                            "margin-top": newTop
                        });

                    }else{
                        self.closeOptions(currentSelect);
                    }
                });
        },

        /**
         * Click Observer for Super Select that opens to the Right
         * @param currentSelect jQueryDOM Object of Select
         */
        setClickObserverRight: function(currentSelect) {
            var self        = this,
                selectShiv  = $(currentSelect).siblings('.ba-select-box').find('.ba-shiv');

                // Add Click Event tot he Super Select Shiv
                selectShiv.on('click touchstart', function(){
                    // Detect if the Shiv is Already Open
                    var baSelectBox = $(currentSelect).siblings('.ba-select-box'),
                        baOptionsBox = $(baSelectBox).find('.ba-options');
                    if(!$(baSelectBox).hasClass('open')){

                        self.openOptions(currentSelect);

                        var newRight = $(baSelectBox).find('.ba-options').outerWidth() - ($(baOptionsBox).outerWidth() * 2) - 6,
                            newTop = ($(baOptionsBox).height()/2) - $(baOptionsBox).height();
                        $(baOptionsBox).css({
                            "right": newRight,
                            "margin-top": newTop
                        });

                    }else{
                        self.closeOptions(currentSelect);
                    }
                });
        },

        /**
         * Click Observer for Super Select that opens with an Overlay
         * @param currentSelect jQueryDOM Object of Select
         */
        setClickObserverOverlay: function(currentSelect) {
            var self        = this,
                selectShiv  = $(currentSelect).siblings('.ba-select-box').find('.ba-shiv');

                // Add Click Event tot he Super Select Shiv
                selectShiv.on('click touchstart', function(){
                    // Detect if the Shiv is Already Open
                    var baSelectBox = $(currentSelect).siblings('.ba-select-box');
                    if(!$(baSelectBox).hasClass('open')){

                        self.openOptions(currentSelect);

                        var boxHeight = $(baSelectBox).find('.ba-options').height();
                        var newMargin = boxHeight - (boxHeight * 1.5);

                        $(baSelectBox).find('.ba-options').css("margin-top", newMargin);

                    }else{
                        self.closeOptions(currentSelect);
                    }
                });
        },

        /**
         * Click Observer for Super Select that opens Full Screen
         * @param currentSelect jQueryDOM Object of Select
         */
        setClickObserverFullscreen: function(currentSelect) {
            var self        = this,
                selectShiv  = $(currentSelect).siblings('.ba-select-box').find('.ba-shiv');

            // Add Click Event tot he Super Select Shiv
            selectShiv.on('click touchstart', function(){
                // Detect if the Shiv is Already Open
                var baSelectBox = $(currentSelect).siblings('.ba-select-box');
                if(!$(baSelectBox).hasClass('open')){

                    self.openOptions(currentSelect);

                    var boxHeight = $(baSelectBox).find('.ba-options ul').height();
                    var newMargin = boxHeight - (boxHeight * 1.5);

                    $(baSelectBox).find('.ba-options ul').css("margin-top", newMargin);

                }else{
                    self.closeOptions(currentSelect);
                }
            });
        },

        /**
         * Click Observer for Super Select that opens Full Screen with
         * Thumbnails
         * @param currentSelect jQueryDOM Object of Select
         */
        setClickObserverFullthumb: function(currentSelect) {
            var self        = this,
                selectShiv  = $(currentSelect).siblings('.ba-select-box').find('.ba-shiv');

                // Add Click Event tot he Super Select Shiv
                selectShiv.on('click touchstart', function(){
                    // Detect if the Shiv is Already Open
                    var baSelectBox = $(currentSelect).siblings('.ba-select-box');
                    if(!$(baSelectBox).hasClass('open')){
                        self.openOptions(currentSelect);
                    }else{
                        self.closeOptions(currentSelect);
                    }

                    if(!$(currentSelect).data('setup')) {
                        $(currentSelect).data('setup', true);
                        $($(baSelectBox).find('.ba-options li')[0]).remove();
                    }

                    $.each($(baSelectBox).find('.ba-img-span'), function(idx, el){
                        $(el).css("min-height", $(el).width());
                    });
                });

                if(self.settings.htmlTag.hasClass('touch') && (self.settings.htmlTag.hasClass('resp-mobile') || self.settings.htmlTag.hasClass('resp-tablet'))) {
                    $(currentSelect).on('change', function(){
                        self.updateSuperSelectsShiv(currentSelect);
                    });
                }
        },

        /**
         * Set the Max Height of Of the Open Super Select to force
         * scrolling on Selects with Many Options
         * @param currentSelect jQueryDOM Object of Select
         */
        setMaxOptionsHeight: function(currentSelect) {
            var self = this,
                customOptions = $(currentSelect).siblings('.ba-select-box').find('.ba-options ul'),
                firstCustomOption = $(customOptions).children()[0];

                if($(firstCustomOption).height() === 0) {
                    firstCustomOption = $(customOptions).children()[1];
                }

                if($(customOptions).children().length > self.settings.optionLimits) {
                    var maxHeight = $(firstCustomOption).height() * self.settings.optionLimits;
                    $(customOptions).css({
                        'overflow-y': 'scroll',
                        'max-height': maxHeight + 'px'
                    });
                }
        },

        /**
         * Add Keyboard Observers to Select First Option
         * that Matches Keyup
         * @param currentSelect jQueryDOM Object of Select
         */
        setKeyboardObservers: function(currentSelect) {
            $(document).on('keyup', function(event) {
                var key = String.fromCharCode(event.keyCode),
                    customOptions = $(currentSelect).siblings('.ba-select-box').find('.ba-options ul').children();

                    $.each($(customOptions), function(idx, selectOption){
                        if($(selectOption).find('.ba-opt-content').text()[0] === key) {
                            $(selectOption).trigger('click');
                            $(document).off('keyup');
                            return false;
                        }
                    });
            });
        },

        /**
         * Standard Method that runs when any of the Super Selects
         * are triggered to open.
         * @param currentSelect jQueryDOM Object of Select
         */
        openOptions: function(currentSelect) {
            var self = this;

            // Add Open Class to the Shiv, Create the Closing Element, and Attach Closing Element Events
            $(currentSelect).siblings('.ba-select-box').addClass('open').after('<div class="ba-select-close"></div>');

            self.setMaxOptionsHeight(currentSelect);

            self.setKeyboardObservers(currentSelect);

            self.setCloseObserver(currentSelect);

            if($(currentSelect).attr('onclick') !== ''){
                $(currentSelect).trigger('click');
            }
        },

        /**
         * Standard Method that runs when any of the Super Selects are
         * triggered to close.
         * @param currentSelect jQueryDOM Object of Select
         */
        closeOptions: function(currentSelect) {
            // Remove the Open Class from the Shiv, and Remove the Closing Element from the DOM.
            $(currentSelect).siblings('.ba-select-box').removeClass('open');
            $(currentSelect).siblings('.ba-select-close').remove();
        },

        /**
         * Default Method that sets Observers on Super Select Options
         * @param currentSelect jQueryDOM Object of Select
         */
        setOptionObservers: function(currentSelect) {
            var self = this,
                customOptions = $(currentSelect).siblings('.ba-select-box').find('.ba-options ul').children();

            $.each($(customOptions), function(optionIndex){
                $(this).on('click touchstart', function(){
                    $(customOptions).removeClass('selected');
                    $(this).addClass('selected');
                    $(currentSelect).prop('selectedIndex',optionIndex);
                    if($(currentSelect).attr('onchange')){
                        $(currentSelect)[0].onChangeEvent = new Function($(currentSelect).attr('onchange'));
                        $(currentSelect)[0].onChangeEvent();
                    }
                    $(currentSelect).trigger('change');
                    self.updateSuperSelectsShiv(currentSelect);
                    $(currentSelect).siblings('.ba-select-box').find('.ba-shiv').trigger('click');
                    $(document).off('keyup');
                });
            });
        },

        /**
         * Method that handles customizations for Full Screen Thumbnail
         * Options & sets Observers on Super Select Options
         * @param currentSelect jQueryDOM Object of Select
         */
        setOptionObserversFullthumb: function(currentSelect) {
            var self = this,
                customOptions = $(currentSelect).siblings('.ba-select-box').find('.ba-options ul').children();

                $.each($(customOptions), function(optionIndex){
                    $(this).on('click touchstart', function(){

                        if(!$(currentSelect).data('setup-first')) {
                            $(currentSelect).data('setup-first', true);
                            $(currentSelect).siblings('.ba-select-box').addClass('setup');
                        }

                        $(customOptions).removeClass('selected');
                        $(this).addClass('selected');

                        $(currentSelect).prop('selectedIndex',optionIndex);
                        $(currentSelect).trigger('change');
                        self.updateSuperSelectsShiv(currentSelect);
                        $(currentSelect).siblings('.ba-select-box').find('.ba-shiv').trigger('click');
                    });
                });

                if(self.settings.htmlTag.hasClass('touch') && (self.settings.htmlTag.hasClass('resp-mobile') || self.settings.htmlTag.hasClass('resp-tablet'))) {
                    $(currentSelect).on('change', function(){
                        if(!$(currentSelect).data('setup-first')) {
                            $(currentSelect).data('setup-first', true);
                            $(currentSelect).siblings('.ba-select-box').addClass('setup');
                        }
                    });
                }
        },

        /**
         * Observer set on multiple Elements to trigger close of
         * Super Selects
         * @param currentSelect jQueryDOM Object of Select
         */
        setCloseObserver: function(currentSelect) {
            // Detect Closing Element Click
            $(currentSelect).siblings('.ba-select-close').on('click touchstart', function(){
                // Fire Click Event on Element Shiv
                $(currentSelect).siblings('.ba-select-box').find('.ba-shiv').trigger('click');
                $(currentSelect).trigger('custom:blur');
            });
        },

        /**
         * Apply Data Value to Current Select of the Super Select
         * Type it should display;
         * @param currentSelect jQueryDOM Object of Select
         */
        setSelectType: function(currentSelect) {
            var self = this;
            $(currentSelect).data('type', self.getSelectType(currentSelect));
        },

        /**
         * Get Super Select Type to Display Based on Data Value
         * on Element or CSS class already applied on initial
         * page render / AJAX DOM manipulation.
         * @param currentSelect jQueryDOM Object of Select
         * @return String currentType Current Super Select Type
         */
        getSelectType: function(currentSelect) {
            var self = this;

            if($(currentSelect).data('type') !== undefined){
                return $(currentSelect).data('type');
            }else{
                var currentType = '',
                    typeArray = self.settings.typeArray;
                $.each(typeArray, function(idx, val){
                    if($(currentSelect).hasClass('ba-' + val)){
                        currentType = val;
                    }
                });

                return currentType === '' ? self.settings.displayType : currentType;
            }
        },

        /**
         * Check if Select Element is Disabled
         * @param currentSelect jQueryDOM Object of Select
         * @return String Disabled Status of Select Element
         */
        getSelectStatus: function(currentSelect) {
            return ($(currentSelect).prop('disabled')) ? 'disabled' : '';
        },

        /**
         * Convert First Character of String to Capital Character
         * @param  stringText Text to Convert
         * @return String Converted Text
         */
        camelCaseCreator: function(stringText){
            return stringText.charAt(0).toUpperCase() + stringText.slice(1);
        },

        /**
         * Add Super Select Base Template before the Current Select
         * Element
         * @param currentSelect jQueryDOM Object of Select
         */
        createSuperSelectElement: function(currentSelect) {
            var self = this, superSelectTemplate;

            superSelectTemplate = '<div class="ba-select ba-select-box ba-' + self.getSelectType(currentSelect) + ' ' + self.getSelectStatus(currentSelect) + '"><span class="ba-shiv"><span></span></span><div class="ba-options"></div></div>';

            $(currentSelect).before(superSelectTemplate);
        },

        /**
         * Run Object Creation events for optionsArray based on Select Type
         * @param currentSelect jQuery DOM Object of Select
         */
        buildOptionsObjects: function(currentSelect) {
            var self = this,
            dynamicOptionBuilder = 'buildOptionObject' + self.camelCaseCreator(self.getSelectType(currentSelect));

            if($.isFunction(self[dynamicOptionBuilder])){
                currentSelect.optionsArray = self[dynamicOptionBuilder]($(currentSelect).children());
            }else{
                currentSelect.optionsArray = self.buildOptionObject($(currentSelect).children());
            }
        },

        /**
         * Build Array of Objects with Values of Current Select
         * Options
         * @param  opts Array of Option Elements within
         * Current Select
         * @return Array | Array of Select Options
         */
        buildOptionObject: function(opts) {
            var optionsArray = [];

            $.each($(opts), function(idx, opt){
                var superSelectOption = {
                    'value': $(opt).attr('value').length > 0 ? $(opt).attr('value') : '',
                    'selected': $(opt).prop('selected'),
                    'disabled': $(opt).prop('disabled'),
                    'content': $(opt).html(),
                    'color': $(opt).data('color'),
                    'image': $(opt).data('image')
                };

                optionsArray.push(superSelectOption);
            });

            return optionsArray;
        },

        /**
         * Build the LI Elements within the Current Super
         * Select Options
         * @param  opt Individual Select Option Object
         * @param  selectOptions jQuery DOM Object of ba-optiosn Div
         */
        buildSelectOption: function(opt, selectOptions) {
            var self = this,
            optionDisabled = opt.disabled ? ' disabled' : '',
            optionSelected = opt.selected ? ' selected' : '',
            optionValue = opt.value !== undefined ? opt.value : '',
            optionContent = opt.content !== undefined ? opt.content : '',
            optionColor = opt.color !== undefined ? opt.color : '',
            optionImage = opt.image !== undefined ? opt.image : '';


            // Template for the Image Option
            if(optionImage !== '') {
                optionImage = self.updateShivImage(self.settings.imageType, optionImage, optionValue);
            }

            // Template for the Color Option
            if(optionColor !== ''){
                optionColor = self.updateShivColor(optionColor);
            }

            // Template for the optionLi
            var optionLi =  '<li class="option' +
                            optionDisabled +
                            optionSelected + '" ' +
                            'data-value="' + optionValue + '">' +
                            optionImage +
                            optionColor +
                            '<span class="ba-opt-content">' + optionContent + '</span>' +
                            '</li>';

            // Append the Option to the Un-ordered List Element
            $(selectOptions).find('ul').append(optionLi);

        },

        /**
         * Adds Escalating CSS Transition-Delay to Options to add Cascading
         * Display Effect
         * @param  delay  Initial Delay for First Option
         * @param  idx    Index of Current Option
         * @param  offset Offset used to multiply Cascading Delay
         * @return String Final Transition Delay Calculated
         */
        getSelectOptionTransitionDelay: function(delay, idx, offset) {
            var transitionDelay,
                offsetDelay = (offset) ? offset : delay;

            if(idx === 0) {
                transitionDelay = delay + 's';
            } else {
                transitionDelay = (((idx + 1) * (delay * 100) / 100) + offsetDelay) + 's';
            }

            return transitionDelay;
        },

        /**
         * Add CSS Transition Delay to the Current DOM Element
         * @param transitionDelay CSS Attribute Value for Transition Delay
         * @param selectOptions   jQuery DOM Object of Super Select Options
         * @param idx             Index of Current Super Select Option
         */
        setSelectOptionTransitionDelay: function(transitionDelay, selectOptions, idx) {

            $($(selectOptions).find('li')[idx]).css({
                '-webkit-transition-delay' : transitionDelay,
                'transition-delay': transitionDelay
            });
        },

        /**
         * Build Out Select with Transition Delay for Individual Option Elements
         * @param  opt           Current DOM Option Object
         * @param  selectOptions DOM Object of Super Select Options
         * @param  delay         Initial Delay for First Option
         * @param  idx           Index of Current Option
         * @param  offset        Offset used to multiply Cascading
         *                                Delay
         */
        buildSelectOptionWithDelay: function(opt, selectOptions, idx, delay, offset) {
            var self = this, transitionDelay;

            self.buildSelectOption(opt, selectOptions, idx);

            transitionDelay = self.getSelectOptionTransitionDelay(delay, idx, offset);

            self.setSelectOptionTransitionDelay(transitionDelay, selectOptions, idx);
        },

        /**
         * Add Transition Delay for Super Select - Over Type
         * @param  opt           Current DOM Option Object
         * @param  selectOptions DOM Object of Super Select Options
         * @param  idx           Index of Current Super Select Option
         */
        buildSelectOptionOver: function(opt, selectOptions, idx) {
            this.buildSelectOptionWithDelay(opt, selectOptions, idx, 0.02, false);
        },

        /**
         * Add Transition Delay for Super Select - Thumbnail & First Child Class
         * to First Option
         * @param  opt           Current DOM Option Object
         * @param  selectOptions DOM Object of Super Select Options
         * @param  idx           Index of Current Super Select Option
         */
        buildSelectOptionThumbnail: function(opt, selectOptions, idx) {
            this.buildSelectOptionWithDelay(opt, selectOptions, idx, 0.02, false);

            // console.log(opt, selectOptions, idx);

            if(idx === 0){
                $($(selectOptions).find('ul li')[idx]).addClass('first-child');
            }
        },

        /**
         * Add Transition Delay for Super Select - Fullscreen
         * @param  opt           Current DOM Option Object
         * @param  selectOptions DOM Object of Super Select Options
         * @param  idx           Index of Current Super Select Option
         */
        buildSelectOptionFullscreen: function(opt, selectOptions, idx) {
            this.buildSelectOptionWithDelay(opt, selectOptions, idx, 0.10, 0.05);
        },

        /**
         * Add Transition Delay for Super Select - Fullscreen Thumbnails
         * @param  opt           Current DOM Option Object
         * @param  selectOptions DOM Object of Super Select Options
         * @param  idx           Index of Current Super Select Option
         */
        buildSelectOptionFullthumb: function(opt, selectOptions, idx) {
            this.buildSelectOptionWithDelay(opt, selectOptions, idx, 0.03, false);
        },

        /**
         * Updates Shiv when you need to update due to Other Scripts Modifying
         * Content or When you Have Selected an Option in your Super Select
         * @param currentSelect jQueryDOM Object of Select
         */
        updateSuperSelectsShiv: function(currentSelect) {

            var self = this,
                selectedOption = $(currentSelect).prop('selectedIndex'),
                optionsArray,
                html = '';

                if(currentSelect.optionsArray === undefined) {
                    self.buildOptionsObjects(currentSelect);
                }

                optionsArray = currentSelect.optionsArray[selectedOption];

                if(optionsArray.image !== undefined){
                    html += self.updateShivImage(self.settings.imageType, optionsArray.image, optionsArray.value);
                }

                if(optionsArray.color !== undefined){
                    html += self.updateShivColor(optionsArray.color);
                }

                html += '<span class="ba-shiv-content">' + self.formatShivContent(currentSelect.optionsArray[selectedOption].content) + '</span>';

            $(currentSelect).siblings('.ba-select-box').find('.ba-shiv').html(html + ' <span class="ba-arrow"></span>');

        },

        /**
         * Truncates Text Within Shiv Content
         * @param  content Selected Option Text
         * @return String         Truncated Text
         */
        formatShivContent: function(content) {
            var self = this,
                formatedContent = content;

                if(formatedContent.length > self.settings.truncateAmount) {
                    formatedContent = formatedContent.strip().truncate(self.settings.truncateAmount);
                }

            return formatedContent;
        },

        /**
         * If the Shiv Needs to Display an Image This Updates the Shiv Image
         * @param  imageType Image Type (either span or img)
         * @param  image     Url to Image
         * @param  value     Value of Selected Option
         * @return String    DOM HTML of Shiv Image
         */
        updateShivImage: function(imageType, image, value) {
            var html;

            if(imageType === 'span') {
                html = '<span class="ba-img-span" style="background-image: url(\'' + image + '\');"></span>';
            }else{
                html = '<span class="ba-img"><img src="' + image + ' " alt="' + value + '"/></span>';
            }

            return html;
        },

        /**
         * If the Shiv Needs to Display Color this Updates the Shiv Color
         * @param  color   HEX Color Value of Selected Option
         * @return String DOM HTML of Shiv Color
         */
        updateShivColor: function(color) {
            return '<span class="ba-color-box" style="background: ' + color + ';"></span>';
        },

        /**
         * Removes Super Select Customizations for Black Listed Selects
         */
        unsetCustom: function() {
            var self = this;

            $.each(self.settings.blackList, function(idx, listItem){

                $.each($(listItem), function(idx, el){
                    if($(el).prop('tagName') == 'SELECT') {
                        self.unsetSuperSelect(el);
                    }
                });

            });
        },

        /**
         * Removes Super Select DOM Elements for Black Listed Selects
         */
        unsetSuperSelect: function(el) {

            $(el).removeClass('ba-select-input');
            $(el).parent().find('.ba-select').remove();

        },

        updateInternetExplorer: function() {
            if($('html').hasClass('ie8')){
                $('.ba-options li').on('mouseover', function() {
                    $(this).addClass('hover');
                }).on('mouseleave', function() {
                    $(this).removeClass('hover');
                });
            }
        }
    };

    /**
     * The parameter object is optional.
     * Must be an object.
     */
    if(ba !== undefined) {
        ba.SuperSelects = new SuperSelects({});
    }

});
