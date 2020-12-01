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
var gg_editor_1 = require("gg-editor");
var react_1 = require("react");
var EditorMinimap_1 = require("./components/EditorMinimap");
var EditorContextMenu_1 = require("./components/EditorContextMenu");
var EditorDetailPanel_1 = require("./components/EditorDetailPanel");
var EditorToolbar_1 = require("./components/EditorToolbar");
var index_less_1 = require("./index.less");
gg_editor_1["default"].setTrackable(false);
var Diagram = /** @class */ (function (_super) {
    __extends(Diagram, _super);
    function Diagram(props) {
        var _this = _super.call(this, props) || this;
        _this.graphConfig = {};
        _this.state = {
            settings: {},
            context: {},
            boards: [],
            words: [],
            itemIds: false,
            flowData: {},
            dData: {}
        };
        return _this;
    }
    Diagram.prototype.componentDidMount = function () {
        var _this = this;
        // const { handle } = this.props.match.params
        debugger;
        var flowData = this.props.location.state.flowData;
        // this.data = flowData;
        // this.setState(flowData);
        //console.log("thisData : " + flowData);
        this.setState({ flowData: JSON.parse(flowData) }, function () {
            // interface MyNode {
            //   id: string
            //   label: string
            //   x: number
            //   y: number
            // }
            // function createMyNode(config: MyNode): {
            //   id: string
            //   label: string
            //   x: number
            //   y: number
            // } {
            //   let newSquare = { id: config.id, label: config.label, x: config.x, y: config.y };
            //   return newSquare;
            // }
            // let nodesA: MyNode[] = [];
            //  if (flowData.nodes != undefined) {
            //  flowData.nodes.forEach(function(item: any) {
            //       let newItem = createMyNode({id:item.id, label:item.label, x:item.x, y:item.y});
            //       nodesA.push(newItem);
            //  });
            // }
            // debugger;
            var nodesArray = [];
            var edgesArray = [];
            nodesArray = _this.state.flowData.nodes;
            edgesArray = _this.state.flowData.edges;
            // if (nodesArray != undefined && nodesArray.length != undefined) {
            //   for (let i = 0; i < nodesArray.length; i++) {
            //     let newItem = createMyNode({ id: nodesArray[i].id, label: nodesArray[i].label, x: nodesArray[i].x, y: nodesArray[i].y })
            //     nodesA.push(newItem);
            //   }
            // }
            var processData = { nodes: nodesArray, edges: edgesArray };
            _this.setState({ dData: processData }, function () {
            });
        });
        // console.log("thisData : " + this.data);
        // console.log("flowData : " + flowData.nodes);
        // console.log("flowData : " + flowData.edges); //stringify
        // console.log("flowData : " + JSON.stringify(flowData));
        // console.log("flowData D : " + JSON.stringify(this.state.flowData));
    };
    Diagram.prototype.render = function () {
        var dData = this.state.dData;
        //debugger
        //  interface SquareConfig {
        //   color?: string;
        //   width?: number;
        // }
        // function createSquare(config: SquareConfig): { color: string; area: number } {
        //   let newSquare = { color: "white", area: 100 };
        //   if (config.color) {
        //     newSquare.color = config.color;
        //   }
        //   if (config.width) {
        //     newSquare.area = config.width * config.width;
        //   }
        //   return newSquare;
        // }
        // let mySquare = createSquare({ color: "black" });
        // let data = JSON.stringify(this.dataA);
        // let dFlow = {nodes: flowData.nodes, edges: flowData.edges};
        // console.log("S Data: " + data);
        // console.log("A Data: " + this.dataA);
        // console.log("D Data: " + dFlow);
        // console.log("D Data Stringyfy: " + JSON.stringify(dFlow));
        // let nodes : [] = flowData.nodes ;
        // let edges : [] = flowData.edges ; 
        // console.log("nodes - " + nodes);
        // console.log("edges - " + edges );
        return (
        //<div>{processData}</div>
        react_1["default"].createElement(gg_editor_1["default"], { className: index_less_1["default"].editor },
            react_1["default"].createElement(antd_1.Row, { type: "flex", className: index_less_1["default"].editorHd },
                react_1["default"].createElement(antd_1.Col, { span: 24 },
                    react_1["default"].createElement(EditorToolbar_1.FlowToolbar, null))),
            react_1["default"].createElement(antd_1.Row, { type: "flex", className: index_less_1["default"].editorBd },
                react_1["default"].createElement(antd_1.Col, { span: 4, className: index_less_1["default"].editorSidebar },
                    react_1["default"].createElement(EditorMinimap_1["default"], null)),
                react_1["default"].createElement(antd_1.Col, { span: 12, className: index_less_1["default"].editorContent },
                    react_1["default"].createElement(gg_editor_1.Flow, { data: dData, className: index_less_1["default"].flow, graph: this.graphConfig })),
                react_1["default"].createElement(antd_1.Col, { span: 8, className: index_less_1["default"].editorSidebar },
                    react_1["default"].createElement(EditorDetailPanel_1.FlowDetailPanel, null))),
            react_1["default"].createElement(EditorContextMenu_1.FlowContextMenu, null)));
    };
    return Diagram;
}(react_1["default"].Component));
exports["default"] = Diagram;
