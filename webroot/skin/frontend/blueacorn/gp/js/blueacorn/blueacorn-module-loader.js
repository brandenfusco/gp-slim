/**
 * @package     Blueacorn/ModuleLoader
 * @version     1.0
 * @author      Blue Acorn <code@blueacorn.com>
 * @copyright   Copyright © 2015 Blue Acorn.
 */

function ModuleLoader(options) {
    this.init(options);
}

(function($){

    ModuleLoader.prototype = {
        init: function (options) {
            this.settings = {
                'moduleName': 'ModuleLoader'
            };

            // Object to store module declarations
            this.modules = {};

            // Internal Data Storage
            this.data = {
                predefined: [],
                started: false
            };

            // Overrides the default settings
            ba.overrideSettings(this.settings, options);

            // Start the debugger
            ba.setupDebugging(this.settings);

            this.setupObservers();
        },
        setupObservers: function() {
            $(document).on('baCoreReady', $.proxy(this.start, this));
        },

        /**
         * Add module to be loaded
         *
         * @param moduleName
         * @param dependencies
         * @param moduleScope
         */
        define: function(moduleName, dependencies, moduleScope) {
            if (!this.modules[moduleName]) {
                this.modules[moduleName] = {
                    name: moduleName,
                    dependencies: dependencies,
                    moduleScope: moduleScope,
                    loaded: false
                };

                if (this.data.ready) {
                    this.require(this.modules[moduleName]);
                } else {
                    this.data.predefined.push(this.modules[moduleName]);
                }
            }
        },

        require: function(module) {
            // Resolve scoping issues in for each loop
            var self = this;

            // If we have dependencies, load them first
            if (module.dependencies) {
                module.dependencies.each(function(dependency) {
                    self.require(self.getModuleByName(dependency));
                });
            }

            // If the module isnt already loaded, load it.
            if (!this.modules[module.name].loaded) {
                this.modules[module.name].loaded = true;
                this.modules[module.name].result = this.load(module);
            }
        },

        /**
         * Call module with dependencies injected as arguments
         *
         * @param module
         * @returns {*}
         */
        load: function(module) {
            var self = this,
                dependencyInstances = module.dependencies.map(function(dependency) {
                    return self.modules[dependency].result;
                });

            // Call the module, with the instances of the dependencies set up
            return module.moduleScope.apply(this, dependencyInstances);
        },

        /**
         * Gets triggered on baCoreReady
         */
        start: function() {
            var self = this;

            self.data.ready = true;

            self.data.predefined.each(function(module){
                self.require(module);
            });
        }
    };

    /**
     * The parameter object is optional.
     * Must be an object.
     */
    ba.moduleLoader = new ModuleLoader({});

    ba.moduleLoader.define('Config', [], function() {
        alert("Config");
    });
})(jQuery);