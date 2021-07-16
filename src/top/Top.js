import './Top.css';
import React from 'react';
import 'antd/dist/antd.css';
import './Logbox.css';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
class Top extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: sessionStorage.getItem('admin')
        ? sessionStorage.getItem('admin')
        : '登录'
    };
  }

  leave() {
    sessionStorage.clear();
  }
  render() {
    return (
      <div className="top">
        <h1>欢迎使用后台管理系统</h1>
        <Button type="primary" className="login">
          <Link
            to={{
              pathname: '/Log'
            }}
          >
            {this.state.login}
          </Link>
        </Button>
        <Button type="default" onClick={() => this.leave()} className="leave">
          退出
        </Button>
      </div>
    );
  }
}

export default Top;
