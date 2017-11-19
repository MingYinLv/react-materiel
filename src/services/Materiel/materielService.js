/**
 * Created by MingYin Lv on 2017/11/12 下午4:50.
 */

import qs from 'qs';
import request from '../../utils/request';

export const loadList = ({ page = 1, keyword = '', size = 10, sortby = 'id', order = 'desc' }) => {
  return request(`/materiels?keyword=${keyword}&size=${size}&order=${order}&sortby=${sortby}&page=${page}`);
};

export const editMateriel = ({ id, name, description, remark, number }) => {
  return request(`/materiels/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: qs.stringify({
      name,
      description,
      remark,
      number,
    }),
  });
};
