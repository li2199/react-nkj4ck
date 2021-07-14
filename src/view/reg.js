import { Table, Space } from 'antd';
import React from 'react';
const columns = [
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
    render: text => <a>{text}</a>
  },

  {
    title: '注册号码',
    dataIndex: 'usertel',
    key: 'usertel'
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <input type="button" value="修改" />
        <a>Delete</a>
      </Space>
    )
  }
];

export default props => {
  const user = props.location.state.userdata;
  user.map((i, index) => {
    i.key = index;
  });
  return <Table columns={columns} dataSource={user} />;
};
