import { Table, Space, Button } from 'antd';
import React from 'react';
const columns = [
  {
    title: '用户名',
    dataIndex: 'uid',
    key: 'uid',
    render: text => <a>{text}</a>
  },
  {
    title: '城市id',
    dataIndex: 'cityid',
    key: 'cityid'
  },
  {
    title: '关联店铺',
    dataIndex: 'sname',
    key: 'sname'
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: '内容',
    dataIndex: 'details',
    key: 'details'
  },
  {
    title: '审核状态',
    dataIndex: 'review',
    key: 'review'
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <Button type="primary" onCilk={this.change}>
          修改
        </Button>
        <Button type="default" className="leave">
          删除
        </Button>
      </Space>
    )
  }
];
function change() {}
export default props => {
  console.log(props);
  const title = props.location.state.title;
  title.map((i, index) => {
    i.key = index;
  });
  return <Table columns={columns} dataSource={title} />;
};
