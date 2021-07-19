import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form } from 'antd';
import './r.css';
import 'antd/dist/antd.css';
import axios from 'axios';
const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex]
    });
  };
  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`
          }
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export default class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '用户名',
        dataIndex: 'username',
        width: '30%'
      },
      {
        title: '注册号码',
        dataIndex: 'usertel'
      },
      {
        title: '注册时间',
        dataIndex: 'time'
      },

      {
        title: '操作',
        dataIndex: 'operation',
        render: (_, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm
              title="确认删除?"
              onConfirm={() => this.handleDelete(record.key)}
            >
              <a>注销</a>
            </Popconfirm>
          ) : null
      }
    ];

    this.state = {
      dataSource: props.location.state.userdata,
      count: 2
    };
  }

  handleDelete = key => {
    console.log(key);
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter(item => item.key !== key)
    });
    axios.post('http://localhost:9000/deluser', { index: key }).then(res => {
      this.setState({
        dataSource: res.data
      });
    });
  };

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell
      }
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave
        })
      };
    });
    const user = dataSource;
    user.map((i, index) => {
      i.key = index;
    });
    return (
      <div>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={user}
          columns={columns}
        />
      </div>
    );
  }
}
