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
exports.__esModule = true;
var antd_1 = require("antd");
var router_1 = require("umi/router");
var react_1 = require("react");
var gg_editor_1 = require("gg-editor");
var ToolbarButton_1 = require("./ToolbarButton");
var gg_editor_2 = require("gg-editor");
var index_less_1 = require("./index.less");
var FlowToolbar = /** @class */ (function (_super) {
    __extends(FlowToolbar, _super);
    function FlowToolbar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleSave = function () {
            debugger;
            // this.array = this.props.propsAPI.save();
            // console.log(this.props.propsAPI.save());
        };
        _this.handleNext = function () {
            var flowData = _this.props.propsAPI.save();
            router_1["default"].push({
                pathname: '/diagram',
                state: { flowData: JSON.stringify(flowData) }
            });
        };
        return _this;
    }
    FlowToolbar.prototype.render = function () {
        return (react_1["default"].createElement(gg_editor_1.Toolbar, { className: index_less_1["default"].toolbar },
            react_1["default"].createElement(ToolbarButton_1["default"], { command: "undo" }),
            react_1["default"].createElement(ToolbarButton_1["default"], { command: "redo" }),
            react_1["default"].createElement(antd_1.Divider, { type: "vertical" }),
            react_1["default"].createElement(ToolbarButton_1["default"], { command: "copy" }),
            react_1["default"].createElement(ToolbarButton_1["default"], { command: "paste" }),
            react_1["default"].createElement(ToolbarButton_1["default"], { command: "delete" }),
            react_1["default"].createElement(antd_1.Divider, { type: "vertical" }),
            react_1["default"].createElement(ToolbarButton_1["default"], { command: "zoomIn", icon: "zoom-in", text: "Zoom In" }),
            react_1["default"].createElement(ToolbarButton_1["default"], { command: "zoomOut", icon: "zoom-out", text: "Zoom Out" }),
            react_1["default"].createElement(ToolbarButton_1["default"], { command: "autoZoom", icon: "fit-map", text: "Fit Map" }),
            react_1["default"].createElement(ToolbarButton_1["default"], { command: "resetZoom", icon: "actual-size", text: "Actual Size" }),
            react_1["default"].createElement(antd_1.Divider, { type: "vertical" }),
            react_1["default"].createElement(ToolbarButton_1["default"], { command: "toBack", icon: "to-back", text: "To Back" }),
            react_1["default"].createElement(ToolbarButton_1["default"], { command: "toFront", icon: "to-front", text: "To Front" }),
            react_1["default"].createElement(antd_1.Divider, { type: "vertical" }),
            react_1["default"].createElement(ToolbarButton_1["default"], { command: "multiSelect", icon: "multi-select", text: "Multi Select" }),
            react_1["default"].createElement(antd_1.Divider, { type: "vertical" }),
            react_1["default"].createElement(antd_1.Button, { onClick: this.handleNext, icon: "save" })));
    };
    return FlowToolbar;
}(react_1["default"].Component));
exports["default"] = gg_editor_2.withPropsAPI(FlowToolbar);
