/**
 * Created by MingYin Lv on 2017/11/11.
 */

import { fromJS } from 'immutable';
import { loadList } from '../services/Materiel/materielService';
import { ADD, EDIT } from '../utils/Constant';

export default {
  namespace: 'materiel',
  state: fromJS({
    materielList: [],
    searchList: [],
    searched: false,
    keyword: '',
    modal: {
      visible: false,
      type: '', // add | edit
      materiel_id: 0,
      log_type: 1,
    },
  }),
  reducers: {
    save: (state, action) => {
      return state.merge(action.payload);
    },
    addMateriel(state) {
      return state.setIn(['modal', 'type'], ADD).setIn(['modal', 'visible'], true);
    },
    editMateriel(state, action) {
      return state.setIn(['modal', 'type'], EDIT).setIn(['modal', 'visible'], true).setIn(['modal', 'materiel_id'], action.id);
    },
    hideMateriel(state) {
      return state.set('modal', fromJS({
        visible: false,
        type: '', // add | edit
        materiel_id: 0,
        log_type: 1,
      }));
    },
  },
  effects: {
    *loadList({ page }, { call, put }) {
      const data = yield call(loadList, { page });
      yield put({
        type: 'save',
        payload: {
          materielList: fromJS(data.data || []),
        },
      });
    },
    *searchList({ page, keyword }, { call, put }) {
      if (keyword) {
        const data = yield call(loadList, { page, keyword });
        yield put({
          type: 'save',
          payload: {
            searchList: fromJS(data.data || []),
            searched: true,
            keyword,
          },
        });
      } else {
        yield put({
          type: 'save',
          payload: {
            searchList: fromJS([]),
            searched: false,
            keyword,
          },
        });
      }
    },
  },
};

