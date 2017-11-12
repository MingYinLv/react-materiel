/**
 * Created by MingYin Lv on 2017/11/12 下午6:04.
 */

import React, { PureComponent, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import classes from './Search.less';

class Search extends PureComponent {
  static propTypes = {
    history: PropTypes.object.isRequired,
  };

  onKeyDown = (e) => {
    console.log(e.key);
    if (e.key === 'esc') {
      this.props.history.push('/');
    }
  };

  render() {
    return (
      <div className={classes.container}>
        <div className={classes.main}>
          <TextField
            onKeyDown={this.onKeyDown}
            hintText="搜索"
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
