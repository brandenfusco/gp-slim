#BlueAcorn/Themes

Location: blueacornui/configs/themes.js

## About

This file is for configuration of the themes used in your site.

## Usage

Some of this file will not change. The parts that will need to be changed are notated below.

### Site Basics

You may need to change the name of your theme and the URL used for development.

### Example

```javascript
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

```javascript
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
```

## Specify your theme fallback structure

Here you will include your theme fallback. Add the name in single quotes, separated by a comma.

```javascript
theme_fallback: ['enterprise','rwd']
```
