#BlueAcorn/Page

**BlueAcorn/Page** allows detection of Magento Page Type via Javascript

* Usage
	* [getPage](#getpage)
	* [identifyPage](#identifypage)
	* [Page Types](#pagetypes)
	
## Usage

### [getPage](id:getpage)

`getPage(pageType)` returns a boolean value of whether or not the current page you are on matches the `pageType` passed to the method.

| `@param` | Type | Description |
|----------|------|-------------|
| `pageType` | `String` | String Value of the Page Type you're trying to detect, see available [Page Types](#pagetypes) below. |

### [identifyPage](id:identifypage)

`identifyPage()` returns the `String` value of the page you're currently on, see [Page Types](#pagetypes).

##### [Page Types](id:pagetypes)

| `pageType` | Applicable Pages |
|------------|------------------|
| `home` | CMS Homepage |
| `cms` | CMS Pages, excluding Homepage |
| `category` | Catalog Categories, Search Results Pages |
| `search` | Search Results Page, Advanced Search Page |
| `product` | Product Pages |
| `cart` | Cart Page |
| `checkout` | One Page Checkout Page, seriously, do people use Multi-Shipping Checkout |
| `checkout-success` | Checkout Success Page |
| `private-sales` | When logged in Private Sales |
| `my-account` | My Account Pages, Account Signup, Login | 

### Examples

```
FROM: blueacorn-core-page.js

identifyPage: function() {
    var self = this,
        pageRequest;

    $.each(self.pageTypes, function(idx, pageType){
        if(self.getPage(pageType.pageName)){

            pageRequest = pageType.pageName;
            return;
        }
    });

    return pageRequest;
}
```

```
FROM: ga_module_library.js

getPage: function(pageType) {
    var self = this,
        pageRequest = false,
        len = self.pageTypes.length,
        i = 0,
        pageObj;

    loop1:
    for(i; i < len; i++){
        pageObj = self.pageTypes[i];

        if(pageObj.pageName === pageType && !pageRequest){
            var i2 = 0, len2 = pageObj.bodyClass.length;

            for(i2; i2 < len2; i2++){
                if($('body').hasClass(pageObj.bodyClass[i2])){
                    pageRequest = true;
                    break loop1;
                }
            }
        }
    }

    return pageRequest;
}
```