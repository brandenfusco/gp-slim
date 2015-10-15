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
        require: function(moduleName, dependencies, moduleScope) {
            // If the first parameter is an object, assume it to be a module
            if (typeof moduleName === "object") {
                var module = moduleName;

                moduleName = module.name;
                dependencies = module.dependencies;
            }
            // If the module does not already exist, create it
            else if (!this.modules[moduleName]) {
                this.modules[moduleName] = {
                    name: moduleName,
                    dependencies: dependencies,
                    moduleScope: moduleScope,
                    loaded: false
                };
            }

            // If were not ready to start loading then stop here
            if (!this.data.ready) {
                this.data.predefined.push(moduleName);
                return false;
            }

            // Resolve scoping issues in for each loop
            var self = this;

            // If we have dependencies, load them first
            if (dependencies) {
                dependencies.forEach(function(dependency) {
                    self.require(self.getModuleByName(dependency));
                });
            }

            // If the module isnt already loaded, load it.
            if (!this.modules[moduleName].loaded) {
                this.modules[moduleName].loaded = true;
                this.modules[moduleName].result = this.load(this.modules[moduleName]);
            }
        },

        getModuleByName: function(moduleName) {
            return this.modules[moduleName];
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

            self.watchConsole(module.name + ' loaded!!!');

            // Call the module, with the instances of the dependencies set up
            return module.moduleScope.apply(this, dependencyInstances);
        },

        /**
         * Gets triggered on baCoreReady
         */
        start: function() {
            var self = this;

            self.data.ready = true;

            self.data.predefined.forEach(function(module){
                self.require(self.modules[module]);
            });
        }
    };

    /**
     * The parameter object is optional.
     * Must be an object.
     */
    ba.moduleLoader = new ModuleLoader({});
})(jQuery);