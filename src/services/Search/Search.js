/**
 * Created by MingYin Lv on 2017/11/12 下午6:04.
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import TextField from 'material-ui/TextField';
import debounce from 'lodash/debounce';
import className from 'classname';
import classes from './Search.scss';
import Spinner from '../../components/Spinner';
import MaterielList from '../Materiel/MaterielList';
import RouteContainer from '../../components/RouteContainer';

class Search extends PureComponent {
  static propTypes = {
    history: PropTypes.object.isRequired,
    searchLoading: PropTypes.bool,
    searchList: PropTypes.object.isRequired,
    searched: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    search: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.search = debounce(this.search, 1000);
    this.state = {
      data: [],
      ...props.search.toJS(), // page size keyword
    };
  }

  onChange = (e) => {
    this.setState({
      keyword: e.target.value,
    });
    this.search();
  };

  onKeyDown = (e) => {
    if (e.key === 'Escape') {
      this.back();
    }
  };

  search = () => {
    const { dispatch } = this.props;
    const { keyword, page, size } = this.state;
    dispatch({
      type: 'materiel/searchList',
      search: {
        keyword, page, size,
      },
    });
  };

  back = () => {
    this.props.history.replace('/');
  };

  editMateriel = id => () => this.props.dispatch({ type: 'materiel/showModalByEdit', id });

  render() {
    const { searchLoading, searchList, searched, history } = this.props;
    const { keyword } = this.state;
    const isSearch = !!(searchLoading || searched || searchList.size);
    return (
      <RouteContainer history={history}>
        <div
          className={className(classes.main, {
            [classes.search]: isSearch,
          })}
        >
          <TextField
            onKeyDown={this.onKeyDown}
            hintText="搜索"
            autoFocus
            value={keyword}
            onChange={this.onChange}
            hintStyle={{
              textAlign: 'center',
              left: 0,
              right: 0,
            }}
            inputStyle={{
              textAlign: 'center',
            }}
          />
          {
            isSearch && (
              <div className={classes.result}>
                {searchLoading && <Spinner />}
                {searched && !searchLoading && (
                  <MaterielList editMateriel={this.editMateriel} materielList={searchList} />
                )}
              </div>
            )
          }
        </div>
      </RouteContainer>
    );
  }
}

export default connect(state => ({
  searchList: state.materiel.get('searchList'),
  searched: state.materiel.get('searched'),
  search: state.materiel.get('search'),
  searchLoading: state.loading.effects['materiel/searchList'],
}))(Search);
