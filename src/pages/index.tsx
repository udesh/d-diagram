import { Col, Row, Button } from 'antd';
import GGEditor, { Flow } from 'gg-editor';
import React from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import EditorMinimap from './flow/components/EditorMinimap';
import { FlowContextMenu } from './flow/components/EditorContextMenu';
import { FlowDetailPanel } from './flow/components/EditorDetailPanel';
import { FlowItemPanel } from './flow/components/EditorItemPanel';
import { FlowToolbar } from './flow/components/EditorToolbar';
import mondaySdk from "monday-sdk-js";
import styles from './flow/index.less';

const monday = mondaySdk();

GGEditor.setTrackable(false);

class FlowDiagram extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      flowData: {},
      dData: {}
    };

  }

  componentDidMount() {
    debugger
    monday.storage.instance.getItem('diagram').then(res => {
      let savedData: any = res;
      if (savedData.data.value != undefined) {
        this.setState({ dData: JSON.parse(savedData.data.value) }, () => {
          monday.execute("notice", { 
            message: "Diagram is loading..",
            type: "info", 
            timeout: 1000,
         });
        })
      }
    })
  }

  render() {
    const { dData } = this.state;
    return (
      <GGEditor className={styles.editor}>
        <Row type="flex" className={styles.editorHd}>
          <Col span={24}>
            <FlowToolbar />
          </Col>
        </Row>
        <Row type="flex" className={styles.editorBd}>
          <Col span={4} className={styles.editorSidebar}>
            <FlowItemPanel />
          </Col>
          <Col span={16} className={styles.editorContent}>
            <Flow data={dData} className={styles.flow} />
          </Col>
          <Col span={4} className={styles.editorSidebar}>
            <FlowDetailPanel />
            <EditorMinimap />
          </Col>
        </Row>
        <FlowContextMenu />
      </GGEditor>
    )
  }

}

export default FlowDiagram;