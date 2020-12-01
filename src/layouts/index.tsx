import React from 'react';
import styles from './index.css';
import { Link } from 'umi';
import { HomeTwoTone , HeartTwoTone } from '@ant-design/icons'
import SVG from 'react-inlinesvg';
const Icon = () => <SVG src={require('./DIconsvg.svg')} />;

const BasicLayout: React.FC = props => {
  return (
    <div className={styles.normal}>
      <Link  className={styles.link} to="/">Create your diagram view. D# is connecting them with your #tag items..</Link>
      {/* <Link className={styles.link} to="/diagram"><HeartTwoTone twoToneColor="#eb2f96" ></HeartTwoTone></Link> */}
      {/* <h1 className={styles.title}>DiagramTag</h1> */}
      {props.children}
    </div>
  );
};

export default BasicLayout;
