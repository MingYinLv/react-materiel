/**
 * Created by MingYin Lv on 2017/11/12 下午3:24.
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FlatButton from 'material-ui/FlatButton';
import ReactDom from 'react-dom';
import { connect } from 'dva';
import Dialog from 'material-ui/Dialog';

class Login extends PureComponent {

  static propTypes = {
    onRequestClose: PropTypes.func.isRequired,
  };

  static defaultProps = {
    open: true,
    modal: true,
    title: '登录',
  };

  handleClose = () => {
    const { onRequestClose } = this.props;
    onRequestClose();
  };

  render() {
    const actions = [
      <FlatButton
        label="提交"
        primary
        keyboardFocused
        // onClick={this.handleClose}
      />,
    ];

    return (
      <Dialog
        actions={actions}
        {...this.props}
      >
        登录
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

  const defaultProps = {
    open: true,
  };

  ReactDom.render(
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <Login {...defaultProps} {...props} onRequestClose={close} />
    </MuiThemeProvider>
    , div);
};

export default connect()(Login);
