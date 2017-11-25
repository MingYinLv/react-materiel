/**
 * Created by MingYin Lv on 2017/11/12 下午4:50.
 */

import request from '../../utils/request';

export const loadList = ({ page = 1, keyword = '', size = 10, sortby = 'id', order = 'desc' }) => {
  return request(`/materiels?keyword=${keyword}&size=${size}&order=${order}&sortby=${sortby}&page=${page}`);
};

export const editMateriel = ({
                               id, name, description, remark, number,
                               operator, operate_time, logType,
                             }) => {
  return request(`/materiels/${id}`, {
    method: 'PUT',
    body: {
      name,
      description,
      remark,
      number,
      operator,
      operate_time,
      type: logType,
    },
  });
};
