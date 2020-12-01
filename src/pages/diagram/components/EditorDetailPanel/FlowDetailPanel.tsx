import { CanvasPanel, DetailPanel, EdgePanel, GroupPanel, MultiPanel, NodePanel } from 'gg-editor';

import { Card } from 'antd';
import React from 'react';
import DetailForm from './DetailForm';
import styles from './index.less';

const FlowDetailPanel = () => (
  <DetailPanel className={styles.detailPanel}>
    <NodePanel>
      <DetailForm type="node" />
    </NodePanel>
  </DetailPanel>
);

export default FlowDetailPanel;
