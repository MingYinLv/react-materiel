/**
 * Created by MingYin Lv on 2017/11/19 下午6:24.
 */

import React from 'react';
import TextField from 'material-ui/TextField';


const IntField = ({ onChange, ...props }) => {
  const tempChange = (e) => {
    // eslint-disable-next-line
    e.target.value = Number(e.target.value) ? `${Number(e.target.value)}` : '';
    // eslint-disable-next-line
    typeof onChange === 'function' && onChange(e);
  };
  return (
    <TextField onChange={tempChange} {...props} />
  );
};

export default IntField;
