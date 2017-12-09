/**
 * Created by MingYin Lv on 2017/12/9 下午4:41.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import classes from './RouteContainer.scss';

class RouteContainer extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
  };

  back = () => {
    this.props.history.push('/');
  };

  render() {
    return (
      <div
        className={classes.container}
      >
        {this.props.children}
        <div className={classes.closeWrap}>
          <IconButton onClick={this.back}>
            <NavigationClose
              color="#666"
            />
          </IconButton><br />
          [ Esc ]
        </div>
      </div>
    );
  }
}

export default RouteContainer;
