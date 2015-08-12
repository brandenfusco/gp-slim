/**
 * @package     Blueacorn/CustomFormElements
 * @version     2.0
 * @author      Blue Acorn <code@blueacorn.com>
 * @copyright   Copyright © 2015 Blue Acorn.
 */

function CustomFormElements(options) {
    this.init(options);
}

jQuery(document).ready(function ($) {

    CustomFormElements.prototype = {
        init: function (options) {
            this.settings = {
                'moduleName': 'CustomFormElements',
                'superSelects': true,
                'blackList': ['.no-style']
            };

            // Overrides the default settings
            ba.overrideSettings(this.settings, options);

            // Start the debugger
            ba.setupDebugging(this.settings);

            this.setObservers();
            this.updateAll();
        },

        // Set Custom Form Element Observers
        setObservers: function() {

            var self = this;

            $(document).on('update:radios', function(){
                self.customRadios();
                self.unsetCustom();
            });

            $(document).on('update:checkboxes', function(){
                self.customCheckboxes();
                self.unsetCustom();
            });

            $(document).on('section:update update:inputs', this.updateAll.bind(this));

            if(!this.settings.superSelects){
                $(document).on('update:selects', function(){
                    self.updateSelects();
                    self.updateShivs();
                    self.unsetCustom();
                });

                $(window).on('resize', function(){
                    self.updateSelects();
                    self.updateShivs();
                    self.unsetCustom();
                });
            }
        },

        // Update All Custom Form Elements, your update your settings
        // objects in the CustomFormElements & SuperSelects Modules
        updateAll: function() {
            this.customRadios();
            this.customCheckboxes();
            if(!this.settings.superSelects) {
                this.customSelects();
                this.updateShivs();
            }
            this.unsetCustom();
        },

        // Returns Label for Current Form Element
        getLabel: function(el) {
            var elementLabel, input = $(el);

            if($(input).siblings('label, span.label').length){
                elementLabel = $(input).siblings('label, span.label').first();
            } else if($(input).parent().siblings('label, span.label').length) {
                elementLabel = $(input).parent().siblings('label, span.label').first();
            } else if($(input).parent('label').length){
                elementLabel = $(input).parent('label');
            } else {
                $(input).after('<label for="' + $(input).attr('id') + '"></label>');
                elementLabel = $(input).siblings('label');
            }

            return elementLabel;
        },

        // Returns Label Type for Current Form Element
        getLabelType: function(el) {
            var labelType = 'label', label = $(el);

            if(($(label).siblings('span.label').length) || ($(label).parent().siblings('span.label').length)) {
                labelType = 'span';
            }

            return labelType;
        },

        // Remove Classes from Label Element
        resetLabels: function(el, type) {
            $(el).removeClass(type + ' disabled checked');
        },

        // Add Form Element Attribute Properties
        setProperties: function(labelElement, labelInput, prop) {

            if($(labelInput).prop(prop) && labelElement) {
                $(labelElement).addClass(prop);
            }
        },

        // Return the Input Element for the Label Element Supplied.
        getLabelInput: function(labelType, labelElement) {
            var labelFor,
                labelInput,
                label = $(labelElement);

            if(labelType === 'label') {
                labelFor = $(label).attr('for');
                if(labelFor.indexOf(':') != '-1') {
                    labelFor = labelFor.replace(':', '\\:');
                }
                labelInput = $('#' + labelFor + ', input[name="' + labelFor + '"]');
            } else {
                labelInput = $(label).siblings('input');
            }

            return labelInput;
        },

        // Build out custom Radio & Checkbox Inputs
        buildCustomInput: function(type, elements) {
            var self = this, inputElements = $(elements);

                if(inputElements.length > 0) {
                    $.each(inputElements, function(idx, el){
                        var label = self.getLabel(el),
                            labelType = self.getLabelType(el);

                        self.resetLabels(label, type + '-label');
                        self.setProperties(label, el, 'checked');
                        self.setProperties(label, el, 'disabled');

                        if(label) {
                            $(label).addClass(type + '-label');
                            $(el).addClass('input-custom');

                            $(label).off('click').on('click', function(event){
                                event.stopPropagation();
                                event.preventDefault();

                                var labelInput = $(event.target).closest(labelType),
                                    input = self.getLabelInput(labelType, labelInput);

                                if($(input).prop('checked')){
                                    $(labelInput).removeClass('checked');
                                    $(input).prop('checked', false);
                                }else{
                                    $(labelInput).addClass('checked');
                                    $(input).prop('checked', true);
                                }

                                if(type == 'radio') {
                                    var groupRadio = $(input).attr('name');

                                    if(!$(input).prop('disabled')){
                                        self.updateRadioGroup(groupRadio, labelType);

                                        $(input).prop('checked',true);
                                        $(labelInput).addClass('checked');
                                    }
                                }

                                if($(input).attr('onclick')){
                                     $(input)[0].onclick.apply($(input)[0]);
                                }

                            });
                        }
                    });
                }
        },

        // Build out to Create Custom Radios and Assign Applicable Observers
        customRadios: function() {
            var radioElements =  $('input[type="radio"].radio'),
                self = this;

            self.buildCustomInput('radio', radioElements);
        },

        // Method to uncheck all radios in a group and
        // remove any associated checked state classes
        // from their labels.
        updateRadioGroup: function(group, labelType){

            $('input[name="' + group + '"]').each(function(idx, el){
                $(el).prop('checked', false);
                $(el).siblings(labelType).removeClass('checked');
                if($(el).parent('label').length > 0){
                    $(el).parent('label').removeClass('checked');
                }
            });
        },

        // Build out to Create Custom Checkboxes and Assign Applicable Observers
        customCheckboxes: function(){
            var self = this, checkboxElements = $('input[type="checkbox"].checkbox');

            self.buildCustomInput('checkbox', checkboxElements);
        },

        // Method Runs before Custom Selects Are Built
        customSelectsBefore: function(){
            var smallSelects = $('#select-language, .toolbar select, .review-heading .pager select, .review-customer-index .pager select, .small-select');

            // Add Class for Selects that would normally need to be smaller in designs.
            $(smallSelects).addClass('sm');
        },

        selectStatus: function(selectElement) {
            console.log($(selectElement).parent('.select-container').length > 0 || $(selectElement).prop('multiple'));

            return $(selectElement).parent('.select-container').length > 0 || $(selectElement).prop('multiple');
        },

        setSelectTitle: function(selectElement, selectTruncate) {

            var selectTitle,
                selectedOptions,
                select = $(selectElement);

            if(select.attr('title')) {
                selectTitle = select.attr('title').strip().truncate(selectTruncate);
            }

            selectTitle = select.children().first().html().strip().truncate(selectTruncate);

            selectedOptions = select.children('option:selected').text();

            if(selectedOptions.length > 0) {
                selectTitle = selectedOptions.strip().truncate(selectTruncate);
            }

            return selectTitle;

        },

        setSelectWrapper: function(selectElement) {
            var select = $(selectElement),
                selectParent = select.parent();

            if(select.prev().length > 0 && (!select.parent().hasClass('input-box') || !select.parent().hasClass('v-fix'))) {
                select.wrap('<div class="input-box"></div>');
            }

            select.parent().addClass('select-container');
        },

        setSelectWrapperStatus: function(selectElement) {
            var select = $(selectElement),
                selectParent = select.parent();

            if(select.prop('disabled')) {
                selectParent.addClass('disabled');
            }else{
                selectParent.removeClass('disabled');
            }

            if(select.hasClass('sm')) {
                selectParent.addClass('small');
            }

        },

        setSelectObservers: function(selectElement) {
            var self = this,
                select = $(selectElement),
                shiv = select.siblings('.custom-shiv');

            select.on('change', self.updateShivs);

            select.on('mouseover', function() {
                shiv.addClass('hover');
            });

            select.on('mouseout', function() {
                shiv.removeClass('hover');
            });
        },

        customSelects: function(){

            var self = this,
                selectElements = $('select'),
                selectTruncate = 36;

            this.customSelectsBefore();

            if(selectElements.length > 0) {
                $.each(selectElements, function(idx, el){

                    var selectTitle, selectSize, select = $(el);

                    if(self.selectStatus(el)) {
                        return;
                    }

                    select.addClass('select-custom').data('truncate', selectTruncate);

                    self.setSelectWrapper(select);
                    self.setSelectWrapperStatus(select);

                    selectTitle = self.setSelectTitle(select, selectTruncate);

                    if(select.siblings('.custom-shiv').length === 0) {
                        select.before('<span class="custom-shiv">' + selectTitle + '<span></span></span>');
                    }

                    self.setSelectObservers(select);
                    self.updateSelects();

                });
            }

        },

        updateShivs: function(){
            var selectShivs = $('.custom-shiv');

            $.each(selectShivs, function(){
                var selectElement, optionValue, truncateOption;

                selectElement = $(this).siblings('select');
                optionValue = $(selectElement).find('option:selected').text();
                truncateOption = $(selectElement).data('truncate');

                $(this).html(optionValue.strip().truncate(truncateOption) + '<span></span>');
            });
        },

        updateSelects: function(){
            var selectShivs = $('.custom-shiv');

            $(selectShivs).each(function(){
                if($(this).siblings('select').css('display') === 'none'){
                    $(this).css('display','none');
                }else{
                    $(this).css('display','');
                }

                $(this).parent('.select-container').removeClass('disabled');

                if($(this).siblings('select').prop('disabled')){
                    $(this).parent('.select-container').addClass('disabled');
                }
            });
        },

        unsetCustom: function() {
            var self = this;

            $.each(self.settings.blackList, function(idx, listItem){

                $.each($(listItem), function(idx, el){
                    if($(el).prop('tagName') == "SELECT"){
                        self.unsetCustomSelect(el);
                    } else {
                        self.unsetCustomInput(el);
                    }
                });
            });
        },

        unsetCustomSelect: function(el) {

            // Remove Additional Styling from Parent Container
            $(el).parent('.select-container').removeClass('select-container');

            // Remove Custom Styling from Select Element
            $(el).removeClass('custom-select select-custom disabled');

            $(el).siblings('.custom-shiv').remove();

        },

        unsetCustomInput: function(el) {
            $(el).removeClass('input-custom');

            if($(el).siblings('.radio-label, .checkbox-label').length > 0){
                $(el).siblings('.radio-label, .checkbox-label').removeClass('radio-label checkbox-label');
            }else if($(el).parent().siblings('.radio-label, .checkbox-label').length > 0){
                $(el).parent().siblings('.radio-label, .checkbox-label').removeClass('radio-label checkbox-label');
            }
        }
    };

    /**
     * The parameter object is optional.
     * Must be an object.
     */
    ba.CustomFormElements = new CustomFormElements({});

});