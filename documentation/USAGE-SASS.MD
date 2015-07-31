#Green Pistachio Skin Usage Guide - SASS

* [Partials](#partials)
	* [_pem.scss](#pem)
	* [_styleguide.scss](#styleguide)
	* [_var.scss](#var)
	* [_custom-forms.scss](#customforms)
* [Mixins](#mixins)
	* [_ie8.scss](#ie8)
* [Vendor Partials](#partials)
	* [_fancybox.scss](#fancybox)
* [Page Specific Style Sheets](#pagespecific)
* [Module Specific Style Sheets](#modulespecific)

## Partials

### [_pem.scss](id:pem)

Function converts pixel number value to pm value.

### [_styleguide.scss](id:styleguide)

Style Guide page specific styling.

### [_var.scss](id:var)

Used to set base pixel value of fonts for `pem()` function.

### [_custom-forms.scss](id:customforms)

Styling for Custom Form Elements

## [Mixins](id:mixins)

### [_ie8.scss](id:ie8)

IE8 Specific Mixins, `ie8()` & `not-ie8`]

#### `ie8()`

Takes content and appends `.ie8` in front of it for IE8 specific stylesheets.

#### `not-ie8()`

Takes content and renders it only in non IE8 stylesheets.

## [Vendor Partials](id:vendor)

### [_fancybox.scss](id:fancybox)

SASS Partial for fancybox, remove if that is not going to be used.

## [Page Specific Style Sheets](id:pagespecific)

There are page specific stylesheets for the following magento sections, these stylesheets are used to include the functionality of section specific modules, all global modules are included in styles.scss

* Account - styles-account
* Cart - styles-cart
* Category - styles-category
* Checkout - styles-checkout
* CMS - styles-cms
* Product - styles-product

## [Module Specific Style Sheets](id:modulespecific)

* Style Guide - styleguide
* Super Selects - blueacorn-super-selects