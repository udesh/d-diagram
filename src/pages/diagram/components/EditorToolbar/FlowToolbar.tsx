import { Divider , Button, Icon} from 'antd';
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

  render () {
    return (
  <Toolbar className={styles.toolbar}>
  <Link  className={styles.link} to="/"><IconD></IconD></Link>
  </Toolbar>
    )
  }

}


export default withPropsAPI(FlowToolbar);
