/**
 * Created by MingYin Lv on 2017/11/11.
 */

import React from 'react';
import { Route } from 'dva/router';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import AppBar from 'material-ui/AppBar';
import classes from './MainLayout.less';
import Materiel from '../services/Materiel';
import Search from '../services/Search';

export default () => {
  return (
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <div className={classes.container}>
        <AppBar
          title="物料管理系统"
          titleStyle={{
            fontSize: '20px',
          }}
          iconElementLeft={<IconButton><ActionHome /></IconButton>}
        />
        <Route
          component={Materiel}
        />
        <Route
          path="/search"
          component={Search}
        />
      </div>
    </MuiThemeProvider>
  );
};
