Event.observe(window, 'load', function () {

    // Prototype for Magento
    // -- Configurable Product JS Updates
    if(typeof Product !== "undefined") {
        if(typeof Product.Config !== "undefined") {

            // Adding Custom Event Triggering for Custom Selects
            Product.Config.prototype.resetChildren = Product.Config.prototype.resetChildren.wrap(
                function(parentFunction, element) {
                    parentFunction(element);
                    jQuery(document).trigger('update:selects');
                }
            );

            // Updating Configuration for Custom Events to Trigger on Element Change
            Product.Config.prototype.configureForValues = Product.Config.prototype.configureForValues.wrap(
                function(parentFunction) {
                    parentFunction();
                    this.settings.each(function(element){
                        jQuery(element).on('change', this.configure.bind(this));
                    }.bind(this));
                }
            );

            // Adding Custom Event Triggering for Custom Selects
            Product.Config.prototype.configureElement = Product.Config.prototype.configureElement.wrap(
                function(parentFunction, element){
                    parentFunction(element);
                    jQuery(document).trigger('update:selects');
                }
            );
        }
    }

    // -- Bundled Products
    if(typeof Product !== "undefined"){
        if(typeof Product.Bundle !== "undefined") {

            // Adding Custom Event Triggering for Custom Selects
            Product.Bundle.prototype.changeSelection = Product.Bundle.prototype.changeSelection.wrap(
                function(parentFunction, selection){
                    parentFunction(selection);
                    jQuery(document).trigger('update:inputs');
                }
            );
        }
    }

    if($$('.catalog-product-view').length > 0 && typeof Enterprise !== "undefined"){
        if(typeof Enterprise.Bundle !== "undefined") {

            // Adding Custom Event Triggering for Custom Selects
            Enterprise.Bundle.selection = Enterprise.Bundle.selection.wrap(
                function(parentFunction, optionId, selectionId){
                    parentFunction(optionId, selectionId);
                    jQuery(document).trigger('update:inputs');
                }
            );
        }
    }

    // -- Form Validation
    if(typeof Validation !== "undefined"){

        // Adding Event for Firing Magento Validation when using Custom Selects.
        Validation.prototype.initialize = Validation.prototype.initialize.wrap(
            function(parentFunction, form, options){
                parentFunction(form, options);
                if(this.options.immediate) {
                    Form.getElements(this.form).each(function(input) {
                        if(input.tagName.toLowerCase() == 'select') {
                            jQuery(input).on('custom:blur', Validation.validate(this));
                        }
                    }, this);
                }
            }
        );
    }

    // -- Checkout
    if(typeof Checkout !== "undefined") {

        // Extending Checkout to Fire Custom Events when Switching Checkout Steps
        Checkout.prototype.gotoSection = Checkout.prototype.gotoSection.wrap(
            function(parentFunction, section, reloadProgressBlock) {
                parentFunction(section, reloadProgressBlock);
                jQuery(document).trigger('section:update');
                jQuery(document).trigger('section:' + section);

                if(this.currentStep === "shipping_method"){
                    window.setTimeout(function(){
                        jQuery(document).trigger('section:update');
                    }, 100);
                }
            }
        );
    }

    // -- Checkout Payment Customer Balance Checkbox
    if(typeof Payment !== "undefined") {

        // Adding functionality to Fire Applicable method when clicking Label instead of Form Element due to Race Condition
        if(typeof Payment.prototype.switchCustomerBalanceCheckbox !== "undefined") {
            if($('use_customer_balance').up().down('.checkbox-label').length > 0) {
                $('use_customer_balance').up().down('.checkbox-label').observe('click', function(){
                    setTimeout(payment.switchCustomerBalanceCheckbox, 100);
                });
            }
        }
    }

    // -- Checkout Shipping
    if(typeof Shipping !== "undefined") {

        // Triggering Custom Form Element Custom Event when Clicking Use Billing Address for Shipping
        Shipping.prototype.syncWithBilling = Shipping.prototype.syncWithBilling.wrap(
            function(parentFunction){
                parentFunction();
                jQuery(document).trigger('update:selects');
            }
        );

        // Firing Custom Checkout Step Event when going back to the
        // Shipping Step after visiting the following steps.
        Shipping.prototype.nextStep = Shipping.prototype.nextStep.wrap(
            function(parentFunction, transport) {
                parentFunction(transport);
                jQuery(document).trigger('section:update');
            }
        );
    }

    if(typeof shipping !== "undefined") {

        // Triggering Custom Form Element Custom Event when Clicking Use Billing Address for Shipping
        shipping.setSameAsBilling = shipping.setSameAsBilling.wrap(
            function(parentFunction, flag) {
                parentFunction(flag);
                jQuery(document).trigger('update:selects');
            }
        );

        // Triggering Custom Form Element Custom Event when Clicking Use Billing Address for Shipping
        shipping.syncWithBilling = shipping.syncWithBilling.wrap(
            function(parentFunction) {
                parentFunction();
                jQuery(document).trigger('update:selects');
            }
        );
    }

    if(typeof Billing !== "undefined") {

        // Firing Custom Checkout Step Event when going back to the
        // Billing Step after visiting the following steps.
        Billing.prototype.nextStep = Billing.prototype.nextStep.wrap(
            function(parentFunction, transport) {
                parentFunction(transport);
                jQuery(document).trigger('section:update');
            }
        );
    }

    if(typeof ShippingMethod !== "undefined") {

        // Firing Custom Checkout Step Event when going back to the
        // Select Shipping Method Step after visiting the following steps.
        ShippingMethod.prototype.nextStep = ShippingMethod.prototype.nextStep.wrap(
          function(parentFunction, transport) {
              parentFunction(transport);
              jQuery(document).trigger('section:update');
          }
        );
    }

    // -- Related Products Checkboxes
    if($$('.related-checkbox').length > 0){

        // Updating Related Items Widget Inputs to include a proper Label Element
        // So Custom Checkboxes Work Correctly
        jQuery.each(jQuery('.related-checkbox'), function(idx, el){
            if(jQuery(el).siblings('label, span.label').length === 0) {
                jQuery(el).after('<label for="' + jQuery(el).attr('name') + '"></label>');
                jQuery(document).trigger('update:checkboxes');
            }
        });
    }

    // -- Fix issue with Elevate Zoom on Review Pages
    if(typeof ProductMediaManager !== "undefined"){
        ProductMediaManager.createZoom = ProductMediaManager.createZoom.wrap(
            function(parentFunction, image) {
                if($$('.catalog-product-view').length) {
                    parentFunction(image);
                }
            }
        );
    }


}.bind(window));


(function(){
    // -- RegionUpdater
    // Firing Custom Form Element Update Event on RegionUpdate.update
    if(typeof RegionUpdater !== "undefined") {
        RegionUpdater.prototype.update = RegionUpdater.prototype.update.wrap(
            function(parentFunction){
                parentFunction();
                jQuery(document).trigger('update:selects');
            }
        );
    }
})(jQuery);
