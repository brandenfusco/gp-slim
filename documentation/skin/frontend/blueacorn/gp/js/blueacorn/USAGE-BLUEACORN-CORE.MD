# BlueAcorn/Core

* Usage
    * [ba - BlueAcornCore](#ba)
    * [overrideSettings](#overridesettings)
    * [setupDebugging](#setupdebugging)
    * [watchConsole](#watch)


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

`setupDebugging(moduleSettings)` displays module specific information information in the console when Development Mode is set to `yes` in **System > Config > Blue Acorn > Style Guide**

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
		
		ba.myObject = new MyObject(){});
		
###[watchConsole](id:watch)

`watchConsole(message)` will console log development debugging information if **System > Config > Blue Acorn > Style Guide** Development Mode is set to `yes`.