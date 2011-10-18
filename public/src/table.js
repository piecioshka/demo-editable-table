table = this.table || {};

table.getHeader = function() {
    var table_wrapper = pklib.dom.byId("table-wrapper");
    return pklib.dom.byTag("thead", table_wrapper)[0];
}

table.getBody = function() {
    var table_wrapper = pklib.dom.byId("table-wrapper");
    return pklib.dom.byTag("tbody", table_wrapper)[0];
}

table.getColumnData = function(number) {
    var tbody = table.getBody();
    var rows = pklib.dom.byTag("tr", tbody);

    var sum = 0;
    for(var i = 0, len = rows.length; i < len; ++i) {
        var column = pklib.dom.children(rows[i]);
        for(var j = 0, num = column.length; j < num; ++j) {
            var cell = column[j];
            if(j === number) {
                sum += parseInt(cell.innerHTML, 10);
            }
        }
    }
    return sum;
}

table.getFooter = function() {
    var table_wrapper = pklib.dom.byId("table-wrapper");
    return pklib.dom.byTag("tfoot", table_wrapper)[0];
}

table.init = function() {
    table.event.init();
    table.summary.init();
};

window.onload = function(){
    table.init();
}