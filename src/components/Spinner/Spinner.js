/**
 * Created by MingYin Lv on 2017/11/14 下午2:12.
 */

import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import classNames from 'classname';
import classes from './Spinner.scss';


const Spinner = ({ size = 80, transparent = false, ...props }) => (
  <div
    className={classNames(classes.container, {
      [classes.transparent]: transparent,
    })}
  >
    <div className={classes.box}>
      <CircularProgress size={size} {...props} />
    </div>
  </div>
);

export default Spinner;
