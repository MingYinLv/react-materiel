/**
 * Created by MingYin Lv on 2017/11/11.
 */

import { fromJS } from 'immutable';
import key from 'keymaster';
import { loadList, delMateriel } from '../services/Materiel/materielService';
import { ADD, EDIT } from '../utils/Constant';
import { success } from '../components/Notification';

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
    // delMaterielSuffix(state, action){
    //   const list = state.get('materielList');
    //
    //     return state;
    // },
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
    *delMateriel({ id }, { call, put }) {
      yield call(delMateriel(id));
      success({
        text: '删除成功',
      });
      put({
        type: 'delMaterielSuffix',
        id,
      });
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

