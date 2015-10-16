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

        /**
         * On baCoreReady, start module loading
         */
        setupObservers: function() {
            var self = this;

            $(document).on('baCoreReady', function() {
                self.data.ready = true;

                self.data.predefined.each(function(module){
                    self.require(module);
                });
            });
        },

        /**
         * Add module to be loaded
         *
         * @param moduleName
         * @param dependencies
         * @param moduleScope
         */
        define: function(moduleName, dependencies, moduleScope) {
            // If 2nd argument is a function
            if (typeof dependencies === 'function'){
                moduleScope = dependencies;
                dependencies = [];
            }

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

        /**
         * Get result of all dependencies before loading the module
         *
         * @param module
         */
        require: function(module) {
            // Resolve scoping issues in for each loop
            var self = this;

            // If we have dependencies, load them first
            if (!!module.dependencies.length) {
                module.dependencies.each(function(dependency) {
                    // If we're trying to load something that doesn't exist, we wont need to require it
                    self.modules[dependency] && self.require(self.modules[dependency]);
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
                    return self.modules[dependency] && self.modules[dependency].result;
                });

            // Call the module, with the instances of the dependencies set up
            return module.moduleScope.apply(this, dependencyInstances);
        }
    };

    /**
     * The parameter object is optional.
     * Must be an object.
     */
    ba.moduleLoader = new ModuleLoader({});
})(jQuery);