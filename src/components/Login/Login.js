/**
 * Created by MingYin Lv on 2017/11/12 下午3:24.
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FlatButton from 'material-ui/FlatButton';
import TextFiled from 'material-ui/TextField';
import ReactDom from 'react-dom';
import Dialog from 'material-ui/Dialog';
import Spinner from '../Spinner';
import request from '../../utils/request';

class Login extends PureComponent {

  static propTypes = {
    onRequestClose: PropTypes.func.isRequired,
  };

  static defaultProps = {
    open: true,
    modal: true,
    title: '登录',
  };

  state = {
    username: '',
    password: '',
    loading: false,
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = () => {
    const { username, password } = this.state;
    request('/login', {
      method: 'POST',
      body: {
        username,
        password,
      },
    }).then(() => {
      this.props.onRequestClose();
    });
  };

  render() {
    const { username, password, loading } = this.state;

    const actions = [
      <FlatButton
        label="提交"
        primary
        keyboardFocused
        onClick={this.onSubmit}
      />,
    ];

    return (
      <Dialog
        actions={actions}
        {...this.props}
      >
        {
          loading ? <Spinner /> : (
            <div>
              <TextFiled
                hintText="请填写用户名"
                floatingLabelText="用户名"
                onChange={this.onChange}
                name="username"
                value={username}
                fullWidth
              />
              <TextFiled
                hintText="请填写密码"
                floatingLabelText="密码"
                onChange={this.onChange}
                name="password"
                type="password"
                value={password}
                fullWidth
              />
            </div>
          )
        }
      </Dialog>
    );
  }
}

export const show = (props) => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  function close() {
    const unmountResult = ReactDom.unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
  }

  ReactDom.render(
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <Login {...props} onRequestClose={close} />
    </MuiThemeProvider>
    , div);
};

export default Login;
