# Blue Acorn Base Module

## 1. Overview
The Base Module allows developers to enable/disable various JavaScript plugins from the Admin in the **System > Configuration** section. Each plugin's dependencies (stylesheets, images, and minified JavaScript files) will be automatically loaded before the closing **&lt;/body&gt;** tag. This module has two other module dependencies:

##### Dependencies
* Footer Assets module (documentation [here](http://gitlab.dev/development/footer-assets/tree/master))
* CMS Page Style Update (documentation [here](http://gitlab.dev/development/cms-page-style-update/tree/master))



## 2. Files Included
* **app/code/local/BlueAcorn/JavascriptPlugins/Helper/Data.php**
* **app/code/local/BlueAcorn/JavascriptPlugins/config.xml**
* **app/code/local/BlueAcorn/JavascriptPlugins/system.xml**
	* for configuration with Admin
* **app/design/frontend/base/default/layout/blueacorn/javascriptplugins.xml**
	* uses **Footer Assets** module to add plugin dependencies before closing *&lt;/body&gt;* tag
* **app/etc/modules/BlueAcorn_JavaScriptPlugins.xml**
* **js/blueacorn/lib**
	* contains all of the plugins' dependencies, each in their own directory (see section 4 below)



## 3. Version
0.1.0



## 4. Plugins Included
The following plugins are currently available in Version 0.1.0

* Fancybox V 2.1.5
* BX Slider V 4.1.2
* Flexslider V 2.2.2
* jQuery ScrollTo V 1.4.13
* Selectivizr V 1.0.2
* Placeholder.js V 3.0.2
* SVG Injector V 1.1.2
* Headroom.js V 0.7.0
* Parallax.js V 1.1
* HTML5 Shiv V 3.7.2

Documentation for each plugin can be found by clicking on the **Source** link under each plugin's selectbox within the Admin


## 5. Installation
To install this module, you will need [Modman](https://github.com/colinmollenhour/modman) on your machine. For Mac users, simply:

 `brew install modman`

Then, `cd` into your site's root directory and run:

`modman init`

In your terminal you should see something like:

*Initialized Module Manager at /path/to/your/site*

Then run:

`modman clone git@gitlab.dev:development/base-module.git`

This will install all the required module dependencies along with this module. **Clear your cache** and everything should be good to go. You may need to log out of your store's Admin and log back in. (Also make sure that you have **cache disabled** in the Admin as well.)

**IMPORTANT NOTE:** you will need to *ensure that symlinks are are enabled* in your System Configuration. Navigate to:

** System > Configuration > Advanced > Developer **

Expand the *Template Settings* tab and change *Allow Symlinks* to "Yes"




## 6. Usage
After you've installed this module, log into the Admin section of your store, and navigate to: 

**System > Configuration**

You should see a new **BLUE ACORN** tab in the lefthand panel. Click on **JavaScript Plugins** within this tab to reveal the **Plugins** tab to the right. Expand this and you will see the plugins listed with a simple Yes/No select box for each to enable/disable them. Each plugin also has a **Source** link beneath the select boxes which will open a new tab redirecting you to the respective plugin's documentation.
