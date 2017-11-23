/**
 * Created by MingYin Lv on 2017/11/23 下午4:23.
 */

import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ReactDom from 'react-dom';

const defaultProps = {
  open: true,
  autoHideDuration: 3000,
};

export const showMessage = (props) => {
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
      <Snackbar {...defaultProps} {...props} onRequestClose={close} />
    </MuiThemeProvider>
    , div);
};
