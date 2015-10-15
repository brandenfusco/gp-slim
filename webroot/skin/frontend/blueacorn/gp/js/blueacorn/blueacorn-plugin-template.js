/**
 * @package     Blueacorn\\HtmlTemplate
 * @version     1.0
 * @author      Blue Acorn <code@blueacorn.com>, Jamie Smith <jamie.smith@blueacorn.com>
 * @copyright   Copyright © 2015 Blue Acorn.
 *
 *
 *  Templating engine based off of PrototypeJS's Template Class for
 *  Blue Acorn's purposes only.
 *
 *  Any time you have a group of similar objects and you need to produce
 *  formatted output for these objects, maybe inside a loop, you typically
 *  resort to concatenating string literals with the object's fields:
 * 
 *      "The TV show " + title + " was created by " + author + ".";
 *
 *  There's nothing wrong with this approach, except that it is hard to
 *  visualize the output immediately just by glancing at the concatenation
 *  expression. This plugin provides a much nicer and clearer way of
 *  achieving this formatting.
 *
 *  ##### Straightforward templates
 *
 *  Uses a basic formatting syntax, similar to what is
 *  used in Ruby. The templates are created from strings that have embedded
 *  symbols in the form (e.g., `#{fieldName}`) that will be replaced by
 *  actual values when the template is applied (evaluated) to an object.
 *
 *      // the template (our formatting expression)
 *      var myTemplate = $.htmlTemplate(
 *       'The TV show #{title} was created by #{author}.');
 *
 *      // our data to be formatted by the template
 *      var show = {
 *        title: 'The Simpsons',
 *        author: 'Matt Groening',
 *        network: 'FOX'
 *      };
 *
 *      // let's format our data
 *      myTemplate.evaluate(show);
 *      // -> "The TV show The Simpsons was created by Matt Groening."
 *
 *      #####  More Examples
 *
 *      var hrefTemplate = new Template('/dir/showAll?lang=#{language}&amp;categ=#{category}&amp;lv=#{levels}');
 *      var selection = {category: 'books' , language: 'en-US'};
 *
 *      hrefTemplate.evaluate(selection);
 *      // -> '/dir/showAll?lang=en-US&amp;categ=books&amp;lv='
 *
 *      hrefTemplate.evaluate({language: 'jp', levels: 3, created: '10/12/2005'});
 *      // -> '/dir/showAll?lang=jp&amp;categ=&amp;lv=3'
 *
 *      hrefTemplate.evaluate({});
 *      // -> '/dir/showAll?lang=&amp;categ=&amp;lv='
 *
 *      hrefTemplate.evaluate(null);
 *      // -> error !
 *
 *  ##### Templates are meant to be reused
 *
 *  As the example illustrates, [[Template]] objects are not tied to specific
 *  data. The data is bound to the template only during the evaluation of the
 *  template, without affecting the template itself. The next example shows the
 *  same template being used with a handful of distinct objects.
 *
 *      // creating a few similar objects
 *      var conversion1 = { from: 'meters', to: 'feet', factor: 3.28 };
 *      var conversion2 = { from: 'kilojoules', to: 'BTUs', factor: 0.9478 };
 *      var conversion3 = { from: 'megabytes', to: 'gigabytes', factor: 1024 };
 *
 *      // the template
 *      var templ = $.htmlTemplate(
 *       'Multiply by #{factor} to convert from #{from} to #{to}.');
 *
 *      // let's format each object
 *      [conversion1, conversion2, conversion3].each( function(conv){
 *          templ.evaluate(conv);
 *      });
 *      // -> Multiply by 3.28 to convert from meters to feet.
 *      // -> Multiply by 0.9478 to convert from kilojoules to BTUs.
 *      // -> Multiply by 1024 to convert from megabytes to gigabytes.
 *
 *  ##### Escape sequence
 *
 *  There's always the chance that one day you'll need to have a literal in your
 *  template that looks like a symbol, but is not supposed to be replaced. For
 *  these situations there's an escape character: the backslash (`\\`).
 *
 *      // NOTE: you're seeing two backslashes here because the backslash
 *      // is also an escape character in JavaScript strings, so a literal
 *      // backslash is represented by two backslashes.
 *      var t = $.htmlTemplate(
 *       'in #{lang} we also use the \\#{variable} syntax for templates.');
 *      var data = { lang:'Ruby', variable: '(not used)' };
 *      t.evaluate(data);
 *      // -> in Ruby we also use the #{variable} syntax for templates.
 *
 *  ##### Custom syntaxes
 *
 *  The default syntax of the template strings will probably be enough for most
 *  scenarios. In the rare occasion where the default Ruby-like syntax is
 *  inadequate, there's a provision for customization. [[Template]]'s
 *  constructor accepts an optional second argument that is a regular expression
 *  object to match the replaceable symbols in the template string. Let's put
 *  together a template that uses a syntax similar to the now ubiquitous `{{ }}`
 *  constructs:
 *
 *      // matches symbols like '{{ field }}'
 *      var syntax = /(^|.|\r|\n)(\{{\s*(\w+)\s*}})/;
 *
 *      var t = $.htmlTemplate(
 *       '<div>Name: <b>{{ name }}</b>, Age: <b>{{ age }}</b></div>',
 *       syntax);
 *      t.evaluate( {name: 'John Smith', age: 26} );
 *      // -> <div>Name: <b>John Smith</b>, Age: <b>26</b></div>
 *
 *  There are important constraints to any custom syntax. Any syntax must
 *  provide at least three groupings in the regular expression. The first
 *  grouping is to capture what comes before the symbol, to detect the backslash
 *  escape character (no, you cannot use a different character). The second
 *  grouping captures the entire symbol and will be completely replaced upon
 *  evaluation. Lastly, the third required grouping captures the name of the
 *  field inside the symbol.
 *
 */

;(function ($, window, document, undefined) {

    var pluginName = "htmlTemplate";

    /**
     * The actual plugin constructor. Sets up
     * the current template and pattern to be used.
     */
    function HtmlTemplate(template, pattern) {
        this.template = template.toString();
        this.pattern = pattern || /(^|.|\r|\n)(#\{(.*?)\})/;
    }

    /**
     * Initiation of plugin object scope.
     * Will accept a template and a pattern if needed. If
     * no pattern is set, the default Ruby-like syntax will be used.
     */
    HtmlTemplate.prototype = {

        /**
         *  Template.evaluate(object) -> String
         *
         *  Applies the template to `object`'s data, producing a formatted string
         *  with symbols replaced by `object`'s corresponding properties.
         */
        evaluate: function(object) {
            var self = this;

            // Calls actual worker method
            return this.gsub(this.template, this.pattern, function(match) {
                if (object === null){
                    return (match[1] + '');
                }

                var before = match[1] || '';
                if (before === '\\'){
                    return match[2];
                }

                var ctx = object, expr = match[3],
                    pattern = /^([^.[]+|\[((?:.*?[^\\])?)\])(\.|\[|$)/;

                match = pattern.exec(expr);
                if (match === null) {
                    return before;
                }

                while (match !== null) {
                    var comp = match[1].startsWith('[') ? match[2].replace(/\\\\]/g, ']') : match[1];
                    ctx = ctx[comp];
                    if (null === ctx || '' === match[3]) break;
                    expr = expr.substring('[' == match[3] ? match[1].length : match[0].length);
                    match = pattern.exec(expr);
                }

                return before + self.interpret(ctx);
            });
        },

        interpret: function(value) {
            return value === null ? '' : String(value);
        },

        /**
         * Worker function that takes the template and
         * RegEx matches the string against the pattern
         * per index.
         *
         * @param source
         *  The formatting expression to be evaluated
         *
         * @param pattern
         *  Can be in RegEx replace format or string format. Will be
         *  converted depending on type.
         *
         * @param replacement
         *  Callback function where the two source and pattern collides.
         *  If source matches the expression range of indexes, then
         *  the source and pattern will be matched and replaced to form the requested
         *  corrected string in the template's format.
         */
        gsub : function(source, pattern, replacement) {
            var result = '', match;
            replacement = this.prepareReplacement(replacement);

            if (typeof pattern === "string"){
                pattern = RegExp.escape(pattern);
            }

            if (!(pattern.length || this.isNonEmptyRegExp(pattern))) {
                replacement = replacement('');
                return replacement + source.split('').join(replacement) + replacement;
            }

            while (source.length > 0) {
                match = source.match(pattern);
                if (match && match[0].length > 0) {
                    result += source.slice(0, match.index);
                    result += this.interpret(replacement(match));
                    source  = source.slice(match.index + match[0].length);
                } else {
                    result += source, source = '';
                }
            }
            return result;
        },

        isNonEmptyRegExp: function(regexp) {
            return regexp.source && regexp.source !== '(?:)';
        },

        prepareReplacement: function(replacement) {
            if (typeof replacement === "function") return replacement;
            var template = new HtmlTemplate(replacement);
            return function(match) { return template.evaluate(match); };
        }
    };

    /**
     * Lightweight wrapper around constructor allowing use
     * with no element selector so we can save the object for later use.
     *
     * @param template
     *  The formatting expression to be evaluated
     *
     * @param pattern
     *  Can be in RegEx replace format or string format. Will be
     *  converted depending on type.`
     */
    $[pluginName] = function (template, pattern) {
        return new HtmlTemplate(template, pattern);
    };

    /**
     *  RegExp.escape(str) -> String
     *  - str (String): A string intended to be used in a `RegExp` constructor.
     *
     *  Escapes any characters in the string that have special meaning in a
     *  regular expression.
     *
     *  Use before passing a string into the `RegExp` constructor.
     */
    if(typeof RegExp.escape !== 'function'){
        RegExp.escape = function(str) {
            return String(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
        };
    }
})(jQuery, window, document);