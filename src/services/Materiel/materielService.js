/**
 * Created by MingYin Lv on 2017/11/12 下午4:50.
 */

import request from '../../utils/request';

export const loadList = ({ page }) => {
  return request(`/materiels?size=10&order=desc&sortby=id&page=${page}`);
};
