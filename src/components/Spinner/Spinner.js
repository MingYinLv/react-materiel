/**
 * Created by MingYin Lv on 2017/11/14 下午2:12.
 */

import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import classes from './Spinner.less';


const Spinner = ({ size = 80, ...props }) => (
  <div className={classes.container}>
    <CircularProgress size={size} {...props} />
  </div>
);

export default Spinner;
