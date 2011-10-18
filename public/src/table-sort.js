table = this.table || {};

table.sort = (function() {

    function getDataColumn(body, number) {
        var rows = pklib.dom.byTag("tr", body);

        var data = [];
        for(var i = 0, len = rows.length; i < len; ++i) {
            var cell = rows[i];
            data.push({
                "body" : pklib.dom.children(cell)[number].innerHTML,
                "element" : cell
            });
        }
        return data;
    }

    function setDataColumn(body, data) {
        body.parentNode.removeChild(body);

        var tbody = document.createElement("tbody");
        for(var i = 0, len = data.length; i < len; ++i) {
            var cell = data[i];
            tbody.appendChild(cell.element);
        }

        var table_wrapper = pklib.dom.byId("table-wrapper");
        var table = pklib.dom.byTag("table", table_wrapper)[0];
        table.appendChild(tbody);
    }

    return function(column, type) {
        var body = table.getBody();
        var data = getDataColumn(body, column);
        setDataColumn(body, data.sort(function sorting(left, right) {
            if(type === "down") {
                return right.body - left.body;
            } else if(type === "up") {
                return left.body - right.body;
            }
        }));
    }
})();
