# BlueAcorn/Core

* Events
	*  [baCoreReady](#ready)
	*  [Native Browser Events](#native)

* Usage
    * [ba - BlueAcornCore](#ba)
    * [overrideSettings](#overridesettings)
    * [setupDebugging](#setupdebugging)
    * [watchConsole](#watch)
    * [checkForElement](#check)
    * [debounce](#debounce)
    * [triggerEvent](#triggerEvent)

## Events

###[baCoreReady](id:ready)

Established for dependencies, `baCoreReady` fires on `document:ready` when the `ba` instance of `BlueAcornCore` is instantiated. 

##### Example:

		$(document).on('baCoreReady', customFunction);

## Usage

###[ba](id:ba)

`ba` is a global object in which all Blue Acorn Developed Front End Javascript should be attached.

##### How to attach a javascript object to `ba`:

		ba.myObject = new MyObject({});

##### When to use `ba`:

`ba` should be used whenever you are creating custom javascript functionality for Magento's frontend.  The easiest way to do so is by using the `jsmodule` snippet available in [Blue Acorn's Developer Bootstrap](https://github.com/BlueAcornInc/developer-bootstrap)

###[overrideSettings](id:overridesettings)

`overrideSettings(settings, options)` is used to override a settings object with a an options object passed during the instantiation of the module/class-like-object.

##### Parameters:

| `@param` | Description |
|----------|-------------|
| `settings` | Default Settings Object for your Module, generally `this.settings` |
| `options` | Additional Options Object passed to your module on instantiation. |

##### Example:

		function MyObject(options) {
			this.init(options);
		}
		
		MyObject.prototype = {
			init: function(options) {
				this.settings {
					'moduleName': 'MyObject'
					'debug': false
				}
				
				ba.overrideSettings(this.settings, options);
				
				ba.watchConsole(this.settings); // Will return {'moduleName':'MyObject','debug':true}
			}
		};
		
		ba.myObject = new MyObject({
			'debug': true
		});
		
###[setupDebugging](id:setupdebugging)

`setupDebugging(moduleSettings)` displays module specific information information in the console when Development Mode is set to `yes` in **System > Config > Blue Acorn > Green Pistachio Settings**

##### Parameters:

| `@param` | Description |
|----------|-------------|
| `moduleSettings` | Default Settings Object for your Module, generally `this.settings` |

##### Example:

		function MyObject(options) {
			this.init(options);
		}
		
		MyObject.prototype = {
			init: function(options) {
				this.settings = {
					'moduleName': 'MyObject',
					'debug': false
				}
			
				ba.setupDebugging(this.settings);
				
				/* 
				 * Will Console Log:
				 * MyObject Loaded!!!
				 * {'moduleName':'MyObject','debug':false}
				 */
			 }
		};
		
		ba.myObject = new MyObject({});
		
###[watchConsole](id:watch)

`watchConsole(message)` will console log development debugging information if **System > Config > Blue Acorn > Green Pistachio Settings** Development Mode is set to `yes`.

###[checkForElement](id:check)

`checkForElement($element)` returns if the element passed exists in the `DOM`.

| `@param` | Description |
|----------|-------------|
| `$element` | `DOM` element you would like to detect passed as `String` |

##### Example:

		function MyObject(options) {
			this.init(options)
		}
		
		MyObject.prototype = {
			init: function(options) {
				this.settings = {
					'moduleName': 'MyObject',
					'debug': false
				}
				
				if(ba.checkForElement('body')){
					// Execute Custom JS
				}
		};
		
		ba.myObject = new MyObject({});
		
###[debounce](id:debounce)

`debounce(func, wait, immediate)`  Returns a function that will only be triggered once, after inactivity of `wait` ms, ported from [_underscore.js](http://underscorejs.org/docs/underscore.html)

###[triggerEvent](id:triggerEvent)

Attached to `Element.prototype`, fires native events on elements, such as `change`, `click`, `focus`, etc.  Better alternative to `jQuery` `Element.trigger` and `PrototypeJS` `Element.fire`