#Green Pistachio Skin Usage Guide

1. [Javascript](#javascript)
2. [Images](#images)
3. [SASS](#sass)

## [Javascript](id:javascript)

### Linting & Minification

All BlueAcorn developed Javascript file should be saved in **blueacornui/skin/js/blueacorn** these files will be linted and minified into **blueacornui/skin/jsmin/blueacorn.min.js**

### Javascript File Documentation

* BlueAcorn
	* [BlueAcorn/Core](skin/frontend/blueacorn/gp/js/blueacorn/USAGE-BLUEACORN-CORE.MD)
	* [BlueAcorn/Page](skin/frontend/blueacorn/gp/js/blueacorn/USAGE-BLUEACORN-PAGE.MD)
	* [BlueAcorn/HTMLTemplate](skin/frontend/blueacorn/gp/js/blueacorn/USAGE-BLUEACORN-TEMPLATE.MD)
	* [BlueAcorn/CustomFormElements](skin/frontend/blueacorn/gp/js/blueacorn/USAGE-BLUEACORN-CUSTOM-FORM-ELEMENTS.MD)
	* [BlueAcorn/ResponsiveNote](skin/frontend/blueacorn/gp/js/blueacorn/USAGE-BLUEACORN-RESPONSIVENOTE.MD)
	* [BlueAcorn/SuperSelects](https://github.com/BlueAcornInc/gp-super-selects)
* [BlueAcorn/MagentoOverrides](skin/frontend/blueacorn/gp/js/USAGE-BLUEACORN-MAGENTO-OVERRIDES.MD)

## [Images](id:images)

New/Edited Images should be saved to **skin/frontend/[package]/[theme]/src**, the images will be automatically minified and saved to the **bskin/frontend/[package]/[theme]/images** directory.

###### Example:

An image called **sprite.png** (72kb) should get saved to **skin/frontend/[package]/[theme]/src/sprite.png** that file will be minified and saved to **skin/frontend/[package]/[theme]/sprite.png** and might get reduced to 70kb

This works recursively as well, if you save an image to **skin/frontend/[package]/[theme]/src/myimages/** it would then be minified and saved to **skin/frontend/[package]/[theme]/images/myimages/**

## [SASS](id:sass)

See [Usage SASS](USAGE-SASS.MD)