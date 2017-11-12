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
    loadListed: (state, action) => {
      return state.set('materielList', action.data);
    },
  },
  effects: {
    *loadList({ page }, { call, put }) {
      const data = yield call(loadList, { page });
      yield put({ type: 'loadListed', data: fromJS(data.data) });
    },
  },
};

