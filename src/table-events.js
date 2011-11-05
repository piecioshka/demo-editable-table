table = this.table || {};

table.event = (function() {

    function getSelector(element) {
        return pklib.string.trim(element.className.replace(/tleft|tright/, ""));
    }

    function sort_type_toggle(sort_type) {
        switch(sort_type) {
            case "up":
                return "down";
            case "down":
                return "up";
        }
    }

    function sort_type_default(thead) {
        var column = pklib.dom.byTag("th", thead);

        for(var i = 0, len = column.length; i < len; ++i) {
            var item = column[i];
            item = pklib.dom.children(item)[0];

            if(item.nodeName.toLowerCase() !== "a") {
                return false;
            }

            if(pklib.css.hasClass("up", item)) {
                pklib.css.removeClass("up", item);
            } else if(pklib.css.hasClass("down", item)) {
                pklib.css.removeClass("down", item);
            }
        }

    }

    return {
        init : function() {
            var thead = table.getHeader();

            var sort_type = "up";

            pklib.event.add(thead, "click", function(evt) {
                var element = evt.target;
                var parent = element.parentNode;
                // var selector = getSelector(parent);
                var index = pklib.dom.index(parent);

                if(element.nodeName.toLowerCase() !== "a") {
                    return false;
                }

                sort_type_default(thead);

                pklib.css.addClass(sort_type, element);

                table.sort(index, sort_type);
                sort_type = sort_type_toggle(sort_type);

                evt.preventDefault();
            });
        }
    };
    
})();
