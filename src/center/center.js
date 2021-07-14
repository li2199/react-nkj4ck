import React from 'react';
import './center.css';
import React from 'react';
import 'antd/dist/antd.css';
import { Route, Switch } from 'react-router-dom';
import Reguser from '../view/reg';
import Title from '../view/review';
import Home from '../view/home';
import Log from '../view/log';
export default class Center extends React.Component {
  render = () => (
    <div className="center">
      <Switch>
        <Route path="/Log" component={Log} />
        <Route path="/Reguser" component={Reguser} />
        <Route path="/Title" component={Title} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}
