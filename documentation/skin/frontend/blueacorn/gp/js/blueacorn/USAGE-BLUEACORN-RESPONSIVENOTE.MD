# BlueAcorn/ResponsiveNotation

`ResponsiveNotation` adds devices specific classes to the HTML tag based on current media query viewport width.

* Usage
	* [Options/Settings](#options)
	* [Custom Events](#customevents)
	* [Break Point Variables](#vars)
	
## Usage

### [Options/Settings](id:options)

`ResponsiveNotation` uses the Blue Acorn JS Module Format for Settings & Options, there is a default set of Settings assigned to `this.settings` object, which can be overriden by passing an `options` object on instantiation.

| key | default value | description |
|-----|---------------|-------------|
| `moduleName` | 'ResponsiveNotation` | |
| `mobileClass` | `resp-mobile` | CSS Class added to Mobile Devices following the media query:  `'(max-width:' + bp.small + 'px)'`|
| `tabletClass` | `resp-tablet` | CSS Class added to Tablet Devices following the media query:  `'(min-width:' + (bp.small + 1) + 'px) and (max-width:' + bp.large + 'px)'` |
| `desktopClass` | `resp-desktop` | CSS Class added to Large Screen Devices following the media query: `'(min-width:' + (bp.large + 1) + px)'`|

### [Custom Events](id:customevents)

`rnote:loaded` is the javascript event triggered once `ResponsiveNotation` has run it's `setViewportClass` method.

### [Break Point Variables](id:vars)

`ResponsiveNotation` uses Magento's Breakpoint Variables defined in `app.js`.  Specifically the variables it uses are `bp.small` and `bp.large`, if you wish to change the viewport width at which `ResponsiveNotation` changes/adds classes to the `<html>` tag, you will need to either edit the variables in `app.js` or update `blueacorn-responsive-note.js` to use different variables.