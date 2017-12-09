/**
 * Created by MingYin Lv on 2017/11/23 下午4:23.
 */

import { alert } from 'notie';
import './Notification.scss';

const SUCCESS = 1;
const WARNING = 2;
const INFO = 4;

export function success(options) {
  alert({
    ...options,
    position: 'bottom',
    type: SUCCESS,
  });
}

export function warning(options) {
  alert({
    ...options,
    position: 'bottom',
    type: WARNING,
  });
}

export function info(options) {
  alert({
    ...options,
    position: 'bottom',
    type: INFO,
  });
}
