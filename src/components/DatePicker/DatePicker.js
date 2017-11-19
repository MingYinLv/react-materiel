/**
 * Created by MingYin Lv on 2017/11/19 下午5:48.
 */

import React from 'react';
import Intl from 'intl';
import 'intl/locale-data/jsonp/zh';
import MDDatePicker from 'material-ui/DatePicker';

const DatePicker = props => <MDDatePicker locale="zh-CN" DateTimeFormat={Intl.DateTimeFormat} {...props} />;

export default DatePicker;
