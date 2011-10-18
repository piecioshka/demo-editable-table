table = this.table || {};

table.summary = (function() {

    function setBodySummary(body) {
        var rows = pklib.dom.byTag("tr", body);

        for(var i = 0, len = rows.length; i < len; ++i) {
            var row = rows[i];
            var column = pklib.dom.children(row);

            var sum = 0;

            for(var j = 0, num = column.length; j < num; ++j) {
                var cell = column[j];
                var value = cell.innerHTML;

                if(value == parseInt(value, 10)) {
                    sum += parseInt(value, 10);
                }

                if(j == num - 2) {
                    cell.innerHTML = sum;
                }
            }
        }
    }

    function setFooterSummary(footer) {
        var rows = pklib.dom.byTag("tr", footer)[0];

        var column = pklib.dom.children(rows);

        for(var j = 0, num = column.length; j < num; ++j) {
            var cell = column[j];
            var value = cell.innerHTML;

            if(value == "0") {
                cell.innerHTML = table.getColumnData(j);
            }
        }
    }

    return {
        init : function() {
            var body = table.getBody();
            setBodySummary(body);

            var footer = table.getFooter();
            setFooterSummary(footer);
        }
    };

})();
