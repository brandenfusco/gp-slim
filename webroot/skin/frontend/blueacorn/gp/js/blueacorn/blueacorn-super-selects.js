/**
 * @package     BlueAcorn/SuperSelects
 * @version     2.0
 * @author      Blue Acorn <code@blueacorn.com>
 * @copyright   Copyright © 2016 Blue Acorn.
 */

function SuperSelectsCore(options) {
    this.init(options);
}

;(function($){

    SuperSelectsCore.prototype = {
        init: function(options) {
            this.settings = {
                'moduleName': 'SuperSelectsCore',
                'enabled': true,
                'displayMethod': 'show',
                'displayType': 'under',
                'typeArray': ['under', 'overlay', 'fullscreen', 'shortbuttons', 'search', 'thumbnail', 'fullthumb'],
                'truncate': true,
                'truncateAmount': 255,
                'optionsLimit': 10,
                'imageType': 'span',
                'htmlTag': $('html'),
                'selects': $('select'),
                'smallSelects': $('#select-language, .toolbar select, .review-heading .pager select, .review-customer-index .pager select, .small-select'),
                'alternateDataAttributes': ['alternate-select'],
                'blackList': '.no-style, .swatch-select, select[multiple]',
                'defaultObservers': [
                    'update:selects',
                    'update:all',
                    'section:update'
                ],
                'additionalObservers': [],
                'classes': {
                    'containerClass': 'ba-select-container',
                    'boxClass': 'ba-select-box',
                    'selectClass': 'ba-select',
                    'smallClass': 'sm',
                    'shivClass': 'ba-shiv',
                    'shivContentClass': 'ba-shiv-content',
                    'optionsContainerClass': 'ba-options',
                    'originalSelectElementClass': 'ba-select-input',
                    'optionClass': 'option',
                    'optionContentClass': 'ba-opt-content',
                    'imageClass': 'ba-img',
                    'imageSpanClass': 'ba-img-span',
                    'colorClass': 'ba-color-box',
                    'closeClass': 'ba-select-close',
                    'openClass': 'open',
                    'arrowClass': 'ba-arrow',
                    'disabledClass': 'disabled',
                    'selectedClass': 'option-selected',
                    'focusClass': 'focus',
                    'hideFirstClass': 'hide-first',
                    'setupClass': 'setup',
                    'searchFieldClass': 'ba-search-field',
                    'searchFieldContainerClass': 'ba-search-container'
                },
                'keyCodes': {
                    'SPACE': 32,
                    'ENTER': 13,
                    'TAB': 9,
                    'DOWN': 40,
                    'UP': 38
                },
                'thumbnailOptions': {
                    'optionsLimit': 5
                },
                'shortbuttonsOptions': {
                    'buttonsLimit': 6,
                    'activeClass': 'active'
                },
                'fullthumbOptions': {
                    'optionsLimit': 0
                }
            };

            ba.overrideSettings(this.settings, options);

            if(this.settings.enabled === false) {
                return false;
            }

            this.setCustomObservers();
            this.createSuperSelect();
        },

        /**
         * Set Custom Observers for updating all of the selects.
         */
        setCustomObservers: function() {
            var self = this,
                customEvents = (self.settings.defaultObservers.join(" ") + " " + self.settings.additionalObservers.join(" ")).trim();

            $(document).on(customEvents, function(){
                self.settings.selects = $(self.settings.selects);
                self.createSuperSelect();
            });
        },

        /**
         * Initial Step for Creating Super Selects
         * @return DOM Manipulation for Select Elements
         */
        createSuperSelect: function() {
            var self = this,
                settings = this.settings;

            self.superSelectsBefore();

            $.each($(settings.selects).not(settings.blackList), function(idx, select) {
                var currentSelect = $(select),
                    selectOptions,
                    dynamicSelectOption,
                    dynamicCreateSuperSelectElement;

                if($(this).siblings(self.formatClass('boxClass')).length > 0) {
                    self.updateSuperSelectsShiv(currentSelect);
                    return;
                }

                self.setParentStyle(currentSelect);
                self.setSelectType(currentSelect);

                // Add class to original <select> to hide it.
                currentSelect.addClass(settings.classes.originalSelectElementClass);

                dynamicCreateSuperSelectElement = 'createSuperSelectElement' + self.getDynamicSelectName(currentSelect);

                if($.isFunction(self[dynamicCreateSuperSelectElement])) {
                    self[dynamicCreateSuperSelectElement](currentSelect);
                }else{
                    self.createSuperSelectElement(currentSelect);
                }

                //Set optionsBox to a variable
                selectOptions = $(self.getSelectBox(currentSelect)).find('.ba-options');

                //Iterate through the select options to create the individual super select options & attach it to the select.
                self.buildOptionsObjects(currentSelect);

                dynamicSelectOption = 'buildSelectOption' + self.getDynamicSelectName(currentSelect);

                $.each(currentSelect.optionsArray, function(idx) {
                   if($.isFunction(self[dynamicSelectOption])) {
                       self[dynamicSelectOption](this, selectOptions, idx);
                   }else{
                       self.buildSelectOption(this, selectOptions, idx);
                   }
                });

                //Populate the Shiv
                self.updateSuperSelectsShiv(currentSelect);

                // Make sure max height is set
                self.setMaxOptionsHeight(currentSelect);

                // Set Observers on the Selects
                self.setSelectObservers(currentSelect);
            });
        },

        /**
         * Add Small Class to Selects that need to display smaller
         * for the User Interface
         * @return DOM Manipulation, Add SMALL Class to Element
         */
        superSelectsBefore: function() {
            var settings = this.settings;

            $(settings.smallSelects).addClass(settings.classes.smallClass);
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
            var settings = this.settings;

            if($(currentSelect).parent().hasClass(settings.classes.containerClass)) {
                return;
            }else if($(currentSelect).parent().hasClass('input-box')){
                $(currentSelect).parent().addClass(settings.classes.containerClass);
            }else{
                $(currentSelect).wrap('<div class="input-box ' + settings.classes.containerClass + '"></div>');
            }

            if($(currentSelect).hasClass(settings.classes.smallClass) && !$(currentSelect).parent(settings.classes.smallClass)) {
                $(currentSelect).parent().addClass(settings.classes.smallClass);
            }
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
            var settings = this.settings,
                currentType = '',
                typeArray = settings.typeArray;

            if($(currentSelect).data('type')) {
                return $(currentSelect).data('type');
            }else{
                $.each(typeArray, function(idx, val){
                    if($(currentSelect).hasClass('ba-' + val)){
                        currentType = val;
                    }
                });

                return currentType === '' ? settings.displayType : currentType;
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
         * Add Super Select Base Template before the Current Select
         * Element
         * @param currentSelect jQueryDOM Object of Select
         */
        createSuperSelectElement: function(currentSelect) {
            var self = this,
                settings = self.settings,
                superSelectTemplate,
                html,
                superSelectClasses = {
                    selectClass: settings.classes.selectClass,
                    boxClass: settings.classes.boxClass,
                    selectType: self.getSelectType(currentSelect),
                    selectStatus: self.getSelectStatus(currentSelect),
                    shivClass: settings.classes.shivClass,
                    optionsContainerClass: settings.classes.optionsContainerClass
                };

            superSelectTemplate = $.htmlTemplate(
                '<div class="#{selectClass} #{boxClass} ba-#{selectType} #{selectStatus}">' +
                    '<span class="#{shivClass}"><span></span></span>' +
                    '<div class="#{optionsContainerClass}"><ul></ul></div>' +
                '</div>'
            );

            html = superSelectTemplate.evaluate(superSelectClasses);

            $(currentSelect).before(html);
        },

        /**
         * Add Super Select Search Template before the Current Select
         * Element
         * @param currentSelect jQueryDOM Object of Select
         */
        createSuperSelectElementSearch: function(currentSelect) {
            var self = this,
                settings = self.settings,
                searchFieldObject = {
                    'searchFieldClass': settings.classes.searchFieldClass,
                    'searchFieldContainerClass': settings.classes.searchFieldContainerClass,
                    'searchFieldName': $(currentSelect).attr('name'),
                    'searchPlaceholder': 'Search'
                },
                html,
                searchTemplate;

            self.createSuperSelectElement(currentSelect);

            searchTemplate = $.htmlTemplate(
                '<div class="#{searchFieldContainerClass}">' +
                    '<input name="#{searchFieldName}" value="" placeholder="#{searchPlaceholder}" class="#{searchFieldClass}" />' +
                '</div>'
            );

            html = searchTemplate.evaluate(searchFieldObject);

            $(self.getOptionsContainer(currentSelect)).before(html);
        },

        /**
         * Run Object Creation events for optionsArray based on Select Type
         * @param currentSelect jQuery DOM Object of Select
         */
        buildOptionsObjects: function(currentSelect) {
            var self = this,
                dynamicOptionBuild = 'buildOptionObject' + self.getDynamicSelectName(currentSelect);

            if($.isFunction(self[dynamicOptionBuild])) {
                currentSelect.optionsArray = self[dynamicOptionBuild](S(currentSelect).find('option'));
            }else{
                currentSelect.optionsArray = self.buildOptionObject($(currentSelect).find('option'));
            }

            currentSelect.alphaMap = self.buildOptionAlphaMap($(currentSelect).find('option'));
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
                optionsArray.push({
                    value: $(opt).attr('value') ? $(opt).attr('value') : '',
                    selected: $(opt).prop('selected'),
                    disabled: $(opt).prop('disabled'),
                    content: $(opt).html() ? $(opt).html() : '',
                    color: $(opt).data('color') ? $(opt).data('color') : '',
                    image: $(opt).data('image') ? $(opt).data('image') : ''
                });
            });
            return optionsArray;
        },

        /**
         * Build Object with First Letters as keys to allow quick selection of options.
         * @param  opts Array of Option Elements within
         * Current Select
         * @return Object | Object of first letters as keys, and arrays of option indexes as values.
         */
        buildOptionAlphaMap: function(opts) {
            var alphaMap = {};

            $.each($(opts), function(idx, opt) {
                if(alphaMap[$(opt).html().charAt(0).toLowerCase()] === undefined) {
                    alphaMap[$(opt).html().charAt(0).toLowerCase()] = [idx];
                }else{
                    alphaMap[$(opt).html().charAt(0).toLowerCase()].push(idx);
                }
            });

            return alphaMap;
        },

        /**
         * Build the LI Elements within the Current Super
         * Select Options
         * @param  opt Individual Select Option Object
         * @param  selectOptions jQuery DOM Object of ba-option Div
         */
        buildSelectOption: function(opt, selectOptions) {
            var self = this,
                settings = this.settings;

            opt.optionClass = settings.classes.optionClass;
            opt.optionContentClass = settings.classes.optionContentClass;
            opt.disabledClass = opt.disabled ? settings.classes.disabledClass : '';
            opt.selectedClass = opt.selected ? settings.classes.selectedClass : '';
            opt.colorMarkup = '';
            opt.imageMarkup = '';

            if(opt.image !== '' && opt.image !== undefined) {
                opt.imageMarkup = self.updateShivImage(settings.imageType, opt.image, opt.value);
            }

            if(opt.color !== '') {
                opt.colorMarkup = self.updateShivColor(opt.color);
            }

            var optionLi = $.htmlTemplate(
                '<li class="#{optionClass} #{disabledClass} #{selectedClass}" data-value="#{value}">' +
                        '#{imageMarkup}' +
                        '#{colorMarkup}' +
                        '<span class="#{optionContentClass}">#{content}</span>' +
                '</li>'
            );

            $(selectOptions).find('ul').append(optionLi.evaluate(opt));
        },

        /**
         * If the Shiv Needs to Display an Image This Updates the Shiv Image
         * @param  imageType Image Type (either span or img)
         * @param  image     Url to Image
         * @param  value     Value of Selected Option
         * @return String    DOM HTML of Shiv Image
         */
        updateShivImage: function(imageType, image, value) {
            var html,
                settings = this.settings,
                imageObject = {
                    image: image,
                    class: settings.classes.imageClass,
                    value: value
                };

            if(imageType === 'span') {
                imageObject.class = settings.classes.imageSpanClass;
                html = $.htmlTemplate('<span class="#{class}" style="background-image: url(\'#{image}\');"></span>');
            }else{
                html = $.htmlTemplate('<span class="#{class}"><img src="#{image}" alt="#{value}"/></span>');
            }

            return html.evaluate(imageObject);
        },

        /**
         * If the Shiv Needs to Display Color this Updates the Shiv Color
         * @param  color   HEX Color Value of Selected Option
         * @return String DOM HTML of Shiv Color
         */
        updateShivColor: function(color) {
            var html,
                settings = this.settings,
                colorData = {
                    className: settings.classes.colorClass,
                    color: color
                };

            html = $.htmlTemplate('<span class="#{className}" style="background: #{color};"></span>');

            return html.evaluate(colorData);
        },

        /**
         * Updates Shiv when you need to update due to Other Scripts Modifying
         * Content or When you Have Selected an Option in your Super Select
         * @param currentSelect jQueryDOM Object of Select
         */
        updateSuperSelectsShiv: function(currentSelect) {
            var self = this,
                selectedOption = $(currentSelect).prop('selectedIndex'),
                childOptions = self.getCustomOptions(currentSelect),
                dynamicAfterUpdateSuperSelectsShiv = 'updateAfterSuperSelectsShiv' + self.getDynamicSelectName(currentSelect),
                currentOption,
                settings = self.settings,
                html = '';

            self.closeOptions(currentSelect);

            if((currentSelect.optionsArray === undefined && currentSelect.optionsArray !== "") || currentSelect.optionsArray.length !== $(currentSelect).children().length) {
                self.buildOptionsObjects(currentSelect);
            }

            if(currentSelect.alphaMap === undefined && currentSelect.alphaMap !== "") {
                self.buildOptionAlphaMap(currentSelect);
            }

            currentOption = currentSelect.optionsArray[selectedOption];

            if(currentOption.image !== undefined && currentOption.image !== ""){
                html += self.updateShivImage(self.settings.imageType, currentOption.image, currentOption.value);
            }

            if(currentOption.color !== undefined && currentOption.color !== ""){
                html += self.updateShivColor(currentOption.color);
            }

            html += '<span class="' + settings.classes.shivContentClass + '">' + self.formatShivContent(currentSelect.optionsArray[selectedOption].content) + '</span>';

            $(self.getSelectBox(currentSelect)).find(self.formatClass('shivClass')).html(html + ' <span class="' + settings.classes.arrowClass + '"></span>');

            if($(currentSelect).css('display') === 'none'){
                $(currentSelect).siblings(self.formatClass('selectClass')).css('display','none');
            }else{
                $(currentSelect).siblings(self.formatClass('selectClass')).css('display','');
            }

            if($(currentSelect).prop('disabled')){
                $(self.getParentContainer(currentSelect)).addClass(settings.classes.disabledClass);
            }else{
                $(self.getParentContainer(currentSelect)).removeClass(settings.classes.disabledClass);
            }

            if($(currentSelect).data('optionselected') === 'true'){
                $(self.getParentContainer(currentSelect)).addClass(settings.classes.selectedClass);
            }

            if($(currentSelect).hasClass(settings.classes.smallClass)) {
                $(self.getParentContainer(currentSelect)).addClass(settings.classes.smallClass);
            }

            $(childOptions).removeClass(settings.classes.selectedClass);
            $(childOptions[selectedOption]).addClass(settings.classes.selectedClass);

            if($.isFunction(self[dynamicAfterUpdateSuperSelectsShiv])) {
                self[dynamicAfterUpdateSuperSelectsShiv](currentSelect);
            }
        },

        /**
         * Updates Shiv for Short Buttons
         * @param currentSelect jQueryDOM Object of Select
         */
        updateAfterSuperSelectsShivShortbuttons: function(currentSelect) {
            var self = this,
                settings = self.settings,
                selectParent = $(self.getSelectBox(currentSelect));

            if(currentSelect.optionsArray.length <= settings.shortbuttonsOptions.buttonsLimit) {
                selectParent.addClass(settings.shortbuttonsOptions.activeClass);
            }else{
                selectParent.removeClass(settings.shortbuttonsOptions.activeClass);
            }
        },

        /**
         * Standard Method that runs when any of the Super Selects are
         * triggered to close.
         * @param currentSelect jQueryDOM Object of Select
         */
        closeOptions: function(currentSelect) {
            var self = this,
                settings = self.settings;

            // Remove the Open Class from the Shiv, and Remove the Closing Element from the DOM.
            $(self.getSelectBox(currentSelect)).removeClass(settings.classes.openClass);
            $(currentSelect).siblings(self.formatClass('closeClass')).remove();
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
         * Set the Max Height of Of the Open Super Select to force
         * scrolling on Selects with Many Options
         * @param currentSelect jQueryDOM Object of Select
         */
        setMaxOptionsHeight: function(currentSelect) {
            var self = this,
                optionsLimit = self.settings.optionsLimit,
                selectType = self.getSelectType(currentSelect),
                customOptions = self.getCustomOptions(currentSelect),
                firstCustomOption = $(customOptions)[0] === 0 ? $(customOptions)[1] : $(customOptions)[0];

            if($(customOptions).children().length > self.settings.optionsLimit) {
                if(typeof self.settings[selectType + 'Options'] === "object" && self.settings[selectType + 'Options'].optionsLimit > -1) {
                    optionsLimit = self.settings[selectType + 'Options'].optionsLimit;
                }

                if(optionsLimit > 0) {
                    var maxHeight = ($(firstCustomOption).height() + $(firstCustomOption).css('margin-bottom').replace(/[^-\d\.]/g, '')*1) * optionsLimit;
                    $(self.getOptionsContainer(currentSelect)).css({
                        'overflow-y': 'scroll',
                        'max-height': maxHeight + 'px'
                    });
                }
            }
        },

        /**
         * Set Select Specific or Generic Observers
         * @param currentSelect jQueryDOM Object of Select
         */
        setSelectObservers: function(currentSelect) {
            var self = this,
                dynamicClickObserver,
                dynamicOptionObservers;

            dynamicClickObserver = 'setClickObserver' + self.getDynamicSelectName(currentSelect);

            if($.isFunction(self[dynamicClickObserver])){
                self[dynamicClickObserver](currentSelect);
            }else{
                self.setClickObserver(currentSelect);
            }

            //Set Option Observers
            dynamicOptionObservers = 'setOptionObservers' + self.getDynamicSelectName(currentSelect);
            if($.isFunction(self[dynamicOptionObservers])){
                self[dynamicOptionObservers](currentSelect);
            }else{
                self.setOptionObservers(currentSelect);
            }

            $(currentSelect).on('change', function(){
                self.updateSuperSelectsShiv(currentSelect);
            });
        },

        /**
         * Default Click Observer for Select Shiv to Open Select Options
         * @param currentSelect jQueryDOM Object of Select
         * Form Element
         */
        setClickObserver: function(currentSelect) {
            var self = this,
                settings = self.settings,
                selectShiv = $(self.getSelectBox(currentSelect)).find(self.formatClass('shivClass')),
                dynamicOpenOptions = 'openOptions' + self.getDynamicSelectName(currentSelect),
                dynamicCloseOptions = 'closeOptions' + self.getDynamicSelectName(currentSelect);

            // Add Click Event tot he Super Select Shiv
            selectShiv.on('click focus', function(){
                // Detect if the Shiv is Already Open
                if(!$(self.getSelectBox(currentSelect)).hasClass(settings.classes.openClass)){
                    if($.isFunction(self[dynamicOpenOptions])) {
                        self[dynamicOpenOptions](currentSelect);
                    }else{
                        self.openOptions(currentSelect);
                    }
                }else{
                    if($.isFunction(self[dynamicCloseOptions])) {
                        self[dynamicCloseOptions](currentSelect);
                    }else{
                        self.closeOptions(currentSelect);
                    }
                }
            });
        },

        /**
         * Set either super select specific keyboard observers or
         * standard keyboard observers for controlling super selects
         * without a mouse.
         * @param currentSelect
         */
        setKeyObservers: function(currentSelect) {
            var self = this,
                dynamicKeyboardObservers;

            // Set Option Observers
            dynamicKeyboardObservers = 'setKeyboardObservers' + self.getDynamicSelectName(currentSelect);
            if($.isFunction(self[dynamicKeyboardObservers])){
                self[dynamicKeyboardObservers](currentSelect);
            }else{
                self.setKeyboardObservers(currentSelect);
            }
        },

        /**
         * Add Keyboard Observers to Select Option that matches typed keys
         * @param currentSelect jQueryDOM Object of Select
         */
        setKeyboardObservers: function(currentSelect) {
            var keys = [],
                self = this,
                settings = self.settings,
                selectedOption = $(currentSelect).prop('selectedIndex'),
                debounceMethod = ba.debounce(function (e) {
                    var searchKey = keys.length - 1,
                        alphaMap = currentSelect.alphaMap,
                        customOptions = self.getCustomOptions(currentSelect);

                        if(alphaMap[keys[searchKey]]) {
                            $.each(alphaMap[keys[searchKey]], function(idx, keyIndex){
                               if((alphaMap[keys[searchKey]].length - 1) === idx){
                                   $(customOptions)[keyIndex].focus();
                                   selectedOption = keyIndex;
                                   return false;
                               }else{
                                   if(selectedOption === keyIndex) {
                                       return true;
                                   }else{
                                       $(customOptions)[keyIndex].focus();
                                       selectedOption = keyIndex;
                                       return false;
                                   }
                               }
                            });
                        }
                    keys = [];
                }, 100);

            $(document).on('keydown', function(e) {
                console.log(e.keyCode);
                if(e.keyCode === settings.keyCodes.SPACE || e.keyCode === settings.keyCodes.ENTER) {
                    e.preventDefault();
                    $(e.target).trigger('click');
                }else if(e.keyCode === settings.keyCodes.DOWN) {
                    e.preventDefault();
                    self.moveToOption(currentSelect, 'down', e.target);
                }else if(e.keyCode === settings.keyCodes.UP){
                    e.preventDefault();
                    self.moveToOption(currentSelect, 'up', e.target);
                }else{
                    var key = String.fromCharCode(e.keyCode).toLowerCase();
                    keys.push(key);
                    debounceMethod(e);
                }
            });
        },

        /**
         * Add Keyboard Observers to the Search Selects for the Search Input Field
         * @param currentSelect jQueryDOM Object of Select
         */
        setKeyboardObserversSearch: function(currentSelect) {
            var keys = [],
                self = this,
                settings = self.settings,
                selectedOption = $(currentSelect).prop('selectedIndex'),
                debounceMethod = ba.debounce(function (e) {
                    var searchKey = keys.length - 1,
                        alphaMap = currentSelect.alphaMap,
                        customOptions = self.getCustomOptions(currentSelect);

                    if(alphaMap[keys[searchKey]]) {
                        $.each(alphaMap[keys[searchKey]], function(idx, keyIndex){
                            if((alphaMap[keys[searchKey]].length - 1) === idx){
                                $(customOptions)[keyIndex].focus();
                                selectedOption = keyIndex;
                                return false;
                            }else{
                                if(selectedOption === keyIndex) {
                                    return true;
                                }else{
                                    $(customOptions)[keyIndex].focus();
                                    selectedOption = keyIndex;
                                    return false;
                                }
                            }
                        });
                    }
                    keys = [];
                }, 100),
                searchFieldMethod = ba.debounce(function (e) {
                    var currentSearch = $(self.getSelectBox(currentSelect)).find(self.formatClass('searchFieldClass')),
                        customOptions = self.getCustomOptions(currentSelect);
                    if($(currentSearch).val() !== '') {
                        $.each(currentSelect.optionsArray, function(idx, opt){
                            if(opt.content.indexOf($(currentSearch).val()) > -1) {
                                $(customOptions[idx]).show();
                            }else{
                                $(customOptions[idx]).hide();
                            }
                        });
                    }else{
                        $(customOptions).show();
                    }
                }, 100);

            $(document).on('keydown', function(e) {
                var key;
                if($(e.target).hasClass(self.settings.classes.searchFieldClass)) {
                    searchFieldMethod(e);
                }else{
                    if(e.keyCode === settings.keyCodes.SPACE || e.keyCode === settings.keyCodes.ENTER) {
                        e.preventDefault();
                        $(e.target).trigger('click');
                    }else if(e.keyCode === settings.keyCodes.DOWN) {
                        e.preventDefault();
                        self.moveToOption(currentSelect, 'down', e.target);
                    }else if(e.keyCode === settings.keyCodes.UP){
                        e.preventDefault();
                        self.moveToOption(currentSelect, 'up', e.target);
                    }else{
                        key = String.fromCharCode(e.keyCode).toLowerCase();
                        keys.push(key);
                        debounceMethod(e);
                    }
                }
            });
        },

        /**
         * Standard Method that runs when any of the Super Selects
         * are triggered to open.
         * @param currentSelect jQueryDOM Object of Select
         */
        openOptions: function(currentSelect) {
            var self = this,
                settings = self.settings,
                customOptions = self.getCustomOptions(currentSelect),
                selectedOption = $(currentSelect).prop('selectedIndex');

            // Add Open Class to the Shiv, Create the Closing Element, and Attach Closing Element Events
            $(self.getSelectBox(currentSelect)).addClass(settings.classes.openClass)
                .after('<div class="' + settings.classes.closeClass + '" tabindex="' + (customOptions.length + 1) + '"></div>');

            $.each(customOptions, function(idx, opt){
               $(opt).attr('tabindex', idx + 1);
                if(idx === selectedOption) {
                    $(opt).focus();
                }
            });

            self.setKeyObservers(currentSelect);
            self.setCloseObserver(currentSelect);

            if($(currentSelect).attr('onclick') !== ''){
                $(currentSelect).trigger('click');
            }
        },

        /**
         * Vertically Centers Element
         * @param element | jQuery DOM Element you wish to be vertically centered.
         */
        verticallyCenterElements: function(element) {
            var marginTop = $(element).height()/2 * -1;

            $(element).css({
                'margin-top': marginTop + 'px'
            });
        },

        /**
         * Open Options Method for Overlay Selects
         * @param currentSelect jQueryDOM Object of Select
         */
        openOptionsOverlay: function(currentSelect) {
            var self = this,
                optionsBox = $(self.getOptionsContainer(currentSelect));

            self.verticallyCenterElements(optionsBox);
            self.openOptions(currentSelect);
        },

        /**
         * Open Options Method for Fullscreen Selects
         * @param currentSelect jQueryDOM Object of Select
         */
        openOptionsFullscreen: function(currentSelect) {
            var self = this,
                optionsList = $(self.getSelectBox(currentSelect)).find(self.formatClass('optionsContainerClass') + ' ul');

            self.verticallyCenterElements(optionsList);
            self.openOptions(currentSelect);
        },

        /**
         * Open Options Method for Fullthumb Selects
         * @param currentSelect jQueryDOM Object of Select
         */
        openOptionsFullthumb: function(currentSelect) {
            var self = this,
                settings = self.settings,
                customOptions = self.getCustomOptions(currentSelect),
                selectedOption = $(currentSelect).prop('selectedIndex');

            // Add Open Class to the Shiv, Create the Closing Element, and Attach Closing Element Events
            $(self.getSelectBox(currentSelect))
                .addClass(settings.classes.openClass)
                .addClass(settings.classes.setupClass)
                .after('<div class="' + settings.classes.closeClass + '" tabindex="' + (customOptions.length + 1) + '"></div>');

            $.each(customOptions, function(idx, opt){
                $(opt).attr('tabindex', idx + 1);
                if(idx === selectedOption) {
                    $(opt).focus();
                }
            });

            if($(currentSelect).hasClass(settings.classes.hideFirstClass)) {
                $(customOptions).first().hide();
                $.each(customOptions, function(idx, opt){
                   if(selectedOption === 0 && idx === ($(customOptions).first().attr('tabindex') + 1)) {
                       $(opt).focus();
                   }
                });
            }

            self.setKeyObservers(currentSelect);
            self.setCloseObserver(currentSelect);

            if($(currentSelect).attr('onclick') !== ''){
                $(currentSelect).trigger('click');
            }
        },

        /**
         * Open Options Method for Search Selects
         * @param currentSelect jQueryDOM Object of Select
         */
        openOptionsSearch: function(currentSelect) {
            var self = this,
                settings = self.settings,
                customOptions = self.getCustomOptions(currentSelect),
                searchField = $(self.getSelectBox(currentSelect)).find(self.formatClass('searchFieldClass'));

            // Add Open Class to the Shiv, Create the Closing Element, and Attach Closing Element Events
            $(self.getSelectBox(currentSelect)).addClass(settings.classes.openClass)
                .after('<div class="' + settings.classes.closeClass + '" tabindex="' + (customOptions.length + 1) + '"></div>');

            $(searchField).focus();

            self.setKeyboardObserversSearch(currentSelect);
            self.setCloseObserver(currentSelect);

            if($(currentSelect).attr('onclick') !== ''){
                $(currentSelect).trigger('click');
            }
        },

        /**
         * Close Options Method for All Selects
         * @param currentSelect jQueryDOM Object of Select
         */
        setCloseObserver: function(currentSelect) {
            var self = this,
                settings = self.settings,
                customOptions;

            $(currentSelect).siblings(self.formatClass('closeClass')).on('click', function(){
               $(self.getSelectBox(currentSelect))
                   .find(self.formatClass('shivClass'))
                   .trigger('click');

                customOptions = self.getCustomOptions(currentSelect);

                $.each(customOptions, function(idx, opt){
                    $(opt).attr('tabindex','-1');
                });

                $(currentSelect).focus().trigger('custom:blur');
                $(document).off('keydown');
            });

            // Trigger Close Event when on Close Element
            $(document).on('keydown', function(e){
                if($(e.target).context === $(currentSelect.siblings(self.formatClass('closeClass')))[0]) {
                    if(e.keyCode === settings.keyCodes.SPACE || e.keyCode == settings.keyCodes.ENTER) {
                        e.preventDefault();
                        $(currentSelect).siblings(self.formatClass('closeClass')).trigger('click');
                    }
                }
            });

            $(currentSelect).on('blur', function(){
                $(currentSelect).siblings(self.formatClass('closeClass')).trigger('click');
            });
        },

        /**
         * Default Method that sets Observers on Super Select Options
         * @param currentSelect jQueryDOM Object of Select
         */
        setOptionObservers: function(currentSelect) {
            var self = this,
                customOptions = self.getCustomOptions(currentSelect);

            $.each($(customOptions), function(optionIndex, opt){
                $(opt).on('click', function(){
                    $(currentSelect).data('optionselected','true');
                    $(customOptions).removeClass('selected');
                    $(opt).addClass('selected');
                    $(currentSelect).prop('selectedIndex',optionIndex);
                    $(currentSelect)[0].triggerEvent('change');
                    $(document).off('keydown');
                });
            });
        },

        /**
         * Move to the next or previous option.
         * @param currentSelect jQueryDOM Object of Select
         * @param direction string based on arrow key pressed.
         */
        moveToOption: function(currentSelect, direction, target) {
            var self = this,
                selectedOption = $(target),
                customOptions = self.getCustomOptions(currentSelect),
                newOption;

                if(direction === 'down') {
                    if((selectedOption.attr('tabindex')*1) === customOptions.length) {
                        newOption = $(target).parent().find('li').first();
                    }else{
                        newOption = $(target).next();
                    }
                }else{
                    if((selectedOption.attr('tabindex') - 1) === 0) {
                        newOption = $(target).parent().find('li').last();
                    }else{
                        newOption = $(target).prev();
                    }
                }

                $(newOption).focus();
        },

        /**
         * Helper to Easily get Current Select's Parent
         * @param currentSelect jQueryDOM Object of Select
         * @returns Object jQuery DOM Object of Current Super Select's Parent
         */
        getParentContainer: function(currentSelect) {
            var self = this;

            return $(currentSelect).parent(self.formatClass('containerClass'));
        },

        /**
         * Helper to Easily get Current Select's Box Container
         * @param currentSelect jQueryDOM Object of Select
         * @returns Object jQuery DOM Object of Current Super Select's Box Container
         */
        getSelectBox: function(currentSelect) {
            var self = this;

            return $(currentSelect).siblings(self.formatClass('boxClass'));
        },

        /**
         * Helper to Easily get Current Select's Options Container
         * @param currentSelect jQueryDOM Object of Select
         * @returns Object jQuery DOM Object of Current Super Select's Options Container
         */
        getOptionsContainer: function(currentSelect) {
            var self = this;

            return $(self.getSelectBox(currentSelect)).find(self.formatClass('optionsContainerClass'));
        },

        /**
         * Returns Custom Options of current Super Select
         * @param currentSelect jQuery DOM Object of Select
         * @returns Object jQuery DOM Object of Current Super Selects Children
         */
        getCustomOptions: function(currentSelect) {
            var self = this,
                selectBox = self.getSelectBox(currentSelect),
                customOptions = $(selectBox)
                    .find(self.formatClass('optionsContainerClass') + ' ul')
                    .children();

            return customOptions;
        },

        /**
         * Returns the Camel Case Name of the current select type.
         * Used for dynamically calling methods based on the select
         * type.
         * @param currentSelect jQuery DOM Object of Select
         * @returns {*|String} Name of current select type in Camel Case.
         */
        getDynamicSelectName: function(currentSelect) {
            var self = this;
            return ba.camelCaseCreator(self.getSelectType(currentSelect));
        },

        /**
         * Converts Class into css selector.
         * @param classString setting value you wish to convert to css selector.
         * @returns {string} css selector.
         */
        formatClass: function(classString) {
            return '.' + this.settings.classes[classString];
        },
    };

})(jQuery);

ba.moduleLoader.define('SuperSelectsCore', ['jQuery'], function($) {
    return SuperSelectsCore;
});

ba.moduleLoader.define('SuperSelects', ['jQuery', 'SuperSelectsCore'], function($, SuperSelectsCore){
    return new SuperSelectsCore({
        'moduleName': 'SuperSelects'
    });
});
