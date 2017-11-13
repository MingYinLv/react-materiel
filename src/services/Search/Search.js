/**
 * Created by MingYin Lv on 2017/11/12 下午6:04.
 */

import React, { PureComponent, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import classNames from 'classname';
import classes from './Search.less';

class Search extends PureComponent {
  static propTypes = {
    history: PropTypes.object.isRequired,
  };

  onKeyDown = (e) => {
    if (e.key === 'Escape') {
      this.back();
    }
  };

  back = () => {
    this.props.history.replace('/');
  };

  render() {
    return (
      <div className={classNames(classes.container)}>
        <div className={classes.closeWrap}>
          <IconButton onClick={this.back}>
            <NavigationClose
              color="#666"
              style={{
                fontSize: '30px',
              }}
            />
          </IconButton>
        </div>
        <div className={classes.main}>
          <TextField
            onKeyDown={this.onKeyDown}
            hintText="搜索"
            autoFocus
            hintStyle={{
              textAlign: 'center',
              left: 0,
              right: 0,
            }}
            inputStyle={{
              textAlign: 'center',
            }}
          />
        </div>
      </div>
    );
  }
}

export default Search;
