/**
 * Created by MingYin Lv on 2017/11/11.
 */

import { fromJS } from 'immutable';
import { loadList } from '../services/Materiel/materielService';


export default {
  namespace: 'materiel',
  state: fromJS({
    materielList: [],
  }),
  reducers: {
    save: (state, action) => {
      return state.merge(action.payload);
    },
  },
  effects: {
    *loadList({ page }, { call, put }) {
      const data = yield call(loadList, { page });
      yield put({
        type: 'save',
        payload: {
          materielList: fromJS(data.data),
        },
      });
    },
  },
};

