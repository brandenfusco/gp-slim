#Super Selects


* [Features](#features)
* [Installation Manually](#installation)
* [Auto Installation with modman](#autoinstallation)
* [Configuration of Super Selects](#config)
* [Extending Super Selects](#extend)

##[Features](id:features)

* Super Select CMS Page for Ease of Styling Variations
* Out of the Box Variations include:
    * Standard Custom Select - Standard Dropdown with Stylized Options
    * Overlay Select - Dropdown Appears as an Overlay over the Select Box
    * Left, Right & Under Selects - Options Appear to the Left, Right or Under the Options
    * Thumbnail Select - Options Appear with Thumbnail Images
    * Fullscreen Select - Options Appear as a List with a Fullscreen Overlay
    * Fullscreen Thumbnail Select - Thumbnails Appear with a Fullscreen Overlay
    * Color Selects - Alternate to Thumbnails shows colors instead, works with Fullscreen Thumbnail Select as well.
    * Validation Styles - Show your users when they internet wrong.
* Works in IE9+, Chrome, Safari, Firefox
* Keyboard Observer for Quick Option Finding
* Graceful Fallback for Touchscreen Devices
* Ability to Add Any Select Style you want. (See [Extending](#extend))



##[Installation Manually](id:installation)

1. Pull down this repo locally.

2. Move the files form this repo, except this README, to your Magento Installation

3. Edit Your Grunt File and add the Super Selects CMS Page Style Sheet to your SASS Task where applicable:

```javascript
<%=skinDir%>/css/blueacorn-super-selects.css' : '<%=skinDir%>/scss/blueacorn-super-selects.scss
```
4. Update your `scss/_core.scss` file to include the Super Select Partials, usually with your other Blue Acorn stuff:

```sass
@import "blueacorn/super-selects";
```

5. Recompile your SASS/CSS & JavaScript with **Grunt**



##[Auto Installation with modman](id:autoinstallation)

1. Goto [BlueAcornInc/green-pistachio](https://github.com/BlueAcornInc/green-pistachio#module-installation) and follow the instructions to install the Base Module/BlueAcorn Dev Common using Modman

##[Configuration of Super Selects](id:config)

| Setting | Description | Default Value | Available Options |
| ------- | ----------- | ------------- | ----------------- |
| `moduleName` | Name of the Module as it appears in **BlueAcornCore** | `SuperSelects`
| `enabled` | Whether or not you wish to enable module | `true` | *true, false* |
| `displayMethod` | Variation of how the module is displayed | `show` | *show, fade, slide* |
| `displayType` | Default Select Style for Selects that do not have an alternative style applied to them | `over` | *over, under, right, left, overlay, fullscreen, thumbnail, fullthumb*
| `typeArray` | Array of Select Types tht can be configured, you can narrow down this list or add to it if you would like. | *['over', 'under', 'right', 'left', 'overlay', 'fullscreen', 'thumbnail', 'fullthumb']*
| `truncate` | Whether or not you wish to truncate the text of an un-opened/in-active select. | `true` | `true`, `false`
| `truncateAmount` | Amount of characters you wish to display when `truncate` is `true`. | `30` | *Numeric Value*
| `optionLimits` | How many options to display in a list before scrolling | `10` | *Numeric Value*
| `imageType` | How you wish to display the images in the `thumbnail` & `fullthumb` select types.  Will display image as a `background:` css value of a span or use an `<img>` tag based on configuration. | `span` | `span`, `image`
| `htmlTag` | jQuery DOM Selector of `<html>` tag. | `$('html')` | *Used for Caching do not modify*
| `selects` | jQuery DOM Selector of Select Elements you wish to target for Super Select Customization | `$('select')` | *jQuery Selector targeting a select element.*
| `smallSelects` | jQuery DOM Selector of select elements that should appear small by default in Magento | ***`Various`*** | *jQuery Selector targeting a select element.*
| `smallClass` | CSS Class Name to be used to identify small select elements. | `sm` | *CSS Class Name*
| `blackList` | Array of css classes/selectors to not be styled by Super Selects Javascript | `['.no-style']`

###Example Configuration, made by editing `skin/js/blueacorn/blueacorn-super-selects.js`:
```javascript
if(ba !== undefined) {
    ba.SuperSelect = new SuperSelects({
        'displayType': 'under',
        'truncateAmount': 46,
        'imageType': 'image',
        'optionLimites': 20,
    });
}
```
##[Extending Super Selects](id:extend)

Super Selects are easily extendible out of the box to create any kind of custom interaction you may need.  Along with the Out of the Box options, follow the instructions below to extend, included is an example of a `top` `displayType` that could be added.

***Note:*** You will want to make sure when extending your SuperSelects class you do so after the file has been loaded, if you're making your customization using our blueacorn.min.js process, I would suggest naming your new file `blueacorn-super-selects-[NewDisplayType].js` for example for the `top` `displayType` I would create a file called `blueacorn-super-selects-top.js`

1. The first step to adding your own select interaction is by extending the typeArray, to add your new `displayType`:

```javascript
SuperSelects.prototype.settings.typeArray.push('top');
```

2. Next you'll want to create the appropriate methods that will be called dynamically for your select type.  The methods specific to `top` will be called dynamically, and will rollback to the default methods if you don't need to extend all of them.

    | MethodName | Method Description | Example for `top` |
    | ---------- | ------------------ | ----------------- |
    | `buildOptionObject` | Builds out an `Object` of each individual Select Option within your Select for use when running the `buildSelectOptions`, always gets passed `$(currentSelect).children()`, Should always return `Array` of Options | `buildOptionObjectTop` |
    | `buildSelectOptions` | Builds out the DOM for each individual Select Option within your select by using the `Object` created by `buildOptionObject`, always gets passed `Option Object`, DOM element that contains final `<li>` & index of option witin the Select | `buildSelectOptionsTop` |
    | `setClickObserver` | Sets Click Observers for opening & closing your Super Select | `setClickObserverTop` |
    | `setOptionObservers` | Sets Click Observers for the individual Options of your Super Select | `setOptionObserversTop` |

    **Example usafe of the dynamic methods**

```javascript
(function($){

    /**
     * Build Array of Objects with Values of Current Select
     * Options for Top Selects
     * @param opts Array of Option Elements within Current Select
     * @return Array | Array of Select Options
     */
    SuperSelects.prototype.buildOptionObjectTop = function(opts) {
        var optionsArray = [];

        $.each($(opts), function(idx, opt){
            var superSelectOption = {
                'value': $(opt).attr('value').length > 0 ? $(opt).attr('value') : '',
                'selected': $(opt).prop('selected'),
                'disabled': $(opt).prop('disabled'),
                'content': $(opt).html()
            };

            optionsArray.push(superSelectOption);
        });

        return optionsArray;
    };

    /**
     * Build the LI Elements within the Current Top Super
     * Select Options
     * @param  opt Individual Select Option Object
     * @param  selectOptions jQuery DOM Object of ba-options Div
     */
    SuperSelects.prototype.buildSelectOptionTop = function(opt, selectOptions) {
        this.buildSelectOptionWithDelay(opt, selectOptions, idx, 0.15, 0.10);
    };

    /**
     * Click Observer for Super Select that opens to the Top
     * @param currentSelect jQueryDOM Object of Select
     */
    setClickObserverTop = function(currentSelect) {
        var self        = this,
            selectShiv  = $(currentSelect).siblings('.ba-select-box').find('.ba-shiv');

            // Add Click Event tot he Super Select Shiv
            selectShiv.on('click touchstart', function(){
                // Detect if the Shiv is Already Open
                var baSelectBox = $(currentSelect).siblings('.ba-select-box');
                if(!$(baSelectBox).hasClass('open')){

                    self.openOptions(currentSelect);

                    var boxHeight = $(baSelectBox).find('.ba-options').height();
                    var newMargin = boxHeight - (boxHeight * 2);

                    $(baSelectBox).find('.ba-options').css("margin-top", newMargin);

                }else{
                    self.closeOptions(currentSelect);
                }
            });
    };

    /**
     *  Click Observer for Individual Options, it's really un-needed.
     *
     *  setOptionObserversTop = function(currentSelect) {
     *
     *  };
     */

})(jQuery)
```

3.  You'll want to add CSS to finish out your customizations.  So you'll want to modify your `scss/blueacorn/_super-selects.scss` file:

```sass
.ba-select-box.ba-top {
    .ba-options {
        display: block;
        float: left;
        width: 100%;
        position: absolute;
        top: 0;
        opacity: 0;
        visibility: hidden;
        transition: transform 0.3s, opacity 0.3s, visibility 0.3s;
        transform: scale(.85) translate3d(0, -10%, 0);
        &:after {
            position: absolute;
            display: block;
            visibility: visible;
            content: " ";
            text-indent: -999em;
            bottom: -14px;
            top: auto;
            left: 50%;
            margin-left: -10px;
            width: 19px;
            height: 14px;
            background: url('../images/blueacorn/super-selects/super-selects-sprite.png') no-repeat -68px -68px;
            @include rotate(180deg);
        }
    }
    &.open {
        .ba-options {
            opacity: 1;
            visibility: visible;
            transform: scale(1) translate3d(0, 0, 0);
            &:after {
                visibility: visible;
                opacity: 1;
            }
        }
        .ba-shiv {
            color: $white;
            border-color: $black-60;
            @include gradient-vertical($black-60, $black-70);
        }
        .ba-shiv-content { color: $white; }
        .ba-arrow { background-position: -34px 0; }
    }
}
```

4. Finally update your select to use your `.ba-top` class:
```html
<select name="top" id="overthetop" class="ba-top">
    <option>Is Blankman the best movie Ever?</option>
    <option value="1">Yes</option>
    <option value="1000">YES!</option>
    <option value="100000">There are other movies?</option>
    <option value="-1">The Meteor Man was better, all that Gold Hair!</option>
</select>
```
