import React from 'react';
import { Result, Button } from 'antd';
export default () => (
  <div>
    <Result
      status="success"
      title={'欢迎回来！您的操作权限为：' + sessionStorage.getItem('power')}
      subTitle={'本次登录时间' + new Date()}
      extra={[]}
    />
  </div>
);
