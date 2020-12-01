import { Divider, Tooltip, Icon } from 'antd';
import router from 'umi/router';
import React from 'react';
import { Toolbar } from 'gg-editor';
import ToolbarButton from './ToolbarButton';
import { withPropsAPI } from "gg-editor";
import styles from './index.less';
import SVG from 'react-inlinesvg';
import { Link } from 'umi';
import mondaySdk from "monday-sdk-js";
const IconD = () => <SVG src={require('./DIconsvg.svg')} />;

const monday = mondaySdk();

class FlowToolbar extends React.Component<any, any> {

  handleNext = () => {
    let flowData = this.props.propsAPI.save();
    monday.storage.instance.setItem('diagram', JSON.stringify(flowData)).then(res => {
      monday.execute("notice", { 
        message: "Diagram saved. Navigating to D#",
        type: "success", // or "error" (red), or "info" (blue)
        timeout: 2000,
     });
      router.push({
        pathname: '/diagram',
        state: { flowData: JSON.stringify(flowData) },
      });
      return res;
    })
  }

  render() {
    return (
      <Toolbar className={styles.toolbar}>
        <Link className={styles.link} to="/"><IconD></IconD></Link>
        <ToolbarButton command="undo" />
        <ToolbarButton command="redo" />
        <Divider type="vertical" />
        <ToolbarButton command="copy" />
        <ToolbarButton command="paste" />
        <ToolbarButton command="delete" />
        <Divider type="vertical" />
        <ToolbarButton command="zoomIn" icon="zoom-in" text="Zoom In" />
        <ToolbarButton command="zoomOut" icon="zoom-out" text="Zoom Out" />
        <ToolbarButton command="autoZoom" icon="fit-map" text="Fit Map" />
        <ToolbarButton command="resetZoom" icon="actual-size" text="Actual Size" />
        <Divider type="vertical" />
        <ToolbarButton command="toBack" icon="to-back" text="To Back" />
        <ToolbarButton command="toFront" icon="to-front" text="To Front" />
        <Divider type="vertical" />
        <ToolbarButton command="multiSelect" icon="multi-select" text="Multi Select" />
        <Divider type="vertical" />
        <Tooltip placement="bottom" title="Save">
        <Icon onClick={this.handleNext} type="save" theme="twoTone" twoToneColor="#52c41a" />
        </Tooltip>
      </Toolbar>
    )
  }

}


export default withPropsAPI(FlowToolbar);
