import { Col, Row, Button } from 'antd';
import GGEditor, { Flow } from 'gg-editor';
import React from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import EditorMinimap from './components/EditorMinimap';
import { FlowContextMenu } from './components/EditorContextMenu';
import { FlowDetailPanel } from './components/EditorDetailPanel';
import { FlowItemPanel } from './components/EditorItemPanel';
import { FlowToolbar } from './components/EditorToolbar';
import styles from './index.less';

GGEditor.setTrackable(false);

class Diagram extends React.Component<any, any> {

   graphConfig = { }

  constructor(props: any) {
    super(props);
    this.state = {
      settings: {},
      context: {},
      boards: [],
      words: [],
      itemIds: false,
      flowData: {},
      dData: {}
    };

  }

  componentDidMount() {
    const { flowData } = this.props.location.state
    this.setState({ flowData: JSON.parse(flowData) }, () => {
       let nodesArray = [];
       let edgesArray = [];
       nodesArray = this.state.flowData.nodes;
       edgesArray = this.state.flowData.edges;
      let processData = { nodes: nodesArray, edges:edgesArray };
      this.setState({ dData: processData }, () => {
      })
    });
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
            <EditorMinimap />
          </Col>
          <Col span={12} className={styles.editorContent}>

            <Flow data={dData} className={styles.flow} graph={this.graphConfig}/>
           
          </Col>
          <Col span={8} className={styles.editorSidebar}>
            <FlowDetailPanel />
            
          </Col>
        </Row>
        <FlowContextMenu />
      </GGEditor>
    )

  }
}

export default Diagram;
