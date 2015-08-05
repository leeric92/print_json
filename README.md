# print_json
Generate a prettified list representation of a JSON object/array.

## Usage
Just include `print_json.js`, and call `print_json(obj)`, where `obj` is the JSON object, or array of objects, you wish to print.

Printed lists are fully expanded by default. If you want to disable the collapsible lists, simply ignore the `.parent` class (see [CSS](#CSS)) and don't include the Javascript to 

## CSS
You can use the recommended `style.css`, or style the output yourself. The classnames are:

* `.json` - The main `ul` element and all nested `ul` elements have this class.
* `.obj_key` - The keys (object property names) have this class. Printed as `span` elements.
* `.obj_value` - The values (object properties) have this class. Printed as `span` elements.
* `.parent` - `.obj_key` elements that have nested `ul`s will have this class. Use this class to style the expandable/collapsible parts of the list.

The `style.css` file uses `.collapsed` on both `.obj_key` (property names) and `ul.json ul` (nested lists).

## Javascript
You need to expand and collapse nested lists using Javascript. I suggest doing this with an `onclick` listener on the `.parent` elements.

You need to use event delegation since the entire list is added to the DOM dynamically. You can't just bind a listener to a `.parent` object as this will not hold for elements added dynamically. Instead, listen for clicks on the `document` object (or, ideally, a closer parent) and verify that a `.parent` element was clicked. In jQuery, you can do this with [`.on()`](http://api.jquery.com/on).

### Vanilla

		window.onload = function () {
		    document.onclick = function(e) {
		        if (e.target.classList.contains("parent")) {
		            var ul = e.target.parentNode.getElementsByTagName("ul")[0];
		            if (ul.classList.contains("collapsed")) {
		                e.target.classList.remove("collapsed"); 
		                ul.classList.remove("collapsed");
		            } else {
		                e.target.classList.add("collapsed");
		                ul.classList.add("collapsed");
		            }
		        }
		    };
		};

### jQuery

		$(function () {
        $(document).on("click", ".parent", function (e) {
            $(this).toggleClass("collapsed");
            $(this).siblings("ul.json").toggleClass("collapsed");
        });
    });