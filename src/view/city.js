import { Table, Space } from 'antd';
import React from 'react';
const columns = [
  {
    title: '城市',
    dataIndex: 'city',
    key: 'city',
    render: text => <a>{text}</a>
  },

  {
    title: '城市编号',
    dataIndex: 'cityid',
    key: 'cityid'
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
  const citys = props.location.state.citys;
  citys.map((i, index) => {
    i.key = index;
  });
  return <Table columns={columns} dataSource={citys} />;
};
