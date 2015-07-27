# green pistachio

it's like eating a **handful** of _pre-shelled_ front end magento plugins.

##### features
* Sass compilation of the 1.14 theme with LibSass
* Faster Development with Caching Turned on, cache only gets cleared when you make a change to an XML or PHTML file within your blueacornui/app directories.
* JS Linting for Code Quality Checks
* Staging Compilation Settings
* Production Compilation Settings
* Image Minification for JPG, PNG, GIF & SVG
* Autoprefixing for the most common supported browsers, and a seperate autoprefixing task for IE8
* Easy Setup Commands

##### handful of shelled pistachios
* Footer Assets module ([documentation](https://github.com/BlueAcornInc/ba-footer-assets/tree/master))
* CMS Page Style Update ([documentation](https://github.com/BlueAcornInc/gp-cms-page-style-update/tree/master))
* Sticky Header ([documentation](https://github.com/BlueAcornInc/gp-stickyheader/tree/master))
* Remove Link by Name ([documentation](https://github.com/BlueAcornInc/gp-remove-link-by-name/tree/master))

## quick start

##### module installation
* ensure you have installed [modman](https://github.com/colinmollenhour/modman)
* *ensure that symlinks are are enabled* in your System Configuration
  * System > Configuration > Advanced > Developer
  * Expand the *Template Settings* tab and change *Allow Symlinks* to "Yes"

```sh
cd /path/to/magento-webroot
modman init
modman clone git@github.com:BlueAcornInc/green-pistachio.git
```

##### theme compilation

green-pistachio uses [grunt](http://gruntjs.com/) and [bower](http://bower.io/) to build your theme by compiling and fetching assets.

modman will install a directory named **blueacornui** to your project's root containing the build scripts for your theme.

* ensure you have nodejs and [npm](https://www.npmjs.com/) installed
* ensure you have grunt-cli and bower installed globally
  * `sudo npm install -g grunt-cli bower`

**installation (one-time)**
```sh
cd /path/to/blueacornui
npm install
bower install
grunt setup:site
```

**live development**
Run the following command to watch your app & skin directories for changes and compile SASS & JS on save, as well as clear cache when you modify any XML or PHTML files.

```sh
cd /path/to/blueacornui
grunt
```


**theme compiling**
This will lint & compile all your SASS & JS files to css & minified js whenever you save a js, scss file.

If you modify a layout xml or phtml file within your package, the grunt shell command will automatically clear your magento cache.

```sh
cd /path/to/blueacornui
grunt compile
```

## overview

The Base Module allows developers to enable/disable various JavaScript plugins from the Admin in the **System > Configuration** section. Each plugin's dependencies (stylesheets, images, and minified JavaScript files) will be automatically loaded before the closing **&lt;/body&gt;** tag. This module has two other module dependencies:

##### plugins
The following plugins are currently available in Version 0.1.0

* Fancybox V 2.1.5
* BX Slider V 4.2.5
* Flexslider V 2.5.0
* jQuery ScrollTo V 2.1.1
* Selectivizr V 1.0.2
* Placeholder.js V 3.0.2
* SVG Injector V 1.1.3
* Headroom.js V 0.7.0
* Parallax.js V 1.3.1
* HTML5 Shiv V 3.7.3

Documentation for each plugin can be found by clicking on the **Source** link under each plugin's selectbox within the Admin



## usage
After you've installed this module, log into the Admin section of your store, and navigate to:

**System > Configuration**

You should see a new **BLUE ACORN** tab in the lefthand panel. Click on **JavaScript Plugins** within this tab to reveal the **Plugins** tab to the right. Expand this and you will see the plugins listed with a simple Yes/No select box for each to enable/disable them. Each plugin also has a **Source** link beneath the select boxes which will open a new tab redirecting you to the respective plugin's documentation.
