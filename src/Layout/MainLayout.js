/**
 * Created by MingYin Lv on 2017/11/11.
 */

import React from 'react';
import { Route, Link } from 'dva/router';
import Button from 'material-ui/RaisedButton';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Index from '../routes/index/Index';

export default () => {
  return (
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <div>
        LayoutM<br/>
        <Link to="/test">
          <Button>Test</Button>
        </Link>
        <Route
          path="/test"
          exact
          component={Index}
        />
      </div>
    </MuiThemeProvider>
  )
}
