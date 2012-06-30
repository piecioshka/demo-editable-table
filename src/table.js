(function () {
    "use strict";
    
    var global = (function(){ return this || (1,eval)('this') })();

    global.Table = function () {
        this.dom = null;
        this.init = function (id) {
            console.log("Table.init()");
            this.dom = pklib.dom.by_id(id);
            this.bind_events();
            return this;
        };
        this.bind_events = function () {
            console.log("Table.bind_events()");
            var tbody = pklib.dom.by_tag("tbody", this.dom)[0];
            _bind_change_value(tbody);
        };
        var _bind_change_value = function (tbody) {
                console.log("- Table._bind_change_value()");
                pklib.event.add(tbody, "click", function (evt) {
                    var target = evt.target;
                    if (target.tagName.toLowerCase() === "td") {
                        _set_value_and_close(tbody);
                        if (!pklib.css.has_class("disabled", target)) {
                            if (_check_if_could_edit_any_field(tbody)) {
                                _build_input_with_value(target);
                            }
                        }
                    }
                });
            },
            _build_input_with_value = function (td) {
                pklib.css.add_class("disabled", td);
                var input = _create_input(td.innerHTML);
                td.innerHTML = "";
                pklib.dom.insert(input, td);
                input.focus();
                _bind_input_blur(input);
            },
            _create_input = function (value) {
                console.log("- Table._create_input(",value,")");
                var input = document.createElement("input");
                input.setAttribute("type", "text");
                input.setAttribute("value", value);
                return input;
            },
            _set_value_and_close = function (tbody) {
                var inputs = pklib.dom.by_tag("input", tbody);
                var length = inputs.length;

                for (var i = 0; i < length; i += 1) {
                    _set_cell_with_input_value(inputs[i]);
                }
            },
            _bind_input_blur = function (input) {
                console.log("- Table._bind_input_blur(",input,")");
                pklib.event.add(input, "blur", function () {
                    _set_cell_with_input_value(input);
                });
            },
            _set_cell_with_input_value = function (input) {
                console.log("- Table._set_cell_with_input_value(",input,")");
                if (!_check_if_could_change(input)) {
                    _mark_input_as_error(input);
                    return false;
                }
                var td = pklib.dom.parent(input);
                pklib.css.remove_class("disabled", td);
                var value = input.value;
                td.innerHTML = value;
            },
            _check_if_could_change = function (input) {
                console.log("- Table._check_if_could_change(",input,")");
                var classes = pklib.dom.parent(input).className;
                var validate_types = classes.match(/js\-validate\-[a-z]+/);

                for (var i = 0, len = validate_types.length; i < len; i += 1) {
                    var type = validate_types[i];
                    switch (true) {
                        case type === "js-validate-string": return /^(.*)$/.test(input.value);
                        case type === "js-validate-number": return /^[0-9]+$/.test(input.value);
                        case type === "js-validate-email": return /^(.+)[@](.+)\.(.+)$/.test(input.value);
                    }
                }
            },
            _mark_input_as_error = function (input) {
                console.log("- Table._mark_input_as_error(",input,")");
                pklib.css.add_class("error", input);
            },
            _check_if_could_edit_any_field = function (tbody) {
                return !pklib.dom.by_class("error", tbody).length;
            };
    };
    
    pklib.event.add(window, "load", function () {
        new global.Table().init("example-table");
        new global.TableSort().init("example-table");
    });
}());