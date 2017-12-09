/**
 * Created by MingYin Lv on 2017/11/11.
 */

import React from 'react';
import { connect } from 'dva';
import { Route } from 'dva/router';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import ContentAdd from 'material-ui/svg-icons/content/add';
import AppBar from 'material-ui/AppBar';
import classes from './MainLayout.scss';
import Materiel from '../services/Materiel';
import Search from '../services/Search';
import Detail from '../services/Detail';

const MainLayout = ({ location, dispatch }) => {
  return (
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <div className={classes.container}>
        <AppBar
          title="物料管理系统"
          titleStyle={{
            fontSize: '20px',
          }}
          iconElementLeft={<IconButton><ActionHome /></IconButton>}
          iconElementRight={
            <IconButton
              onClick={() => (dispatch({
                type: 'materiel/showModalByAdd',
              }))}
            >
              <ContentAdd />
            </IconButton>
          }
        />
        <Route
          component={Materiel}
        />
        <CSSTransitionGroup
          transitionName="route-show"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          <Route
            location={location}
            key={location.key}
            path="/search"
            component={Search}
          />
        </CSSTransitionGroup>

        <CSSTransitionGroup
          transitionName="route-show"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          <Route
            location={location}
            key={location.key}
            path="/materiel/:id"
            component={Detail}
          />
        </CSSTransitionGroup>
      </div>
    </MuiThemeProvider>
  );
};

export default connect()(MainLayout);
