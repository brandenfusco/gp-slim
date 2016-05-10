# Green Pistachio

It's like eating a **handful** of _pre-shelled_ front end magento plugins.

#### Table of Contents

1. [Features](#features)
2. [Quick Start](#quickstart)
	1. [Module Installation](#module)
		2. [Using Modman](#usingmodman)
	2. [Theme Compilation](#theme)
	3. [Theme Setup](#setup)
4. [Usage](#usage)
3.	[Javascript Plugins Overview](#overview)
	1. [Plugins](#javascriptplugins)
		1. [Usage](#jspluginsusage)



##### [Features](id:features)
* Sass compilation of the 1.14 theme with LibSass
* Multi Theme Support with Theme Hierarchy Compilation
* Faster Development with Caching Turned on, cache only gets cleared when you make a change to an XML or PHTML file within your blueacornui/app directories.
* JS Linting for Code Quality Checks
* Staging Compilation Settings
* Production Compilation Settings
* Image Minification for JPG, PNG, GIF & SVG
* Autoprefixing for the most common supported browsers, and a seperate autoprefixing task for IE8
* Easy Setup Commands

##### [Handfull of Shelled Pistachios](id:pistachios)
* Footer Assets module ([documentation](https://github.com/BlueAcornInc/ba-footer-assets/tree/master))
* CMS Page Style Update ([documentation](https://github.com/BlueAcornInc/gp-cms-page-style-update/tree/master))
* Remove Link by Name ([documentation](https://github.com/BlueAcornInc/gp-remove-link-by-name/tree/master))

## [Quick Start](id:quickstart)

##### [Module Installation](id:module)
* Ensure you have installed [modman](https://github.com/colinmollenhour/modman)
* Ensure you have installed Magento Enterprise Edition and gone through the installer or pointed your Magento Installation to an active database.
* Ensure that your Magento Installation uses a **webroot** directory to house your Magento Installtion.

###### [Using Modman](id:usingmodman)

	$: cd /path/to/magento/webroot
	$/path/to/magento/webroot/: modman init
	$/path/to/magento/webroot/: modman clone git@github.com:BlueAcornInc/green-pistachio.git


##### [Theme Compilation](id:theme)

green-pistachio uses [grunt](http://gruntjs.com/) and [bower](http://bower.io/) to build your theme by compiling and fetching assets.

modman will install a directory named **blueacornui** to your project's root containing the build scripts for your theme.

* ensure you have nodejs and [npm](https://www.npmjs.com/) installed
* ensure you have grunt-cli and bower installed globally

**installation (one-time)**

	$: cd /path/to/blueacornui
	$/path/to/blueacornui/: sh setup.sh site

**live development**
Run the following command to watch your app & skin directories for changes and compile SASS & JS on save, as well as clear cache when you modify any XML or PHTML files.


	$: cd /path/to/blueacornui
	$/path/to/blueacornui/: grunt


**theme compiling**
This will lint & compile all your SASS & JS files to css & minified js whenever you save a js, scss file.

If you modify a layout xml or phtml file within your package, the grunt shell command will automatically clear your magento cache.

	$: cd /path/to/blueacornui
	$/path/to/blueacornui/: grunt compile

##### [Theme Setup](id:setup)

You'll need to update `blueacornui/configs/themes.js` and include the themes you will want for compilation.

## Usage

[Green Pistachio Skin Usage Guide](documentation/README.MD)


## [Javascript Plugins Overview](id:overview)

The Base Module allows developers to enable/disable various JavaScript plugins from the Admin in the **System > Configuration** section. Each plugin's dependencies (stylesheets, images, and minified JavaScript files) will be automatically loaded before the closing **&lt;/body&gt;** tag. This module has two other module dependencies:

##### [plugins](id:javascriptplugins)
The following plugins are currently available in Version 4.3.0

| Plugin Name      | Version        | Documentation Link |
|------------------|----------------|--------------------|
|BX Slider         | 4.2.5          | [Documentation](https://github.com/stevenwanderski/bxslider-4)
|Fancybox          | 2.1.5          | [Documentation](http://fancyapps.com/fancybox/)
|Flexslider        | 2.5.0          | [Documentation](https://github.com/woothemes/FlexSlider)
|Focus Point       | 1.1.1          | [Documentation](https://github.com/jonom/jquery-focuspoint)
|Headroom.js       | 0.7.0          | [Documentation](https://github.com/WickyNilliams/headroom.js)
|HTML5 Shiv        | 3.7.3          | [Documentation](https://github.com/aFarkas/html5shiv)
|jQuery ScrollTo   | 2.1.1          | [Documentation](https://github.com/flesler/jquery.scrollTo)
|Owl Carousel      | 2.0.0-beta.2.4 | [Documentation](https://github.com/OwlCarousel2/OwlCarousel2)
|Parallax.js       | 1.3.1          | [Documentation](http://pixelcog.github.io/parallax.js/)
|Placeholder.js    | 3.0.2          | [Documentation](https://github.com/jamesallardice/Placeholders.js)
|Responsive Images | 1.1            | [Documentation](https://github.com/kvendrik/responsive-images.js)
|Selectivizr       | 1.0.2          | [Documentation](http://selectivizr.com/)
|Spin.js           | 2.3.2          | [Documentation](http://spin.js.org/)
|SVG Injector      | 1.1.3          | [Documentation](https://github.com/iconic/SVGInjector)

Documentation for each plugin can also be found by clicking on the **Source** link under each plugin's selectbox within the Admin

##### [Javascript Plugins Usage](id:jspluginsusage)
After you've installed this module, log into the Admin section of your store, and navigate to:

**System > Configuration**

You should see a new **BLUE ACORN** tab in the lefthand panel. Click on **JavaScript Plugins** within this tab to reveal the **Plugins** tab to the right. Expand this and you will see the plugins listed with a simple Yes/No select box for each to enable/disable them. Each plugin also has a **Source** link beneath the select boxes which will open a new tab redirecting you to the respective plugin's documentation.
