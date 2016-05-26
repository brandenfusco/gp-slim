#Green Pistachio Skin Usage Guide - SASS

* [blueacorn](#blueacorn)
	* [_custom-forms.scss](#customforms)
	* [_development.scss](#development)
	* [_grid.scss](#grid)
	* [_pem.scss](#pem)
	* [_ss-standard.scss](#ss-standard)
	* [_styleguide.scss](#styleguide)
	* [_super-selects.scss](#super-selects)
	* [_var.scss](#var)
* [core](#core)
    * [_common.scss](#common)
* [mixins](#mixins)
    * [_breakpoint.scss](#breakpoint)
    * [_family.scss](#family)
    * [_ie8.scss](#ie8)
    * [_if-resolution.scss](#if-resolution)
    * [_product-list.scss](#product-list)
    * [_touch-button.scss](#touch-button)
* [vendor](#vendor)
	* [_fancybox.scss](#fancybox)
* [other](#other)
    * [_core-account.scss](#core-account)
    * [_core-cart.scss](#core-cart)
    * [_core-category.scss](#core-category)
    * [_core-checkout.scss](#core-checkout)
    * [_core-cms.scss](#core-cms)
    * [_core-product.scss](#core-product)
    * [_core-styleguide.scss](#core-styleguide)
    * [_core-superselects.scss](#core-superselects)
    * [_core.scss](#core)
    * [_framework.scss](#framework)
    * [_var.scss](#var)
    * [blueacorn-super-selects.scss](#blueacorn-super-selects)
    * [email-inline.scss](#email-inline)
    * [email-non-inline.scss](#email-non-inline)
    * [fonts.scss](#fonts)
    * [madisonisland-ie8.scss](#madisonisland-ie8)
    * [madisonisland.scss](#madisonisland)
    * [styleguide-ie8.scss](#styleguide-ie8)
    * [styleguide.scss](#styleguide)
    * [styles-account-ie8.scss](#styles-account-ie8)
    * [styles-account.scss](#styles-account)
    * [styles-cart-ie8.scss](#styles-cart-ie8)
    * [styles-cart.scss](#styles-cart)
    * [styles-category-ie8.scss](#styles-category-ie8)
    * [styles-category.scss](#styles-category)
    * [styles-checkout-ie8.scss](#styles-checkout-ie8)
    * [styles-checkout.scss](#styles-checkout)
    * [styles-cms-ie8.scss](#styles-cms-ie8)
    * [styles-cms.scss](#styles-cms)
    * [styles-ie8.scss](#styles-ie8)
    * [styles-product-ie8.scss](#styles-product-ie8)
    * [styles-product.scss](#styles-product)
    * [styles.scss](#styles)

* [Page Specific Style Sheets](#pagespecific)
* [Module Specific Style Sheets](#modulespecific)

## [Blueacorn](id:blueacorn)

### [_custom-forms.scss](id:customforms) [*](https://github.com/BlueAcornInc/green-pistachio/blob/master/webroot/skin/frontend/blueacorn/gp/scss/blueacorn/_custom-forms.scss)

Styling for Custom Form Elements

### [_development.scss](id:development) [*](https://github.com/BlueAcornInc/green-pistachio/blob/master/webroot/skin/frontend/blueacorn/gp/scss/blueacorn/_development.scss)

`TBD`

### [_grid.scss](id:grid) [*](https://github.com/BlueAcornInc/green-pistachio/blob/master/webroot/skin/frontend/blueacorn/gp/scss/blueacorn/_grid.scss)

Custom Grid Mixin

### [_pem.scss](id:pem) [*](https://github.com/BlueAcornInc/green-pistachio/blob/master/webroot/skin/frontend/blueacorn/gp/scss/blueacorn/_pem.scss)

Function converts pixel number value to pm value.

### [_ss-standard.scss](id:ss-standard) [*](https://github.com/BlueAcornInc/green-pistachio/blob/master/webroot/skin/frontend/blueacorn/gp/scss/blueacorn/_ss-standard.scss)

Symbolset for the font SS-Standard

### [_styleguide.scss](id:styleguide) [*](https://github.com/BlueAcornInc/green-pistachio/blob/master/webroot/skin/frontend/blueacorn/gp/scss/blueacorn/_styleguide.scss)

Style Guide page specific styling.

### [_super-selects.scss](id:super-selects) [*](https://github.com/BlueAcornInc/green-pistachio/blob/master/webroot/skin/frontend/blueacorn/gp/scss/blueacorn/_super-selects.scss)

Styles for Super Select Custom Form Elements for Highly Stylized Select Elements with Custom Functionality

### [_var.scss](id:var) [*](https://github.com/BlueAcornInc/green-pistachio/blob/master/webroot/skin/frontend/blueacorn/gp/scss/blueacorn/_var.scss)

Used to set base pixel value of fonts for `pem()` function.

## [Core](id:core)

### [_common.scss](id:common) [*](https://github.com/BlueAcornInc/green-pistachio/blob/master/webroot/skin/frontend/blueacorn/gp/scss/core/_common.scss)

`TBD`

## [Mixins](id:mixins)

### [_breakpoint.scss](id:breakpoint) [*](https://github.com/BlueAcornInc/green-pistachio/blob/master/webroot/skin/frontend/blueacorn/gp/scss/mixin/_breakpoint.scss)

`TBD`

### [_family.scss](id:family) [*](https://github.com/BlueAcornInc/green-pistachio/blob/master/webroot/skin/frontend/blueacorn/gp/scss/mixin/_family.scss)

`Family.scss is a set of 20 smart Sass mixins which will help you to manage the style of :nth-child'ified elements, in an easy and classy way.`

[Family.scss website](https://lukyvj.github.io/family.scss/)

### [_ie8.scss](id:ie8) [*](https://github.com/BlueAcornInc/green-pistachio/blob/master/webroot/skin/frontend/blueacorn/gp/scss/mixin/_ie8.scss)

IE8 Specific Mixins, `ie8()` & `not-ie8`]

```sass
@incude ie8() { }
//Takes content and appends `.ie8` in front of it for IE8 specific stylesheets.

@include not-ie8() { }
//Takes content and renders it only in non IE8 stylesheets.
```

### [_if-resolution.scss](id:if-resolution) [*](https://github.com/BlueAcornInc/green-pistachio/blob/master/webroot/skin/frontend/blueacorn/gp/scss/mixin/_if-resolution.scss)

`TBD`

### [_product-list.scss](id:product-list) [*](https://github.com/BlueAcornInc/green-pistachio/blob/master/webroot/skin/frontend/blueacorn/gp/scss/mixin/_product-list.scss)

`TBD`

### [_touch-button.scss](id:touch-button) [*](https://github.com/BlueAcornInc/green-pistachio/blob/master/webroot/skin/frontend/blueacorn/gp/scss/mixin/_touch-button.scss)

`TBD`

## [Vendor Partials](id:vendor)

### [_fancybox.scss](id:fancybox) [*](https://github.com/BlueAcornInc/green-pistachio/blob/master/webroot/skin/frontend/blueacorn/gp/scss/vendor/_fancybox.scss)

SASS Partial for fancybox, remove if that is not going to be used.

## [Other Style Sheets](id:other)

### [_core-account.scss](id:core-account) [*](https://github.com/BlueAcornInc/green-pistachio/blob/master/webroot/skin/frontend/blueacorn/gp/scss/_core-account.scss)

Page Specific Style Sheets for Account

### [_core-cart.scss](id:core-cart) [*](https://github.com/BlueAcornInc/green-pistachio/blob/master/webroot/skin/frontend/blueacorn/gp/scss/_core-cart.scss)

Page Specific Style Sheets for Cart

### [_core-category.scss](id:core-category) [*](https://github.com/BlueAcornInc/green-pistachio/blob/master/webroot/skin/frontend/blueacorn/gp/scss/_core-category.scss)

Page Specific Style Sheets for Category

### [_core-checkout.scss](id:core-checkout) [*](https://github.com/BlueAcornInc/green-pistachio/blob/master/webroot/skin/frontend/blueacorn/gp/scss/_core-checkout.scss)

Page Specific Style Sheets for Checkout

### [_core-cms.scss](id:core-cms) [*](https://github.com/BlueAcornInc/green-pistachio/blob/master/webroot/skin/frontend/blueacorn/gp/scss/_core-cms.scss)

Page Specific Style Sheets for CMS Pages

### [_core-product.scss](id:core-product) [*](https://github.com/BlueAcornInc/green-pistachio/blob/master/webroot/skin/frontend/blueacorn/gp/scss/_core-product.scss)

Page Specific Style Sheets for Product

### [_core-styleguide.scss](id:core-styleguide) [*](https://github.com/BlueAcornInc/green-pistachio/blob/master/webroot/skin/frontend/blueacorn/gp/scss/_core-styleguide.scss)

Module Specific Style Sheets

### [_core-superselects.scss](id:core-superselects) [*](https://github.com/BlueAcornInc/green-pistachio/blob/master/webroot/skin/frontend/blueacorn/gp/scss/_core-superselects.scss)


Module Specific Style Sheets

### [_core.scss](id:core) [*](https://github.com/BlueAcornInc/green-pistachio/blob/master/webroot/skin/frontend/blueacorn/gp/scss/_core.scss)

`TBD`

### [_framework.scss](id:framework) [*](https://github.com/BlueAcornInc/green-pistachio/blob/master/webroot/skin/frontend/blueacorn/gp/scss/_framework.scss)

`TBD`

### [_var.scss](id:var) [*](https://github.com/BlueAcornInc/green-pistachio/blob/master/webroot/skin/frontend/blueacorn/gp/scss/_var.scss)

Set your default variables.

### [blueacorn-super-selects.scss](id:blueacorn-super-selects) [*](https://github.com/BlueAcornInc/green-pistachio/blob/master/webroot/skin/frontend/blueacorn/gp/scss/blueacorn-super-selects.scss)

Style Sheet for Super Selects CMS Page.

### [email-inline.scss](id:email-inline) [*](https://github.com/BlueAcornInc/green-pistachio/blob/master/webroot/skin/frontend/blueacorn/gp/scss/email-inline.scss)

`TBD`

### [email-non-inline.scss](id:email-non-inline) [*](https://github.com/BlueAcornInc/green-pistachio/blob/master/webroot/skin/frontend/blueacorn/gp/scss/email-non-inline.scss)

`TBD`

### [fonts.scss](id:fonts) [*](https://github.com/BlueAcornInc/green-pistachio/blob/master/webroot/skin/frontend/blueacorn/gp/scss/fonts.scss)

CSS File for loading Webfonts.

### [madisonisland-ie8.scss](id:madisonisland-ie8) [*](https://github.com/BlueAcornInc/green-pistachio/blob/master/webroot/skin/frontend/blueacorn/gp/scss/madisonisland-ie8.scss)

`TBD`

### [madisonisland.scss](id:madisonisland) [*](https://github.com/BlueAcornInc/green-pistachio/blob/master/webroot/skin/frontend/blueacorn/gp/scss/madisonisland.scss)

`TBD`

### [styleguide-ie8.scss](id:styleguide-ie8) [*](https://github.com/BlueAcornInc/green-pistachio/blob/master/webroot/skin/frontend/blueacorn/gp/scss/styleguide-ie8.scss)

`TBD`

### [styleguide.scss](id:styleguide) [*](https://github.com/BlueAcornInc/green-pistachio/blob/master/webroot/skin/frontend/blueacorn/gp/scss/styleguide.scss)

`TBD`

### [styles-account-ie8.scss](id:styles-account-ie8) [*](https://github.com/BlueAcornInc/green-pistachio/blob/master/webroot/skin/frontend/blueacorn/gp/scss/styles-account-ie8.scss)

`TBD`

### [styles-account.scss](id:styles-account) [*](https://github.com/BlueAcornInc/green-pistachio/blob/master/webroot/skin/frontend/blueacorn/gp/scss/styles-account.scss)

`TBD`

### [styles-cart-ie8.scss](id:styles-cart-ie8) [*](https://github.com/BlueAcornInc/green-pistachio/blob/master/webroot/skin/frontend/blueacorn/gp/scss/styles-cart-ie8.scss)

`TBD`

### [styles-cart.scss](id:styles-cart) [*](https://github.com/BlueAcornInc/green-pistachio/blob/master/webroot/skin/frontend/blueacorn/gp/scss/styles-cart.scss)

`TBD`

### [styles-category-ie8.scss](id:styles-category-ie8) [*](https://github.com/BlueAcornInc/green-pistachio/blob/master/webroot/skin/frontend/blueacorn/gp/scss/styles-category-ie8.scss)

`TBD`

### [styles-category.scss](id:styles-category) [*](https://github.com/BlueAcornInc/green-pistachio/blob/master/webroot/skin/frontend/blueacorn/gp/scss/styles-category.scss)

`TBD`

### [styles-checkout-ie8.scss](id:styles-checkout-ie8) [*](https://github.com/BlueAcornInc/green-pistachio/blob/master/webroot/skin/frontend/blueacorn/gp/scss/styles-checkout-ie8.scss)

`TBD`

### [styles-checkout.scss](id:styles-checkout) [*](https://github.com/BlueAcornInc/green-pistachio/blob/master/webroot/skin/frontend/blueacorn/gp/scss/styles-checkout.scss)

`TBD`

### [styles-cms-ie8.scss](id:styles-cms-ie8) [*](https://github.com/BlueAcornInc/green-pistachio/blob/master/webroot/skin/frontend/blueacorn/gp/scss/styles-cms-ie8.scss)

`TBD`

### [styles-cms.scss](id:styles-cms) [*](https://github.com/BlueAcornInc/green-pistachio/blob/master/webroot/skin/frontend/blueacorn/gp/scss/styles-cms.scss)

`TBD`

### [styles-ie8.scss](id:styles-ie8) [*](https://github.com/BlueAcornInc/green-pistachio/blob/master/webroot/skin/frontend/blueacorn/gp/scss/styles-ie8.scss)

`TBD`

### [styles-product-ie8.scss](id:styles-product-ie8) [*](https://github.com/BlueAcornInc/green-pistachio/blob/master/webroot/skin/frontend/blueacorn/gp/scss/styles-product-ie8.scss)

`TBD`

### [styles-product.scss](id:styles-product) [*](https://github.com/BlueAcornInc/green-pistachio/blob/master/webroot/skin/frontend/blueacorn/gp/scss/styles-product.scss)

`TBD`

### [styles.scss](id:styles) [*](https://github.com/BlueAcornInc/green-pistachio/blob/master/webroot/skin/frontend/blueacorn/gp/scss/styles.scss)

`TBD`

---



## [Page Specific Style Sheets](id:pagespecific)

There are page specific stylesheets for the following Magento sections, these stylesheets are used to include the functionality of section specific modules, all global modules are included in styles.scss

* Account - [_core-account.scss](id:core-account) [*](https://github.com/BlueAcornInc/green-pistachio/blob/master/webroot/skin/frontend/blueacorn/gp/scss/_core-account.scss)
* Cart - [_core-cart.scss](id:core-cart) [*](https://github.com/BlueAcornInc/green-pistachio/blob/master/webroot/skin/frontend/blueacorn/gp/scss/_core-cart.scss)
* Category - [_core-category.scss](id:core-category) [*](https://github.com/BlueAcornInc/green-pistachio/blob/master/webroot/skin/frontend/blueacorn/gp/scss/_core-category.scss)
* Checkout - [_core-checkout.scss](id:core-checkout) [*](https://github.com/BlueAcornInc/green-pistachio/blob/master/webroot/skin/frontend/blueacorn/gp/scss/_core-checkout.scss)
* CMS - [_core-cms.scss](id:core-cms) [*](https://github.com/BlueAcornInc/green-pistachio/blob/master/webroot/skin/frontend/blueacorn/gp/scss/_core-cms.scss)
* Product - [_core-product.scss](id:core-product) [*](https://github.com/BlueAcornInc/green-pistachio/blob/master/webroot/skin/frontend/blueacorn/gp/scss/_core-product.scss)

## [Module Specific Style Sheets](id:modulespecific)

* Style Guide - [_core-styleguide.scss](id:core-styleguide) [*](https://github.com/BlueAcornInc/green-pistachio/blob/master/webroot/skin/frontend/blueacorn/gp/scss/_core-styleguide.scss)
* Super Selects - [_core-superselects.scss](id:core-superselects) [*](https://github.com/BlueAcornInc/green-pistachio/blob/master/webroot/skin/frontend/blueacorn/gp/scss/_core-superselects.scss)



