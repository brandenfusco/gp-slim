# BlueAcorn/ModuleLoader

## About

This Module ensures other modules are loaded in proper order based on what dependencies are defined for a particular module.

## Benefits

- Resolves dependency loading order issues
- Sharing global configurations (*eg: a global animation speed variable*)
- Utilizing another modules methods, without dealing with global triggers.
- Cleaner global namespace

## Usage

When defining a new module, whatever the module returns will be accessible when it is required in another module. 
Module Loading does not start until baCoreReady event is fired. 

## Examples

### Creating a configuration to be shared

Using this process, we can store references to any element, and reuse them in other modules.

```javascript
ba.moduleLoader.define('Config', [], function() {
    return {
        elements: {
            'body': $('body'),
            'toggleLink': $('.toggle-link')
        },
        'animationSpeed': 200
    };
});

ba.moduleLoader.define('Accordion', ['Config'], function(Config) {
    Config.elements.toggleLink.on('click', function() {
        $(this).slideToggle(Config.animationSpeed);
    });
});
```

## Utilizing other modules methods without use of triggers

```javascript
ba.moduleLoader.define('MegaMenu', [], function() {
    function MegaMenu() {}
    
    MegaMenu.prototype.resetMenu = function () {/*logic here*/}
    
    return new MegaMenu()
});

ba.moduleLoader.define('OffCanvasMenu', ['MegaMenu'], function(MegaMenu) {
    function OffCanvasMenu() {}
    
    OffCanvasMenu.prototype.skipLinkClicked = function() {
        MegaMenu.resetMenu();
        // Do more things
    }
    
    return new OffCanvasMenu();
});
```

## Returning instances vs returning constructors

After defining a new module, when we return 'new' it will act as a singleton when used across other modules.

If we return the constructor, we will need to instantiate it and potentially have multiple instances

```javascript
ba.moduleLoader.define('ListItem', [], function() {
    function ListItem() {}
    
    ListItem.prototype = {/* Prototype methods here */};
    
    return ListItem;
});

ba.moduleLoader.define('SuperHeroList', ['ListItem'], function(ListItem) {
    var heroes = ['Bat Man', 'Wonder Woman', 'Super Man', 'Spider Man'];
    
    var html = '';
    
    heroes.forEach(function(hero) {
      var li = new ListItem();
      
      li.setName('hero');
      return html += li.toHtml();
    });
    
    return html;
});
```
