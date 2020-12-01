"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var compatible_1 = require("@ant-design/compatible");
require("@ant-design/compatible/assets/index.css");
var antd_1 = require("antd");
var react_1 = require("react");
var monday_sdk_js_1 = require("monday-sdk-js");
var gg_editor_1 = require("gg-editor");
var upperFirst = function (str) {
    return str.toLowerCase().replace(/( |^)[a-z]/g, function (l) { return l.toUpperCase(); });
};
var Item = compatible_1.Form.Item;
var Option = antd_1.Select.Option;
var inlineFormItemLayout = {
    labelCol: {
        sm: { span: 8 }
    },
    wrapperCol: {
        sm: { span: 16 }
    }
};
var monday = monday_sdk_js_1["default"]();
var DetailForm = /** @class */ (function (_super) {
    __extends(DetailForm, _super);
    function DetailForm(props) {
        var _this = _super.call(this, props) || this;
        _this.getSettings = function (res) {
            _this.setState({ settings: res.data });
            console.log("settings!", res.data);
        };
        _this.getItemIds = function (res) {
        };
        _this.getContext = function (res) {
            debugger;
            var context = res.data;
            console.log("context!", context);
            _this.setState({ context: context });
            var boardIds = context.boardIds || [context.boardId];
            monday
                .api("query { boards(ids:[" + boardIds + "]) { id, items { id, name, column_values { id, text } } }}")
                .then(function (res) {
                console.log(res);
                var tagItems = [];
                var boards = res.data.boards;
                for (var i = 0; i < boards.length; i++) {
                    var boardItems = boards[i].items;
                    for (var j = 0; j < boardItems.length; j++) {
                        var itemColumnValues = boardItems[j].column_values;
                        for (var k = 0; k < itemColumnValues.length; k++) {
                            var columnValueId = itemColumnValues[k].id;
                            var columnValueText = itemColumnValues[k].text;
                            if (columnValueId.startsWith("tags") && columnValueText != "") {
                                console.log("Id: " + columnValueId);
                                console.log("Text: " + columnValueText);
                                tagItems.push(boardItems[j]);
                                break;
                            }
                        }
                    }
                }
                _this.setState({ boardItems: tagItems }, function () {
                    _this.populateList();
                });
            });
        };
        _this.populateList = function () {
            debugger;
            var label = _this.item.getModel().label;
            var boardItems = _this.state.boardItems;
            var dataList = _this.state.dataList;
            for (var i = 0; i < boardItems.length; i++) {
                if (boardItems[i].name != undefined && label != undefined && label != "") {
                    var listItemData = { title: boardItems[i].name, id: boardItems[i].id };
                    dataList.push(listItemData);
                }
            }
            _this.setState({ dataList: dataList }, function () {
                console.log("data ok");
            });
        };
        _this.handleFieldChange = function () {
            var _a = _this.props, form = _a.form, propsAPI = _a.propsAPI;
            var getSelected = propsAPI.getSelected, executeCommand = propsAPI.executeCommand, update = propsAPI.update;
            setTimeout(function () {
                form.validateFieldsAndScroll(function (err, values) {
                    if (err) {
                        return;
                    }
                    var item = getSelected()[0];
                    if (!item) {
                        return;
                    }
                    executeCommand(function () {
                        update(item, __assign({}, values));
                    });
                });
            }, 0);
        };
        _this.handleSubmit = function (e) {
            if (e && e.preventDefault) {
                e.preventDefault();
            }
            _this.handleFieldChange();
        };
        _this.renderEdgeShapeSelect = function () { return (react_1["default"].createElement(antd_1.Select, { onChange: _this.handleFieldChange },
            react_1["default"].createElement(Option, { value: "flow-smooth" }, "Smooth"),
            react_1["default"].createElement(Option, { value: "flow-polyline" }, "Polyline"),
            react_1["default"].createElement(Option, { value: "flow-polyline-round" }, "Polyline Round"))); };
        _this.renderNodeDetail = function () {
            var form = _this.props.form;
            var label = _this.item.getModel().label;
            return (react_1["default"].createElement("div", null, "label"));
        };
        _this.renderEdgeDetail = function () {
            var form = _this.props.form;
            var _a = _this.item.getModel(), _b = _a.label, label = _b === void 0 ? '' : _b, _c = _a.shape, shape = _c === void 0 ? 'flow-smooth' : _c;
            return (react_1["default"].createElement(react_1.Fragment, null));
        };
        _this.renderGroupDetail = function () {
            var form = _this.props.form;
            var _a = _this.item.getModel().label, label = _a === void 0 ? 'Group' : _a;
            return (react_1["default"].createElement(Item, __assign({ label: "Label" }, inlineFormItemLayout)));
        };
        _this.state = {
            settings: {},
            context: {},
            boards: [],
            boardItems: [],
            itemIds: false,
            dataList: []
        };
        return _this;
    }
    Object.defineProperty(DetailForm.prototype, "item", {
        get: function () {
            var propsAPI = this.props.propsAPI;
            return propsAPI.getSelected()[0];
        },
        enumerable: false,
        configurable: true
    });
    DetailForm.prototype.componentDidMount = function () {
        monday.listen("settings", this.getSettings);
        monday.listen("context", this.getContext);
        monday.listen("itemIds", this.getItemIds);
    };
    DetailForm.prototype.itemclick = function (item) {
        monday.execute('openItemCard', { itemId: item.id });
    };
    DetailForm.prototype.render = function () {
        var _this = this;
        var type = this.props.type;
        var label = this.item.model.label;
        var title = "#" + label;
        var dataList = this.state.dataList;
        if (!this.item) {
            return null;
        }
        var paginationConfig = {
            pagination: {
                pageSizeOptions: ['30', '40'],
                showSizeChanger: true
            }
        };
        return (react_1["default"].createElement(antd_1.Card, { type: "inner", size: "small", title: title, extra: react_1["default"].createElement(antd_1.Badge, { className: "site-badge-count-4", count: dataList.length, style: { backgroundColor: '#52c41a' } }) },
            react_1["default"].createElement(antd_1.List, { grid: { gutter: 16, column: 1 }, itemLayout: "vertical", pagination: paginationConfig, dataSource: dataList, renderItem: function (item) { return (react_1["default"].createElement(antd_1.List.Item, { key: item.id, onClick: function () { return _this.itemclick(item); } },
                    react_1["default"].createElement(antd_1.List.Item.Meta, { title: item.title }))); } })));
    };
    return DetailForm;
}(react_1["default"].Component));
exports["default"] = compatible_1.Form.create()(gg_editor_1.withPropsAPI(DetailForm));
