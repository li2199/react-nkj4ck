import React from 'react';
import './left.css';
import { Menu } from 'antd';
import {
  AppstoreOutlined,
  UserOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
const { SubMenu } = Menu;

class Left extends React.Component {
  constructor() {
    super();
    this.state = {
      reg: [],
      title: []
    };
  }

  handleClick = e => {
    if (e.key == 1) {
      axios.post('http://localhost:9000/alluser').then(res => {
        this.setState({
          reg: res.data
        });
        console.log(this.state.reg);
      });
    }
    if (e.key == 2) {
      axios.post('http://localhost:9000/gettitles').then(res => {
        this.setState({
          title: res.data
        });
        console.log(this.state.title);
      });
    }
  };

  render() {
    const reg = this.state.reg;
    const tit = this.state.title;
    return (
      <div className="left">
        <Menu
          onClick={this.handleClick}
          style={{ width: 256 }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
        >
          <SubMenu key="sub1" icon={<UserOutlined />} title="用户管理">
            <Menu.Item key="1">
              {' '}
              <Link
                to={{
                  pathname: '/Reguser',
                  state: { userdata: reg }
                }}
              >
                注册信息{' '}
              </Link>
            </Menu.Item>

            <Menu.Item key="2">
              <Link
                to={{
                  pathname: '/Title',
                  state: { title: tit }
                }}
              >
                {' '}
                发帖审核
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<AppstoreOutlined />} title="信息管理">
            <Menu.Item key="5">城市注册</Menu.Item>
            <Menu.Item key="6">热词管理</Menu.Item>
            <SubMenu key="sub3" title="商铺管理">
              <Menu.Item key="7">店铺审核</Menu.Item>
              <Menu.Item key="8">店铺管理</Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu key="sub4" icon={<SettingOutlined />} title="权限管理">
            <Menu.Item key="9">管理员账号</Menu.Item>
            <Menu.Item key="10">权限分配</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}

export default Left;
