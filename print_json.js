function print_json(obj) {
    /* the ul element to populate */
    var ul = document.createElement("ul");

    /* for each element in our array/object... */
    for (var i in obj) {
        /* create a new li element to append */
        var li = document.createElement("li");
        
        /* don't try to print a function */
        if (typeof obj[i] === "function") continue;
        
        /* always include the key/index of this item */
        var span = document.createElement("span");
        span.className = "obj_key";
        span.appendChild(document.createTextNode(i + ": "));
        li.appendChild(span);

        /* if we're going to print an object... */
        if (typeof obj[i] === "object") {
            /* first make sure it's not null */
            /* or if it's an array, make sure it has length */
            if (obj[i] == null || obj[i].length) {
                continue;

            /* otherwise, treat this li as a parent, and recurse */
            } else {
                span.className += " parent";
                li.appendChild(print_json(obj[i]));
            }

        /* if we're just printing an item... */
        } else {
            /* then append the item wrapped in quotes */
            var span = document.createElement("span");
            span.className = "obj_value";
            span.appendChild(document.createTextNode('"' + obj[i] + '"'));
            li.appendChild(span);
        }

        /* append this element to the entire list */
        ul.appendChild(li);
    }

    /* return the popoulated list */
    return ul;
}