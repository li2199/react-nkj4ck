import { Table, Space, Button } from 'antd';
import React, { useState } from 'react';
import axios from 'axios';
export default props => {
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
          <Button type="primary" onClick={() => change(record)}>
            审核通过
          </Button>
          <Button type="default" className="leave" onClick={() => del(record)}>
            删除
          </Button>
        </Space>
      )
    }
  ];

  function change(e) {
    axios
      .post('http://localhost:9000/reviewtitle', {
        index: e.key,
        review: 'OK'
      })
      .then(res => setTitle(res.data));
  }
  function del(e) {
    axios
      .post('http://localhost:9000/reviewtitle', {
        index: e.key,
        review: 'del'
      })
      .then(res => setTitle(res.data));
  }
  const [title, setTitle] = useState(props.location.state.title);

  title.map((i, index) => {
    i.key = index;
  });
  return <Table columns={columns} dataSource={title} />;
};
