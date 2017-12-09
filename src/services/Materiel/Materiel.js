/**
 * Created by MingYin Lv on 2017/11/12 下午3:48.
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import className from 'classname';
import key from 'keymaster';
import classes from './Materiel.scss';
import MaterielList from './MaterielList';
import MaterielModal from './MaterielModal';

class Materiel extends PureComponent {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    materielList: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'materiel/loadList',
      page: 1,
    });
    [{
      keyboard: 'esc',
      pathname: '/',
    }, {
      keyboard: 's',
      pathname: '/search',
    }].forEach(({ keyboard, pathname }) => {
      key(keyboard, () => {
        const { history, location } = this.props;
        if (location.pathname !== pathname) {
          setTimeout(() => {
            history.replace(pathname);
          }, 0);
        }
      });
    });
  }

  editMateriel = id => () => this.props.dispatch({ type: 'materiel/showModalByEdit', id });

  render() {
    const { materielList, location } = this.props;
    return (
      <div
        className={className(classes.container, {
          [classes.scale]: location.pathname !== '/',
        })}
      >
        <div className={classes.box}>
          <MaterielList materielList={materielList} editMateriel={this.editMateriel} />
        </div>
        <MaterielModal />
      </div>
    );
  }
}


export default connect(state => ({
  materielList: state.materiel.get('materielList'),
}))(Materiel);

