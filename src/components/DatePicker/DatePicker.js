/**
 * Created by MingYin Lv on 2017/11/19 下午5:48.
 */

import React from 'react';
import MDDatePicker from 'material-ui/DatePicker';

const DatePicker = props => (
  <MDDatePicker
    locale="zh-CN"
    DateTimeFormat={Intl.DateTimeFormat}
    formatDate={new Intl.DateTimeFormat('zh-Hans-CH', {
      timeZone: 'Asia/ShangHai',
    }).format}
    {...props}
  />
);

export default DatePicker;
