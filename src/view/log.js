import { Input, Button, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import encrypt from '../../tool/addpsd';
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      psd: 'admin',
      names: 'admin',
      key: 21992199
    };
  }
  psd(e) {
    this.setState({
      names: e.target.value
    });
  }
  names(e) {
    this.setState({
      psd: e.target.value
    });
  }
  Logadmin() {
    axios
      .post('http://localhost:9000/loguser', {
        name: encrypt.encrypt(this.state.names, this.state.key),
        pass: encrypt.encrypt(this.state.psd, this.state.key),
        power: 'root'
      })
      .then(res => {
        console.log(res);
        if (res.data.msg == 'success' && res.data.status == 200) {
          sessionStorage.setItem('admin', this.state.names);
          sessionStorage.setItem('power', res.data.power);
        }
      });
  }

  render() {
    return (
      <div className="log">
        <div className="put">
          <Input
            size="large"
            placeholder="admin"
            prefix={<UserOutlined />}
            className="putname"
            value={this.state.names}
            onChange={this.names.bind(this)}
          />
          <br />
          <br />
          <Space direction="vertical">
            <Input.Password
              placeholder=" password"
              value={this.state.psd}
              onChange={this.psd.bind(this)}
            />
          </Space>
          <Button
            type="primary"
            onClick={() => this.Logadmin()}
            className="btn"
          >
            <Link
              to={{
                pathname: '/'
              }}
            >
              登录{' '}
            </Link>
          </Button>
        </div>
      </div>
    );
  }
}
