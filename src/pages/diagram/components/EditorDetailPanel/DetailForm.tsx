import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Card, Select, List, Tag, Badge, Icon } from 'antd';
import React, { Fragment } from 'react';
import mondaySdk from "monday-sdk-js";

import { FormComponentProps } from '@ant-design/compatible/es/form';
import { withPropsAPI } from 'gg-editor';
import { TransactionOutlined } from '@ant-design/icons';
import { Label } from 'bizcharts';

const upperFirst = (str: string) =>
  str.toLowerCase().replace(/( |^)[a-z]/g, (l: string) => l.toUpperCase());

const { Item } = Form;
const { Option } = Select;

const inlineFormItemLayout = {
  labelCol: {
    sm: { span: 8 },
  },
  wrapperCol: {
    sm: { span: 16 },
  },
};

const monday = mondaySdk();


interface DetailFormProps extends FormComponentProps {
  type: string;
  propsAPI?: any;
}



class DetailForm extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      settings: {},
      context: {},
      boards: [],
      boardItems: [],
      itemIds: false,
      dataList: []
    };
  }

  get item() {
    const { propsAPI } = this.props;

    return propsAPI.getSelected()[0];
  }

  componentDidMount() {
    monday.listen("context", this.getContext);
  }

  getSettings = (res: { data: any; }) => {
    this.setState({ settings: res.data });
    console.log("settings!", res.data);
  };

  getItemIds = (res: { data: any[]; }) => {
  };

  ciEquals(a: string, b: string) {
    return typeof a === 'string' && typeof b === 'string'
      ? a.localeCompare(b, undefined, { sensitivity: 'accent' }) === 0
      : a === b;
  }

  getContext = (res: { data: any; }) => {
    const context = res.data;
    const { label } = this.item.getModel();
    this.setState({ context });
    const boardIds = context.boardIds || [context.boardId];
    monday
      .api(`query { boards(ids:[${boardIds}]) { id, items { id, name, column_values { id, text } } }}`)
      .then((res) => {
        let tagItems = [];
        let boards = [] = res.data.boards;
        for (let i = 0; i < boards.length; i++) {
          let boardItems = [] = boards[i].items;
          for (let j = 0; j < boardItems.length; j++) {
            let itemColumnValues = [] = boardItems[j].column_values;
            for (let k = 0; k < itemColumnValues.length; k++) {
              let columnValueId: String = itemColumnValues[k].id;
              let columnValueText: String = itemColumnValues[k].text;
              if (columnValueId.startsWith("tags") && columnValueText != "") {
                let labelString: String = label;
                let valueArray = [] = columnValueText.split(",");
                let addToList = false;
                for (let l = 0; l < valueArray.length; l++) {
                  if (this.ciEquals(labelString.trim().toLowerCase(), valueArray[l].trim().toLowerCase())) {
                    addToList = true;
                    break;
                  }
                }
                if (addToList) {
                  debugger
                  tagItems.push(boardItems[j]);
                  break;
                }
              }
            }
          }
        }
        this.setState({ boardItems: tagItems }, () => {
          this.populateList();
        });
      });
  };

  populateList = () => {
    debugger
    const { boardItems } = this.state;
    const { dataList } = this.state;
    for (let i = 0; i < boardItems.length; i++) {
      if (boardItems[i].name != undefined) {
        let listItemData = { title: boardItems[i].name, id: boardItems[i].id }
        dataList.push(listItemData);
      }
    }
    this.setState({ dataList: dataList }, () => {
    });
  }


  handleFieldChange = () => {
    const { form, propsAPI } = this.props;
    const { getSelected, executeCommand, update } = propsAPI;

    setTimeout(() => {
      form.validateFieldsAndScroll((err: any, values: any) => {
        if (err) {
          return;
        }
        const item = getSelected()[0];
        if (!item) {
          return;
        }
        executeCommand(() => {
          update(item, {
            ...values,
          });
        });
      });
    }, 0);
  };

  handleSubmit = (e: React.FormEvent) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    this.handleFieldChange();
  };

  renderEdgeShapeSelect = () => (
    <Select onChange={this.handleFieldChange}>
      <Option value="flow-smooth">Smooth</Option>
      <Option value="flow-polyline">Polyline</Option>
      <Option value="flow-polyline-round">Polyline Round</Option>
    </Select>
  );

  renderNodeDetail = () => {
    const { form } = this.props;
    const { label } = this.item.getModel();

    return (
      <div>label</div>

    );
  };

  renderEdgeDetail = () => {
    const { form } = this.props;
    const { label = '', shape = 'flow-smooth' } = this.item.getModel();

    return (
      <Fragment>

      </Fragment>
    );
  };

  renderGroupDetail = () => {
    const { form } = this.props;
    const { label = 'Group' } = this.item.getModel();

    return (
      <Item label="Label" {...inlineFormItemLayout}>

      </Item>
    );
  };

  itemclick(item: any) {
    monday.execute('openItemCard', { itemId: item.id }).then(res => {
      this.setState({ boardItems: [] }, () => {
        this.setState({ dataList: [] }, () => {
          monday.listen("context", this.getContext);
        });
      });
    })
  }

  render() {
    const { type } = this.props;
    const label = this.item.model.label;
    let title = "#" + label;
    const { dataList } = this.state;

    if (!this.item) {
      return null;
    }
    const paginationConfig = {
      pagination: {
        pageSizeOptions: ['30', '40'],
        showSizeChanger: true
      }
    }

    return (

      <Card type="inner" size="small" title={title} extra={<Badge className="site-badge-count-4" count={dataList.length} style={{ backgroundColor: '#52c41a' }} />}>

        <List
          grid={{ gutter: 16, column: 1 }}
          itemLayout="vertical"
          pagination={paginationConfig}
          dataSource={dataList}
          renderItem={(item: { title: any, id: any }) => (
            <List.Item key={item.id} onClick={() => this.itemclick(item)} >
              <List.Item.Meta title={item.title} />
            </List.Item>
          )}
        />
      </Card>
    );
  }
}

export default Form.create<DetailFormProps>()(withPropsAPI(DetailForm as any));
