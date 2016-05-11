#BlueAcorn/MagentoOverrides

* Overrides
	* [Product](#product)
		* [Product.Config](#config)
		* [Product.Bundle](#bundle)
		* [Enterprise.Bundle](#enterprisebundle)
		* [Related Items](#related)
		* [ProductMediaManager](#productmediamanager)
	* [Validation](#validation)
	* [Cart/Checkout](#checkout)
		* [Payment](#payment)
		* [Shipping](#shipping)
		* [Billing](#billing)
		* [Shipping Method](#shippingmethod)
		* [RegionUpdater](#region)
		
## [Product](id:product)

###[Product.Config](id:config)


| Method | Description |
|--------|-------------|
| `resetChildren` | **After** the `Product.Config.prototype.resetChildren` method is hit `update:selects` custom event fires. |
| `configureForValues | Fires jQuery `change` event on Configurable Product Selects when `Product.Config.prototype.configureForValues` method is hit. |
| `configureElement` | **After** the `Product.Config.prototype.configureElement` method is hit `update:selects` custom event fires. |

### [Product.Bundle](id:bundle)

| Method | Description |
|--------|-------------|
| `changeSelection` | **After** the `Product.Bundle.prototype.changeSelection` method is hit `update:inputs` custom event fires. |

### [Enterprise.Bundle](id:enterprisebundle)


| Method | Description |
|--------|-------------|
| `selection` | **After** the `Enterprise.Bundle.selection` method is hit `update:inputs` custom event fires. |

### [Related Items](id:related)


| Description |
|-------------|
| Adds `label` element after the Related Items Checkboxes so that `customCheckboxes` can be applied, triggers `update:checkboxes` custom event after creation of labels. |

### [ProductMediaManager](id:productmediamanager)


| Method | Description |
|--------|-------------|
| `createZoom` | Fix for ProductMediaManager.createZoom throwing an erro on Review Pages |

## [Validation](id:validation)

| Method | Description |
|--------|-------------|
| `initialize` | On instantiation of the `Validation` Class `select` elements trigger `Validation.validate(this)` on `blur` event. |

## [Cart/Checkout](id:checkout)

| Method | Description |
|--------|-------------|
| `gotoSection` | **After** the `Checkout.prototype.gotoSection` method is hit the `section:update` & `section:{section variable}` custom events fire. **If** `this.curentStep` is `shipping_method`, `section:update` triggers on a **100ms** delay. |

### [Payment](id:payment)

| Method | Description |
|--------|-------------|
| `switchCustomerBalanceCheckbox` | Fix for `customCheckboxes` if `#use_customer_balance` checkbox's `label` is clicked, trigger `payment.switchCustomerBalanceCheckbox` on **100ms** delay. |
| `switchMethod` |Firing Custom Events in Payment when switching method. |

### [Shipping](id:shipping)

| Method | Description |
|--------|-------------|
| `Shipping.syncWithBilling` | **After** the `Shipping.prototype.syncWithBilling` method is hit `update:selects` custom event fires. |
| `Shipping.nextStep` | **After** the `Shipping.prototype.nextStep` method is hit `section:update` custom event fires. |
| `shipping.setSameAsBilling` | **After** the `shipping.setSameAsBilling` method is hit `update:selects` custom event fires. |
| `shipping.syncWithBilling` | **After** the `shipping.syncWithBilling` method is hit `update:selects` custom event fires. |

### [Billing](id:billing)

| Method | Description |
|--------|-------------|
| `nextStep` | **After** the `Billing.prototype.nextStep` method is hit `section:update` custom event fires. |
| `newAddress` | Firing Custom Checkout Step Event when adding a new address in Billing Form. |

### [Shipping Method](id:shippingmethod)

| Method | Description |
|--------|-------------|
| `nextStep` | **After** the `ShippingMethod.prototype.nextStep` method is hit `section:update` custom event fires. |

### [RegionUpdater](id:region)

| Method | Description |
|--------|-------------|
| `update` | **After** the `RegionUpdater.prototype.update` method is hit `update:selects` custom event fires. |
