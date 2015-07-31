# BlueAcorn/CustomFormElements
* Usage
	* [Javascript](#javascript)
		* [Options/Settings](#options)
		* [customRadios](#customradios)
		* [customCheckboxes](#customcheckboxes)
		* [customSelects](#customselects)
		* [updateShivs](#updateshivs)
		* [updateAll](#updateall)
		* [Custom Events](#customevents)
	* [SASS](#sass)
		* [_custom-forms.scss](#customforms)
			* [Important Selectors](#importantselectors)
		
## Usage

### [Javascript](id:javascript)

##### [Options/Settings](id:options)

Default Settings Object:

| key | default value | description |
|-----|-------|-------------|
| `moduleName` | `CustomFormElements` | Module Name |
| `superSelects` | `true` | Boolean toggle for whether or not SuperSelects are enabled in the project. |
| `blacklist` | `['.no-style']` | Array of CSS Selectors of Elements you do not want CustomFormElements functionality applied to.|

#### [customRadios](id:customradios)

Adds Custom Form styling to Radio Inputs

#### [customCheckboxes](id:customcheckboxes)

Adds Custom Form styling to Checkbox Inputs

#### [customSelects](id:customselects)

Adds Custom Form styling to Select Elements

##### [updateShivs](id:updateshivs)

Updates the content of Shivs created for all select elements.

##### [updateAll](id:updateall)

Updates all Custom Form Element Content, useful for when elements have yet to have custom functionality applied to them, such as when DOM is modified with JS after page load.

#### [Custom Events](id:customevents)

| Event | Description |
|-------|-------------|
| `update:radios` | Adds Custom Radios functionality for all radio inputs on the page currently missing the functionality |
| `update:checkboxes` | Adds Custom Checkboxes functionality for all checkbox inputs on the page currently missing the functionality |
| `update:selects` | Adds Custom Selects functionality for all select elements on the page currently missing the functionality |
| `update:inputs` | Adds Custom Form Element functionality for all form input elements on the page currently missing the functionality. |

### [SASS](id:sass)

#### [_custom-forms.scss](id:customforms)

SASS Partial used to define the styling of Custom Form Elements Content applies to Custom Radios, Checkboxes and Selects

##### [Important Selectors](id:importantselectors)

| Selector | Description |
|----------|-------------|
| `.custom-shiv` | Used to style the custom shiv layered over the custom select inputs, essential for the styling of **CustomSelects** |
| `.radio-label, .checkbox-label` | Used for styling the **CustomCheckbox** & **CustomRadio** inputs, as the input elements are hidden off the page, the user actually clicks on the label element, which can be styled. |