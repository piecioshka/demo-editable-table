(function () {
    "use strict";
    
    var global = (function(){ return this || (1,eval)('this') })();
        
    global.TableSort = function () {
        this.dom = null;
        this.init = function (id) {
            console.log("TableSort.init()");
            this.dom = pklib.dom.by_id(id);
            return this;
        };
        this.by_column = function () {
            console.log("TableSort.by_column()");
            var thead = pklib.dom.by_tag("thead", this.dom)[0];
            _bind_column_sort.call(this, thead);
            return this;
        };
        var _bind_column_sort = function (thead) {
                console.log("TableSort._bind_column_sort()");
                var self = this;
                pklib.event.add(thead, "click", function (evt) {
                    var target = evt.target;
                    if (target.tagName.toLowerCase() === "a") {
                        evt.preventDefault();
                        target = pklib.dom.parent(target);
                    }
                    if (target.tagName.toLowerCase() === "th") {
                        if (pklib.css.has_class("js-column-sort", target)) {
                            var type = pklib.css.has_class("js-sort-bigger", target);
                            var link = pklib.dom.by_tag("a", target)[0];
                            _sort_rows.call(self, target, type);
                            if (type) {
                                pklib.css.remove_class("js-sort-bigger", target);
                                pklib.css.remove_class("down", link);
                                pklib.css.add_class("up", link);
                            } else {
                                pklib.css.add_class("js-sort-bigger", target);
                                pklib.css.remove_class("up", link);
                                pklib.css.add_class("down", link);
                            }
                        }
                    }
                });
            },
            _sort_rows = function (th, type) {
                var index = pklib.dom.index(th);                
                var tbody = pklib.dom.by_tag("tbody", this.dom)[0];
                var rows = pklib.dom.children(tbody);
                var list = [];
                var length = rows.length;
                
                for (var i = 0; i < length; i += 1) {
                    var childs = pklib.dom.children(rows[i]);
                    list.push({
                        dom: rows[i],
                        sort_by: childs[index].innerHTML
                    });
                }
                
                if (type) {
                    _sort_smaller(list);
                } else {
                    _sort_bigger(list);
                }
                
                tbody.innerHTML = "";
                
                for (var j = 0; j < length; j += 1) {
                    pklib.dom.insert(list[j].dom, tbody);
                }
            },
            _sort_bigger = function (list) {
                list.sort(function (a, b) {
                    if (!isNaN(parseInt(a.sort_by, 10))) {
                        return parseInt(a.sort_by, 10) < parseInt(b.sort_by, 10);                        
                    }                        
                    return a.sort_by < b.sort_by;
                });
            },
            _sort_smaller = function (list) {
                list.sort(function (a, b) {
                    if (!isNaN(parseInt(a.sort_by, 10))) {
                        return parseInt(a.sort_by, 10) > parseInt(b.sort_by, 10);                        
                    }                        
                    return a.sort_by > b.sort_by;
                });
            };
    };    
}())