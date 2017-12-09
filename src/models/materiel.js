/**
 * Created by MingYin Lv on 2017/11/11.
 */

import { fromJS } from 'immutable';
import key from 'keymaster';
import { loadList, editMateriel } from '../services/Materiel/materielService';
import { ADD, EDIT } from '../utils/Constant';

export default {
  namespace: 'materiel',
  state: fromJS({
    materielList: [],
    searchList: [],
    searched: false,
    list: {
      page: 1,
      size: 10,
    },
    search: {
      page: 1,
      size: 10,
      keyword: '',
    },
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
    showModalByAdd(state) {
      return state.setIn(['modal', 'type'], ADD).setIn(['modal', 'visible'], true);
    },
    showModalByEdit(state, action) {
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
    *searchList({ search }, { call, put }) {
      if (search.keyword) {
        const data = yield call(loadList, search);
        yield put({
          type: 'save',
          payload: {
            searchList: fromJS(data.data || []),
            searched: true,
            search,
          },
        });
      } else {
        yield put({
          type: 'save',
          payload: {
            searchList: fromJS([]),
            searched: false,
            search,
          },
        });
      }
    },
    *editMateriel(data, { call }) {
      yield call(editMateriel, data);
    },
  },
  subscriptions: {
    keyboardWatcher({ history }) {
      [{
        keyboard: 'esc',
        pathname: '/',
      }, {
        keyboard: 's',
        pathname: '/search',
      }].forEach(({ keyboard, pathname }) => {
        key(keyboard, () => {
          if (history.location.pathname !== pathname) {
            setTimeout(() => {
              history.replace(pathname);
            }, 0);
          }
        });
      });
    },
  },
};

