#BlueAcorn/Themes

Location: blueacornui/configs/themes.js

## About

This file is for configuration of the themes used in your site.

## Usage

Some of this file will not change. The parts that will need to be changed are notated below.

### Site Basics

You may need to change the name of your theme and the URL used for development.

### Example

```
site: {
    grunt: true,
    area: 'frontend',
    name: 'blueacorn/site',
    locale: 'en_US',
    dev_url: 'gp.dev',
}
```

## Specify the SASS partials to be compiled

Only the partial name is required. Do not include the underscore or the .scss extension.

### Example

```
files: [
    'blueacorn-super-selects',
    'fonts',
    'madisonisland',
    'styleguide',
    'styles-account',
    'styles-cart',
    'styles-category',
    'styles-checkout',
    'styles-cms',
    'styles-product',
    'styles'
],
ieFiles: [
    'madisonisland-ie8',
    'styleguide-ie8',
    'styles-account-ie8',
    'styles-cart-ie8',
    'styles-category-ie8',
    'styles-checkout-ie8',
    'styles-cms-ie8',
    'styles-product-ie8',
    'styles-ie8'
],
```

## Specify your theme fallback structure

Here you will include your theme fallback. Add the name in single quotes, seperated by a comma.

```
    theme_fallback: ['enterprise','rwd']
```